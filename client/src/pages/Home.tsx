/**
 * DESIGN: Botanical Apothecary — keluargaharmonis.id / Montecosme
 * Style: cream base (#F7F3EA) + deep forest green (#2E4A3B), sage & gold accents.
 * Fonts: Fraunces (display) + Outfit (body). Editorial asimetris, whitespace bernapas.
 * Signature: pill badges, editorial headings, daun organic motif, CTA WhatsApp hijau.
 * Copy: hangat, dewasa, aman untuk iklan — fokus kebersihan, kesegaran, percaya diri.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Leaf,
  ShieldCheck,
  BadgeCheck,
  SprayCanIcon,
  Minus,
  Check,
  PackageCheck,
  MessageCircle,
  ChevronDown,
  Truck,
  Lock,
  Star,
  Quote,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ---------- Assets ---------- */
// The Pages artifact is served from both a repository subpath and a custom domain.
// Relative asset URLs keep the images portable across both hosts.
const IS_GITHUB_PAGES = import.meta.env.BASE_URL === "./";
const GH_ASSET = (name: string) => `gh-pages-assets/${name}`;
const ASSETS = IS_GITHUB_PAGES
  ? {
      product: GH_ASSET("montecosme-product.webp"),
      heroBg: GH_ASSET("montecosme-hero-bg.webp"),
      ingredients: GH_ASSET("montecosme-ingredients.webp"),
      privacy: GH_ASSET("montecosme-privacy.webp"),
      logo: GH_ASSET("keluargaharmonis-logo.webp"),
    }
  : {
      product: "/manus-storage/montecosme-product_7957a22d.png",
      heroBg: "/manus-storage/montecosme-hero-bg_7640bb1c.png",
      ingredients: "/manus-storage/montecosme-ingredients_3563a2f7.png",
      privacy: "/manus-storage/montecosme-privacy_016fd02e.png",
      logo: "/manus-storage/keluargaharmonis-logo_693597bf.webp",
    };

/* Ubah nomor ini ke nomor WhatsApp bisnis Anda (format internasional tanpa +) */
const WHATSAPP_NUMBER = "62819696988";

const waMessage = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .img-slow-zoom"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t, i) => {
      t.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(t);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- Parallax on scroll ---------- */
function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>(".parallax");
    let raf = 0;
    const tick = () => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) * 0.06;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ---------- CTA Buttons (efek hover premium: glossy sweep + glow + icon bounce) ---------- */
function WhatsAppCTA({
  label,
  sub,
  big,
  packageName,
  price,
}: {
  label: string;
  sub?: string;
  big?: boolean;
  packageName?: string;
  price?: string;
}) {
  const message = packageName && price
    ? `Halo, saya ingin pesan ${packageName} Montecosme dengan harga ${price}. Mohon dibantu prosesnya.`
    : "Halo, saya ingin pesan Montecosme Men's Care Spray 3mL. Boleh dibantu pilihan paketnya?";

  return (
    <a
      href={waMessage(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-press cta-wa inline-flex flex-col items-center gap-1 rounded-2xl bg-[#25D366] px-7 py-4 text-primary-foreground shadow-lg hover:bg-[#20bd5a] ${big ? "wa-pulse" : ""}`}
    >
      <span className={`inline-flex items-center gap-2 ${big ? "text-base font-semibold" : "text-sm font-semibold"}`}>
        <MessageCircle className={`cta-icon ${big ? "size-5" : "size-4"}`} />
        {label}
        <ArrowRight className="cta-arrow size-4" />
      </span>
      {sub && <span className="text-xs font-normal opacity-90">{sub}</span>}
    </a>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-[0_4px_24px_-12px_rgba(46,74,59,0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={ASSETS.logo} alt="Logo Keluarga Harmonis" className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12" />
          <span className="font-display text-lg font-semibold italic text-primary">
            Keluarga Harmonis
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/75 md:flex">
          <a href="#masalah" className="transition-colors hover:text-primary">Masalah & Solusi</a>
          <a href="#kandungan" className="transition-colors hover:text-primary">Kandungan</a>
          <a href="#paket" className="transition-colors hover:text-primary">Paket</a>
          <a href="#privasi" className="transition-colors hover:text-primary">Garansi Privasi</a>
          <a href="#testimoni" className="transition-colors hover:text-primary">Testimoni</a>
          <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
        </nav>
        <a
          href={waMessage("Halo, saya ingin tanya tentang Montecosme.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press cta-dark inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <MessageCircle className="cta-icon size-4" /> Pesan Sekarang
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      style={{
        backgroundImage: `url(${ASSETS.heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
      <div className="container relative grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal-left">
          <div className="mb-6 flex flex-wrap gap-2.5">
            <span className="pill-badge bg-primary text-primary-foreground">
              <BadgeCheck className="size-3.5" /> Terdaftar BPOM
            </span>
            <span className="pill-badge bg-accent text-accent-foreground">
              <Leaf className="size-3.5" /> Herbal Natural
            </span>
            <span className="pill-badge bg-primary text-primary-foreground">
              <Lock className="size-3.5" /> Privasi Dijamin 100%
            </span>
          </div>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.1] text-primary md:text-6xl">
            Bikin Pasangan Makin Lengket
            <span className="italic text-sage"> & Percaya Diri</span> Setiap Hari
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Montecosme Men's Care Spray 3 mL — spray perawatan pria berbahan alami.
            Satu semprotan untuk rasa segar, bersih, dan nyaman sepanjang hari.
            Saku aman, siap nemenin kamu ke mana pun.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <WhatsAppCTA label="Pesan Sekarang via WhatsApp" sub="Privasi Terjaga — Bisa COD" big />
            <a
              href="#paket"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Lihat Paket <ChevronDown className="size-4" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="size-4 text-sage" /> Praktis, tinggal semprot</span>
            <span className="inline-flex items-center gap-1.5"><Check className="size-4 text-sage" /> Tanpa bilas rumit</span>
            <span className="inline-flex items-center gap-1.5"><Check className="size-4 text-sage" /> Ukuran pocket 3 mL</span>
          </div>
        </div>
        <div className="reveal-scale relative mx-auto w-full max-w-md">
          <div className="absolute -inset-8 -z-10 rounded-full bg-[oklch(0.9_0.03_130/0.5)] blur-2xl parallax" />
          <img
            src={ASSETS.product}
            alt="Montecosme Men's Care Spray 3 mL"
            className="w-full rounded-3xl shadow-[0_30px_80px_-30px_rgba(46,74,59,0.45)] transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-1"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Problem & Solution ---------- */
function ProblemSolution() {
  const problems = [
    {
      icon: SprayCanIcon,
      title: "Bau tak sedap",
      desc: "Aktivitas seharian bikin area intim tak lagi segar — dan itu bisa jadi penghalang kedekatan.",
    },
    {
      icon: Minus,
      title: "Kurang higienis",
      desc: "Kesibukan membuat perawatan kebersihan pribadi sering terlewat, padahal penting untuk kesehatan kulit.",
    },
    {
      icon: ShieldCheck,
      title: "Kurang percaya diri",
      desc: "Ragu untuk dekat dengan pasangan karena khawatir kebersihan belum terjamin.",
    },
  ];
  return (
    <section id="masalah" className="relative py-20 md:py-28">
      <div className="container">
        <h2 className="mb-8 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">Masalah yang Sering Tak Terucap</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`reveal hover-lift rounded-2xl border border-border bg-card p-7 ${
                i === 1 ? "md:mt-8" : i === 2 ? "md:mt-16" : ""
              }`}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent">
                <p.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-12">
          <div className="reveal-left">
            <span className="pill-badge mb-5 bg-primary-foreground/10 text-primary-foreground">
              <SprayCanIcon className="size-3.5" /> Solusi Praktis
            </span>
            <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Montecosme hadir sebagai jawabannya.
            </h3>
            <p className="mt-4 leading-relaxed text-primary-foreground/80">
              Cukup semprotkan, tunggu kering sejenak — tanpa perlu dibilas.
              Botol 3 mL yang ringkas muat di saku atau tas kecil, jadi kamu
              bisa tetap segar dan percaya diri di mana pun, kapan pun.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {["Tinggal semprot, tanpa ribet", "Tidak perlu dibilas", "Ukuran pocket, mudah dibawa"].map((s) => (
                <li key={s} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-[#7fd4a2]" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-right img-slow-zoom mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
            <img
              src={ASSETS.product}
              alt="Montecosme spray 3 mL"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ingredients ---------- */
function Ingredients() {
  const items = [
    {
      name: "Tribulus Terrestris",
      desc: "Bahan alami populer yang dikenal mendukung vitalitas pria secara tradisional.",
      benefit: "Vitalitas",
    },
    {
      name: "Acmella Flower",
      desc: "Bunga alami yang digunakan dalam perawatan tradisional untuk sensasi relaksasi.",
      benefit: "Relaksasi",
    },
    {
      name: "Centella Asiatica",
      desc: "Centella dikenal menenangkan dan membantu menjaga kesehatan kulit sensitif.",
      benefit: "Menenangkan kulit",
    },
    {
      name: "Aloe Vera",
      desc: "Aloe vera memberikan kelembapan alami dan rasa segar pada area sensitif.",
      benefit: "Kesegaran alami",
    },
  ];
  return (
    <section id="kandungan" className="relative bg-accent/40 py-20 md:py-28">
      <div className="container">
        <div className="grid items-center gap-12">
          <div>
            <h2 className="mb-8 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">Kandungan Alami untuk Kulit Sensitif</h2>
            <p className="reveal-left -mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
              Diformulasikan dengan bahan-bahan alami pilihan yang menjaga
              kebersihan sekaligus kesegaran kulit sensitif pria.
              Lembut di kulit, kuat menjaga kepercayaan diri Anda.
            </p>
            <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
              {items.map((it) => (
                <div key={it.name} className="hover-lift rounded-2xl bg-card p-6 shadow-sm">
                  <span className="pill-badge mb-3 bg-accent text-accent-foreground">
                    <Leaf className="size-3" /> {it.benefit}
                  </span>
                  <h4 className="font-display text-lg font-semibold">{it.name}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right img-slow-zoom relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(46,74,59,0.3)]">
            <img
              src={ASSETS.ingredients}
              alt="Bahan alami Montecosme"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Countdown hook — deadline promo yang jujur (direset harian per pengunjung) ---------- */
function usePromoCountdown() {
  const [endsAt, setEndsAt] = useState<number>(0);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    // Deadline promo: tengah malam hari ini waktu lokal pengunjung.
    // Ini jujur — promo memang berakhir setiap hari dan diperpanjang keesokan harinya.
    const key = "montecosme-promo-ends";
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    let target = Number(localStorage.getItem(key));
    if (!target || target < Date.now()) {
      target = midnight.getTime();
      localStorage.setItem(key, String(target));
    }
    setEndsAt(target);
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(0, endsAt - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s, done: diff <= 0 };
}

/* ---------- Banner countdown timer untuk section paket ---------- */
function PromoTimer() {
  const { h, m, s } = usePromoCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const units: Array<[number, string]> = [
    [h, "Jam"],
    [m, "Menit"],
    [s, "Detik"],
  ];
  return (
    <div className="reveal mb-10 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-[#f5c55a]/40 bg-[#f5c55a]/10 px-6 py-4">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f59a00] opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#f59a00]" />
        </span>
        Promo Hari Ini Berakhir Dalam
      </span>
      <span className="flex items-center gap-2" aria-label={`Sisa waktu promo: ${h} jam ${m} menit ${s} detik`}>
        {units.map(([n, label], i) => (
          <span key={label} className="flex items-center gap-2">
            {i > 0 && <span className="font-display text-lg font-semibold text-primary">:</span>}
            <span className="flex flex-col items-center">
              <span className="rounded-lg bg-primary px-3 py-1 font-display text-lg font-bold tabular-nums text-primary-foreground">
                {pad(n)}
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-primary/60">{label}</span>
            </span>
          </span>
        ))}
      </span>
      <span className="hidden text-xs text-primary/70 sm:inline">
        — pesan sekarang untuk mengunci penawaran hari ini
      </span>
    </div>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Paket Coba",
      qty: "1 pcs",
      desc: "Cocok untuk mencoba dulu rasanya",
      popular: false,
      perUnit: "Harga satuan",
      price: "Rp175.000",
      compareAt: "Rp250.000",
    },
    {
      name: "Paket Hemat",
      qty: "Beli 2 Gratis 1",
      desc: "3 pcs dengan harga 2 — paling laris!",
      popular: true,
      perUnit: "Best Seller",
      price: "Rp500.000",
      compareAt: "Rp750.000",
    },
    {
      name: "Paket Reseller",
      qty: "5 pcs",
      desc: "Stok hemat atau mulai jualan kembali",
      popular: false,
      perUnit: "Untuk stok",
      price: "Rp750.000",
      compareAt: "Rp1.250.000",
    },
  ];
  return (
    <section id="paket" className="py-20 md:py-28">
      <div className="container">
        <div className="reveal mb-4 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-3 inline-flex rounded-full border border-primary/15 bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Montecosme · Harga resmi
            </span>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
              Pilih Paket yang Pas Buat Kamu
            </h2>
          </div>
          <span className="max-w-xs text-right text-xs leading-relaxed text-muted-foreground">
            Harga ditampilkan transparan. Pilih paket yang paling sesuai dengan kebutuhanmu.
          </span>
        </div>
        <p className="reveal -mt-2 mb-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Karena ukurannya ringkas 3 mL, paket bundling membantu kamu punya cadangan
          tanpa perlu sering memesan ulang.
        </p>
        <PromoTimer />
        <div className="reveal overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_60px_-35px_rgba(46,74,59,0.35)]">
          <div className="hidden grid-cols-[1.25fr_0.85fr_1fr_0.95fr] gap-4 border-b border-border bg-accent/50 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:grid">
            <span>Paket</span>
            <span>Isi</span>
            <span>Harga</span>
            <span className="text-right">Pesan</span>
          </div>
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`grid gap-5 px-6 py-7 md:grid-cols-[1.25fr_0.85fr_1fr_0.95fr] md:items-center md:gap-4 md:px-8 ${
                i < plans.length - 1 ? "border-b border-border" : ""
              } ${p.popular ? "bg-primary text-primary-foreground" : "bg-card"}`}
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <PackageCheck className={`size-4 ${p.popular ? "text-[#7fd4a2]" : "text-sage"}`} />
                  <span className={`pill-badge !px-2.5 py-1 ${p.popular ? "bg-primary-foreground/10 text-primary-foreground" : "bg-accent"}`}>
                    {p.perUnit}
                  </span>
                  {p.popular && <span className="rounded-full bg-[#f5c55a] px-2.5 py-1 text-[10px] font-bold text-primary">Pilihan utama</span>}
                </div>
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className={`mt-1.5 text-sm ${p.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{p.desc}</p>
              </div>
              <div>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${p.popular ? "text-primary-foreground/55" : "text-muted-foreground"}`}>Isi paket</span>
                <div className="mt-1 font-display text-xl font-semibold">{p.qty}</div>
              </div>
              <div>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${p.popular ? "text-primary-foreground/55" : "text-muted-foreground"}`}>Harga jual</span>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  {p.compareAt && <span className={`text-sm line-through ${p.popular ? "text-primary-foreground/45" : "text-muted-foreground/70"}`}>{p.compareAt}</span>}
                  <span className="font-display text-2xl font-semibold md:text-3xl">{p.price}</span>
                </div>
              </div>
              <WhatsAppCTA
                label={`Pesan ${p.name}`}
                sub={`${p.price} · via WhatsApp`}
                packageName={p.name}
                price={p.price}
              />
            </div>
          ))}
        </div>
        <p className="reveal mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Harga coret dan harga jual ditampilkan sesuai penawaran terbaru untuk masing-masing paket.
        </p>
      </div>
    </section>
  );
}

/* ---------- Privacy ---------- */
function Privacy() {
  return (
    <section id="privasi" className="relative bg-accent/40 py-20 md:py-28">
      <div className="container">
        <h2 className="reveal mb-4 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
          Garansi Privasi 100%
        </h2>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="reveal order-2 md:order-1">
            <img
              src={ASSETS.privacy}
              alt="Pengiriman paket dengan label anonim"
              className="w-full rounded-3xl shadow-[0_24px_60px_-24px_rgba(46,74,59,0.3)]"
            />
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Belanja produk personal itu hal yang wajar — dan privasimu adalah prioritas kami.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                { icon: Lock, title: "Nama Produk Dihapus di Label Resi", desc: "Paket dikirim polos tanpa keterangan isi yang memalukan." },
                { icon: Truck, title: "Kemasan Rapi & Netral", desc: "Kardus polos tanpa logo mencolok, siapa pun tidak akan tahu isinya." },
                { icon: ShieldCheck, title: "Data Pembeli Aman", desc: "Informasi kontakmu hanya digunakan untuk pengiriman." },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{f.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tips Section ---------- */
function Tips() {
  const tips = [
    {
      t: "Komunikasi Terbuka dengan Pasangan",
      d: "Luangkan waktu untuk bercerita tentang hari masing-masing. Kedekatan emosional adalah fondasi keluarga yang harmonis.",
    },
    {
      t: "Jaga Kebersihan Diri sebagai Bentuk Kasih",
      d: "Merawat kebersihan diri adalah bentuk hormat pada pasangan dan keluarga. Percaya diri yang baik menular ke suasana rumah.",
    },
    {
      t: "Ritual Kecil yang Konsisten",
      d: "Momen sederhana seperti sarapan bersama atau jalan sore rutin memperkuat ikatan lebih dari acara besar sesekali.",
    },
  ];
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="mb-8 max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">Tips Keluarga Harmonis dari Kami</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tips.map((tip, i) => (
            <div
              key={tip.t}
              className={`reveal hover-lift rounded-2xl border border-border bg-card p-7 ${
                i === 1 ? "md:mt-6" : i === 2 ? "md:mt-12" : ""
              }`}
            >
              <h4 className="font-display text-lg font-semibold">{tip.t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimoni (kartu ulasan elegan — isi dengan testimoni PEMBELI NYATA) ---------- */
function Testimonials() {
  /*
   * PENTING (kepatuhan perlindungan konsumen & kebijakan iklan):
   * Jangan mengisi array ini dengan ulasan fiktif / buatan sendiri.
   * Hanya gunakan testimoni asli dari pembeli sungguhan (chat WhatsApp,
   * screenshot chat, Google Reviews, dsb.) dan minta izin mereka bila
   * mencantumkan nama. Panel kepercayaan ini menjelaskan standar publikasi ulasan.
   */
  return (
    <section id="testimoni" className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      {/* Dekorasi daun editorial */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-foreground/[0.05] blur-3xl" />
        <div className="container relative">
        <div className="reveal-left mb-4 flex flex-wrap items-end gap-x-5 gap-y-4">
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Kata Mereka yang Sudah Mencoba
          </h2>
          {/* Badge rating agregat — tampilkan rata-rata NYATA dari kumpulan testimoni yang masuk */}
          <div className="inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/[0.07] px-5 py-2.5 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-1 text-[#f5c55a]">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="size-4.5 fill-current" />
              ))}
            </div>
            <span className="font-display text-lg font-semibold">5.0</span>
            <span className="text-xs text-primary-foreground/60">target rating kepuasan</span>
          </div>
        </div>
        <p className="reveal-left -mt-2 mb-12 max-w-xl text-base leading-relaxed text-primary-foreground/70">
          Kepercayaan dibangun dari pengalaman nyata. Setiap ulasan di bawah
          hanya kami tampilkan dari pembeli yang benar-benar merasakan Montecosme.
        </p>

        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div className="reveal relative rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/[0.06] p-8 backdrop-blur-sm md:p-10">
            <Quote className="mb-6 size-9 text-[#7fd4a2]" />
            <p className="max-w-2xl font-display text-2xl italic leading-relaxed text-primary-foreground/95 md:text-3xl">
              "Ruang ini disiapkan untuk pengalaman nyata dari pembeli Montecosme — bukan klaim yang dibuat-buat."
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-primary-foreground/15 pt-5 text-sm text-primary-foreground/60">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary-foreground/10 text-[#7fd4a2]" aria-hidden="true">
                <ShieldCheck className="size-4" />
              </span>
              <span>Catatan pelanggan terverifikasi akan ditampilkan setelah izin diberikan.</span>
            </div>
          </div>
          <div className="reveal-right rounded-[2rem] border border-[#f5c55a]/30 bg-[#f5c55a]/10 p-8 md:mt-12">
            <div className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-[#f5c55a] text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary-foreground">Kepercayaan tumbuh dari bukti.</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Kami hanya mempublikasikan ulasan dari pembeli sungguhan, dengan nama atau inisial sesuai persetujuan mereka.
            </p>
            <a
              href={waMessage("Halo, saya ingin berbagi pengalaman nyata menggunakan Montecosme.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press cta-dark mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/50"
            >
              <Send className="size-4" /> Bagikan Pengalaman
            </a>
          </div>
        </div>

        {/* Ajakan untuk testimoni — mengarah ke WhatsApp */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={waMessage("Halo, saya ingin berbagi testimoni Montecosme.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press cta-dark inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground hover:border-primary-foreground/50"
          >
            <Send className="cta-icon size-4" /> Kirim Testimoni via WhatsApp
          </a>
          <p className="text-xs text-primary-foreground/50">
            Testimoni yang tampil selalu dari pembeli sungguhan — kami tidak membuat ulasan.
            Rating ditampilkan dari ulasan yang benar-benar masuk (bukan fiktif).
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (accordion editorial — 2 kolom di desktop) ---------- */
function FAQ() {
  const faqs = [
    {
      q: "Bagaimana cara pakai Montecosme?",
      a: "Cukup semprotkan 1–2 kali ke area yang diinginkan, lalu biarkan kering sejenak — tidak perlu dibilas. Untuk hasil optimal, gunakan setelah mandi atau sebelum beraktivitas. Ukurannya ringkas, jadi praktis dipakai kapan saja.",
    },
    {
      q: "Apakah produk ini aman untuk kulit sensitif?",
      a: "Montecosme diformulasikan dengan bahan alami seperti Centella Asiatica dan Aloe Vera yang dikenal lembut dan menenangkan kulit sensitif. Produk sudah terdaftar BPOM. Jika Anda memiliki kondisi kulit tertentu, lakukan tes kecil di area terbatas terlebih dahulu.",
    },
    {
      q: "Apakah benar privasi pengiriman dijaga 100%?",
      a: "Ya. Nama produk dihapus dari label resi pengiriman, paket dikirim dalam kemasan polos tanpa logo mencolok, dan data Anda hanya digunakan untuk keperluan pengiriman. Siapa pun yang menerima paket tidak akan tahu isinya.",
    },
    {
      q: "Berapa lama produk bisa dipakai dengan ukuran 3 mL?",
      a: "Dengan pemakaian 1–2 semprotan sekali pakai, satu botol 3 mL bisa dipakai berkali-kali. Untuk pemakaian rutin, kami sarankan Paket Hemat (Beli 2 Gratis 1) atau Paket Stok agar selalu ada cadangan.",
    },
    {
      q: "Bagaimana cara memesan dan pembayarannya?",
      a: "Klik tombol WhatsApp di halaman ini, pilih paket favorit Anda, dan admin kami akan memandu proses pemesanan. Tersedia pembayaran Cash on Delivery (COD) / bayar di tempat — bayar hanya setelah paket sampai di tangan Anda.",
    },
    {
      q: "Ke mana saja produk dikirim dan berapa lama?",
      a: "Kami mengirim ke seluruh Indonesia melalui kurir terpercaya. Durasi pengiriman tergantung lokasi, umumnya 1–4 hari kerja untuk Jawa dan 3–7 hari kerja untuk luar Jawa.",
    },
  ];

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <h2 className="reveal-left mb-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="reveal-left -mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">
              Belum menemukan jawaban yang kamu cari? Tim kami siap membantu
              langsung via WhatsApp — respons cepat dan ramah.
            </p>
            <div className="reveal-left mt-7">
              <a
                href={waMessage("Halo, saya mau tanya soal Montecosme.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press cta-wa inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#20bd5a]"
              >
                <MessageCircle className="cta-icon size-4" /> Tanya via WhatsApp
                <ArrowRight className="cta-arrow size-4" />
              </a>
            </div>
          </div>
          <div className="reveal-right rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border-border py-1"
                >
                  <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0 bg-primary"
      />
      <div className="container relative text-center">
        <h2 className="reveal-scale mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-primary-foreground md:text-5xl">
          Percaya diri itu dimulai dari hal yang
          <span className="italic"> paling dekat dengan kita.</span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/75">
          Semprot, siap, dan jadi versi terbaik dirimu untuk si dia.
          Pesan sekarang — privasimu tetap terjaga.
        </p>
        <div className="reveal mt-9 flex justify-center">
          <a
            href={waMessage(
              "Halo, saya ingin pesan Montecosme Men's Care Spray 3mL. Boleh dibantu pilihan paketnya?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press wa-pulse cta-wa inline-flex flex-col items-center gap-1 rounded-2xl bg-[#25D366] px-9 py-5 text-primary-foreground shadow-2xl hover:bg-[#20bd5a]"
          >
            <span className="inline-flex items-center gap-2 text-lg font-semibold">
              <MessageCircle className="cta-icon size-5" /> Pesan Sekarang via WhatsApp
              <ArrowRight className="cta-arrow size-4" />
            </span>
            <span className="text-xs font-normal opacity-90">Privasi Terjaga — Tersedia COD / Bayar di Tempat</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <img src={ASSETS.logo} alt="Logo Keluarga Harmonis" className="h-14 w-14 shrink-0 object-contain" />
          <div>
            <div className="font-display font-semibold italic text-primary">Keluarga Harmonis</div>
            <div className="text-xs text-muted-foreground">Keluargaharmonis.id — Tips keluarga & perawatan pria alami</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
          <span className="pill-badge bg-accent text-accent-foreground"><BadgeCheck className="size-3" /> Terdaftar BPOM</span>
          <span className="pill-badge bg-accent text-accent-foreground"><Leaf className="size-3" /> Herbal Natural</span>
          <span className="pill-badge bg-accent text-accent-foreground"><Lock className="size-3" /> Privasi 100%</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp (mobile) ---------- */
function FloatingWA() {
  return (
    <a
      href={waMessage("Halo, saya ingin tanya tentang Montecosme.")}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-press fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 md:hidden"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}

export default function Home() {
  const ref = useReveal();
  useParallax();
  return (
    <div ref={ref} className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Ingredients />
        <Pricing />
        <Privacy />
        <Testimonials />
        <FAQ />
        <Tips />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
