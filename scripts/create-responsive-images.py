from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "gh-pages-assets"
VARIANTS = {
    "montecosme-product.webp": 540,
    "montecosme-hero-bg.webp": 960,
    "montecosme-ingredients.webp": 900,
    "montecosme-privacy.webp": 900,
}

for name, max_width in VARIANTS.items():
    source = ROOT / name
    target = ROOT / name.replace(".webp", "-sm.webp")
    with Image.open(source) as image:
        image = image.convert("RGB")
        ratio = min(1, max_width / image.width)
        size = (round(image.width * ratio), round(image.height * ratio))
        resized = image.resize(size, Image.Resampling.LANCZOS)
        resized.save(target, "WEBP", quality=78, method=6)
        print(f"{target.name}: {image.size} -> {resized.size}, {target.stat().st_size} bytes")
