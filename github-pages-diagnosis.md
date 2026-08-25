# Diagnosis GitHub Pages

URL yang diuji: https://jejerichsangjuragan.github.io/keluargaharmonis/

Hasil: GitHub Pages mengembalikan halaman 404 `File not found`, bukan blank page dari React.

Temuan repository: branch `main` hanya berisi source project dengan entry `client/index.html`; tidak ada `index.html` hasil build di root, tidak ada workflow di `.github/workflows`, dan konfigurasi Pages saat ini adalah `build_type: legacy`, source branch `main`, path `/`.

Implikasi: GitHub Pages legacy mencari `index.html` di root, tetapi project Vite belum dibuild/deploy ke root atau artifact Pages. Selain itu, konfigurasi Vite belum memiliki base path `/keluargaharmonis/`, sehingga asset build perlu disesuaikan untuk URL subdirektori. Asset `/manus-storage/...` juga perlu dibuat tersedia secara lokal atau dipertahankan sebagai fallback agar dapat dimuat di GitHub Pages.

Rencana perbaikan: gunakan GitHub Actions Pages workflow untuk build client dan deploy artifact `dist/public`, set base path `/keluargaharmonis/`, dan audit asset URL untuk deployment statis.

## Batas izin

Percobaan mengubah konfigurasi Pages menjadi `build_type: workflow` ditolak GitHub dengan HTTP 403 (`Resource not accessible by integration`). Karena Pages masih memakai legacy source `main` + `/`, perbaikan memakai fallback kompatibel: commit artifact build statis ke root repository (`index.html`, `assets/`, `gh-pages-assets/`) dengan base `/keluargaharmonis/`. Workflow Actions tetap disiapkan sebagai opsi, tetapi tidak menjadi satu-satunya jalur publikasi.
