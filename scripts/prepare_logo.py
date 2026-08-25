from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets/DesainLogoKeluargaHarmonis.png')
output_dir = Path('/home/ubuntu/webdev-static-assets')

image = Image.open(source).convert('RGBA')
# Keep the complete circular logo intact while normalizing it to a square canvas.
size = max(image.width, image.height)
canvas = Image.new('RGBA', (size, size), (255, 255, 255, 0))
canvas.alpha_composite(image, ((size - image.width) // 2, (size - image.height) // 2))

webp = canvas.resize((800, 800), Image.Resampling.LANCZOS)
webp.save(output_dir / 'keluargaharmonis-logo.webp', 'WEBP', quality=92, method=6)

favicon = canvas.resize((192, 192), Image.Resampling.LANCZOS)
favicon.save(output_dir / 'keluargaharmonis-favicon.png', 'PNG', optimize=True)

print(f'Prepared {webp.size} logo and {favicon.size} favicon from {source.name}')
