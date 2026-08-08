# Brainstorming Desain — keluargaharmonis.id (Montecosme)

## Tiga Pendekatan Stylistik

### 1. Botanical Apothecary (Editorial Natural)
Estetika apotek herbal premium ala Aesop: krem hangat, hijau sage dalam, tipografi serif editorial. Berkesan terpercaya, alami, dan dewasa.
Probability: 0.07

### 2. Midnight Velvet (Luxury Dark)
Latar hitam-hijau tua dengan aksen emas, kesan mewah dan maskulin gelap seperti parfum niche.
Probability: 0.03

### 3. Fresh Clinical (Medis Bersih)
Putih-biru klinis seperti brand skincare farmasi; bersih, steril, modern.
Probability: 0.05

---

## Pendekatan Terpilih: **Botanical Apothecary** (Editorial Natural)

### Design Movement
Apothecary / natural editorial — gabungan estetika brand herbal premium (Aesop, Rituals) dengan warmth keluarga Indonesia. Cocok untuk produk herbal BPOM dan brand "Keluargaharmonis".

### Core Principles
1. **Natural trust** — warna bumi (krem, hijau sage, coklat kayu) membangun kesan herbal alami terpercaya.
2. **Editorial warmth** — serif display besar + layout asimetris, terasa seperti majalah keluarga premium, bukan iklan murahan.
3. **Privacy-first confidence** — CTA WhatsApp hijau dan garansi privasi ditampilkan dengan jelas sebagai nilai jual utama.
4. **Calm hierarchy** — banyak whitespace, section panjang bernapas, tidak penuh sesak.

### Color Philosophy
- **Base**: krem hangat `#F7F3EA` (oklch ~0.96 0.015 90) — kesan kertas/kapas alami.
- **Primary**: hijau botol apotek `#2E4A3B` (deep forest green) — natural, maskulin lembut, trust.
- **Accent/Signature**: hijau sage-emas `#8A9A5B` → dipakai untuk highlight; CTA WhatsApp hijau `#25D366`.
- **Support**: coklat kayu `#6B5B4A`, emas lembut untuk badge.
- Alasan emosional: hijau = alami & privat; krem = hangat keluarga; emas = kualitas.

### Layout Paradigm
Asimetris editorial: hero 2 kolom (teks kiri, produk kanan dengan backdrop organic shape), section masalah dengan kartu offset, ingredients dengan pola zigzag, pricing 3 kartu dengan kartu tengah (Best Seller) menonjol naik, garansi privasi full-width dengan ilustrasi paket kurir. Hindari grid simetris penuh.

### Signature Elements
1. **Daun/organic blob shape** — silhouette daun botanical sebagai backdrop dan pemisah section.
2. **Badge kapsul** — label bulat/pill seperti stiker apotek untuk "BPOM", "Herbal", "Privasi".
3. **Nomor section besar** — angka 01/02/03 serif tipis sebagai penanda section editorial.

### Interaction Philosophy
Tenang dan pasti: hover kartu mengangkat lembut (translateY + shadow), tombol pulsasi halus pada CTA utama, scroll reveal fade-up 60ms stagger. Tidak ada efek heboh.

### Animation
- Entrance: fade-up 500ms, ease-out cubic-bezier(0.23,1,0.32,1), stagger 80ms.
- Hover kartu: 200ms translateY(-4px) + shadow.
- CTA WhatsApp: pulse ring halus setiap 3 detik.
- Respect prefers-reduced-motion.

### Typography System
- **Display**: "Fraunces" (serif modern dengan karakter, warmth editorial) — headline & nomor section.
- **Body**: "Outfit" — sans humanist, bersih, ramah, untuk teks tubuh & UI.
- Hierarki: H1 clamp(2.5rem, 5vw, 4rem) Fraunces 600; H2 2.25rem Fraunces 600; body Outfit 400/500.

### Brand Essence
Platform tips keluarga harmonis + grooming pria herbal premium untuk pria yang ingin tampil percaya diri dan higienis. Adjectives: hangat, terpercaya, elegan.

### Brand Voice
Hangat, dewasa, tidak vulgar, persuasif dengan empati. Contoh:
- "Percaya diri itu dimulai dari hal yang paling dekat dengan kita."
- "Semprot, siap, dan jadi versi terbaik dirimu untuk si dia."

### Wordmark & Logo
Logotype "Keluarga Harmonis" dalam Fraunces italic + simbol daun-kapsul tunggal berwarna hijau apotek; "MONTECOSME" ditampilkan sebagai product mark pill uppercase tracking-wide.

### Signature Brand Color
Hijau apotek dalam `#2E4A3B` — semua section penting dan CTA utama bersumber dari palet ini.

## Style Decisions
- Layout rule: setiap section utama wajib punya satu asimetri editorial — offset image/text, kartu bertingkat (staggered), angka section oversized, atau whitespace tak merata — halaman tidak boleh runtuh menjadi grid simetris penuh.
- Brand mark rule: "Keluarga Harmonis" tampil sebagai logotype Fraunces italic + simbol daun-kapsul tunggal hijau apotek; "MONTECOSME" tampil sebagai product-mark pill uppercase.
- Botanical rule: visual botanical harus terasa seperti sistem ilustrasi apotek yang terkontrol — bentuk daun/kapsul/blob signature + tekstur kertas alami, dedaunan generik hanya sebagai framing ringan.
- Typography rule: Fraunces dipakai lebih dominan — judul section besar, quote moments, kontras kuat antara display type dan body/UI text.
- Voice rule: copy tetap hangat-dewasa, hindari kesan iklan massal; "makin lengket" dipertahankan sebagai playful headline hero, sisanya tenang & empatik.

## Catatan Kepatuhan
- Copy harus aman untuk iklan (Meta/Google): tidak klaim medis/obat, tidak vulgar. Fokus pada kebersihan, kesegaran, percaya diri, dan keharmonisan keluarga.
- CTA utama: tombol WhatsApp dengan pesan pre-filled; form alternatif COD.
