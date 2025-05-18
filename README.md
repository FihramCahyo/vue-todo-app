# Vue Todo App

Aplikasi Todo List dengan Vue 3, Tailwind CSS, dan Pinia.

## Deskripsi

Aplikasi ini adalah aplikasi Todo List lengkap yang dibangun dengan Vue 3, Vite, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan fitur manajemen tugas dengan autentikasi pengguna, tema gelap/terang, dan antarmuka yang responsif.

## Fitur

- **Autentikasi Pengguna**

  - Login dan logout
  - Perlindungan rute dengan authentication guards

- **Manajemen Todo**

  - Melihat daftar tugas
  - Menambahkan tugas baru
  - Mengedit tugas yang ada
  - Menghapus tugas
  - Menandai tugas sebagai selesai/belum selesai
  - Pencarian tugas

- **UI/UX**

  - Tema gelap/terang yang dapat dipilih pengguna
  - Penyimpanan preferensi tema di localStorage
  - Tampilan skeleton loading saat memuat data
  - Notifikasi toast untuk feedback pengguna
  - Responsif untuk berbagai ukuran layar

- **Fitur Tambahan**
  - Validasi form dengan Yup
  - Penanganan error API
  - Penanganan token kedaluwarsa

## Teknologi yang Digunakan

- **Frontend**
  - Vue 3 dengan Composition API
  - TypeScript untuk type safety
  - Vite sebagai build tool
  - Tailwind CSS untuk styling
  - Pinia untuk state management
  - Vue Router untuk routing
  - Axios untuk HTTP requests
  - Vue3-Toastify untuk notifikasi
  - Yup untuk validasi form

## Struktur Folder

```
vue-todo-app/
├── public/             # Aset statis
├── src/
│   ├── assets/         # Aset aplikasi (CSS, gambar)
│   ├── components/     # Komponen Vue yang dapat digunakan kembali
│   ├── pages/          # Halaman utama aplikasi
│   ├── router/         # Konfigurasi Vue Router
│   ├── services/       # Layanan API
│   ├── stores/         # Pinia stores
│   ├── types/          # TypeScript type definitions
│   ├── App.vue         # Komponen root
│   └── main.ts         # Entry point aplikasi
├── index.html          # Template HTML
├── package.json        # Dependensi dan scripts
├── tsconfig.json       # Konfigurasi TypeScript
├── vite.config.ts      # Konfigurasi Vite
└── README.md           # Dokumentasi
```

## Persyaratan

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

## Instalasi

1. Clone repositori ini
2. Instal dependensi:

```sh
npm install
```

## Pengembangan

Untuk menjalankan server pengembangan:

```sh
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173/`

## Build untuk Produksi

Untuk membangun aplikasi untuk produksi:

```sh
npm run build
```

File hasil build akan tersedia di folder `dist/`

## Linting

Untuk menjalankan linter:

```sh
npm run lint
```

## Fitur Tambahan

### Validasi Form

Aplikasi menggunakan Yup untuk validasi form yang kuat, memastikan data yang dimasukkan pengguna valid sebelum dikirim ke server.

### Notifikasi Toast

Menggunakan Vue3-Toastify untuk memberikan feedback kepada pengguna tentang hasil operasi (sukses/gagal).

### Skeleton Loading

Menampilkan komponen skeleton loading saat data sedang dimuat untuk meningkatkan pengalaman pengguna.

### Preferensi Tema Persisten

Menyimpan preferensi tema (gelap/terang) pengguna di localStorage sehingga tetap konsisten di seluruh sesi.

### Penanganan Error API

Menangani error dari API dengan baik dan menampilkan pesan yang sesuai kepada pengguna.

### Penanganan Token Kedaluwarsa

Secara otomatis mengarahkan pengguna ke halaman login saat token autentikasi kedaluwarsa.

## Pengembangan Lebih Lanjut

Beberapa ide untuk pengembangan lebih lanjut:

- Implementasi registrasi pengguna
- Fitur kategori untuk tugas
- Fitur tenggat waktu dan pengingat
- Fitur berbagi tugas dengan pengguna lain
- Sinkronisasi offline dengan IndexedDB

## Lisensi

[MIT](LICENSE)

        Too many current requests. Your queue position is 1. Please wait for a while or switch to other models for a smoother experience.
