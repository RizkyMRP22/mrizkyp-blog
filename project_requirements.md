# QA Portfolio Project Requirements

Dokumen ini berisi requirement development untuk project Web Portofolio QA yang dibagi menjadi dua perspektif:
1. **Product Owner**: Epics, User Stories, dan Acceptance Criteria (AC).
2. **Software Engineer**: Tasks dan Subtasks yang diturunkan dari User Stories.

---

## Bagian 1: Perspektif Product Owner (Epic, User Story, Acceptance Criteria)

### Epic 1: Portfolio Presentation & Profile Management
**Deskripsi**: Menyediakan informasi dasar mengenai profil, pengalaman, dan keahlian QA Engineer kepada pengunjung web (recruiter/klien).

* **User Story 1.1**: Sebagai pengunjung, saya ingin melihat halaman utama (Home) dan "About" yang menarik sehingga saya bisa mengenal QA Engineer tersebut.
  * **Acceptance Criteria**:
    * Halaman Home menampilkan perkenalan singkat, role, dan foto profil.
    * Terdapat navigasi yang mudah diakses ke halaman lain (About, Experience, Skills, dll).
    * Halaman responsif di desktop dan mobile.
* **User Story 1.2**: Sebagai recruiter, saya ingin melihat daftar pengalaman kerja (Experience) dan keahlian (Skills) sehingga saya bisa menilai kualifikasi kandidat.
  * **Acceptance Criteria**:
    * Halaman `/experience` menampilkan riwayat pekerjaan berurutan dari yang terbaru.
    * Halaman `/skills` menampilkan pengelompokkan skill (misal: Automation, Manual Testing, Tools).
* **User Story 1.3**: Sebagai pengunjung, saya ingin melihat daftar proyek (Projects) dan studi kasus (Case Studies) sehingga saya tahu implementasi nyata dari skill kandidat.
  * **Acceptance Criteria**:
    * Halaman `/projects` menampilkan kartu/list proyek.
    * Halaman `/case-studies` menampilkan detail problem, approach, dan result dari suatu kasus QA.

### Epic 2: Quality Assurance Capabilities Showcase
**Deskripsi**: Menampilkan secara spesifik dokumen dan strategi pengujian untuk mendemonstrasikan kompetensi QA secara teknis.

* **User Story 2.1**: Sebagai recruiter, saya ingin membaca "Testing Strategy" sehingga saya paham bagaimana kandidat melakukan pendekatan kualitas software.
  * **Acceptance Criteria**:
    * Halaman `/testing-strategy` dapat diakses dan menampilkan konten terstruktur mengenai strategi pengujian.
* **User Story 2.2**: Sebagai recruiter, saya ingin melihat "Test Artifacts" (contoh test case, bug report) agar saya bisa menilai kualitas dokumentasi kandidat.
  * **Acceptance Criteria**:
    * Halaman `/test-artifacts` menampilkan list dokumen pengujian.
    * Pengunjung dapat melihat format test case/bug report yang rapi.

### Epic 3: Endorsements / Testimonials System
**Deskripsi**: Sistem yang memungkinkan rekan kerja memberikan ulasan/testimoni dan menampilkannya di web.

* **User Story 3.1**: Sebagai pengunjung, saya ingin melihat daftar endorsement yang sudah disetujui sebagai *social proof*.
  * **Acceptance Criteria**:
    * Halaman `/endorsements` menampilkan list testimoni (Nama, Role, Pesan).
    * Data diambil dengan cepat (didukung mekanisme caching).
* **User Story 3.2**: Sebagai rekan kerja, saya ingin bisa mengirimkan endorsement melalui form di web.
  * **Acceptance Criteria**:
    * Terdapat tombol/modal untuk "Submit Endorsement".
    * Form mewajibkan input: Nama, Role, Email, dan Pesan.
    * Terdapat validasi anti-spam menggunakan Cloudflare Turnstile sebelum submit.
* **User Story 3.3**: Sebagai pemilik web (Admin), saya ingin melakukan *approval* terhadap endorsement yang masuk sebelum ditampilkan ke publik.
  * **Acceptance Criteria**:
    * Endorsement baru masuk ke database (MongoDB) dengan status `pending`.
    * Endorsement `pending` tidak tampil di halaman publik.
    * Tersedia mekanisme/API `/api/endorsements/approve` untuk menyetujui.
* **User Story 3.4**: Sebagai endorser, saya ingin menerima notifikasi email saat endorsement saya diterbitkan.
  * **Acceptance Criteria**:
    * Saat status berubah menjadi `approved`, sistem mengirimkan email ke alamat endorser.
    * Email dikirim menggunakan layanan email (Resend) dengan template yang rapi.

### Epic 4: Contact & Communication
**Deskripsi**: Menyediakan sarana bagi pengunjung untuk menghubungi QA Engineer.

* **User Story 4.1**: Sebagai pengunjung, saya ingin bisa menghubungi kandidat melalui halaman Contact.
  * **Acceptance Criteria**:
    * Halaman `/contact` menampilkan informasi kontak (Email, LinkedIn, GitHub).
    * Terdapat navigasi yang mulus (smooth scroll/focus) saat pengunjung menekan opsi kontak di perangkat mobile.

### Epic 5: Blog & Articles
**Deskripsi**: Menyediakan platform bagi QA Engineer untuk berbagi pengetahuan.

* **User Story 5.1**: Sebagai pengunjung, saya ingin membaca artikel terkait QA di halaman Blog.
  * **Acceptance Criteria**:
    * Halaman `/blog` menampilkan daftar artikel terbaru.
    * Pengunjung dapat mengklik dan membaca isi penuh artikel.

---

## Bagian 2: Perspektif Software Developer Engineer (Task & Subtask)

Berikut adalah *breakdown* teknikal (Tasks & Subtasks) untuk mengimplementasikan User Stories di atas, disesuaikan dengan stack Next.js, Tailwind CSS, MongoDB, Redis, dan Resend.

### Task 1: Setup & Layout Foundation (Turunan Epic 1)
* **Task 1.1: Inisialisasi Proyek dan Routing**
  * Subtask: Setup Next.js App Router.
  * Subtask: Konfigurasi Tailwind CSS (v4) dan PostCSS.
  * Subtask: Buat kerangka folder routing (`/about`, `/experience`, `/skills`, `/projects`).
* **Task 1.2: Pengembangan Komponen UI Reusable**
  * Subtask: Implementasi Atomic Design (folder `atoms`, `molecules`, `organisms`, `templates`).
  * Subtask: Buat komponen global (Navbar, Footer, Layout wrapper).

### Task 2: Implementasi Halaman Statis QA Showcase (Turunan Epic 1 & 2)
* **Task 2.1: Develop Halaman Experience & Skills**
  * Subtask: Buat UI untuk timeline experience.
  * Subtask: Buat komponen badges/cards untuk daftar skills.
* **Task 2.2: Develop QA Knowledge Base Pages**
  * Subtask: Bangun UI statis untuk `/testing-strategy`.
  * Subtask: Bangun UI untuk `/test-artifacts` (tabel atau list view untuk dokumen).

### Task 3: Pengembangan Sistem Endorsement (Turunan Epic 3)
* **Task 3.1: Database & Caching Setup**
  * Subtask: Setup koneksi MongoDB (`src/lib/mongodb.ts`) & definisikan schema koleksi `endorsements`.
  * Subtask: Setup koneksi Redis (`src/lib/redis.ts`) untuk caching GET request.
* **Task 3.2: API Route Management**
  * Subtask: Buat API `POST /api/endorsements` untuk menerima data baru (default status: pending).
  * Subtask: Buat API `GET /api/endorsements` dengan implementasi Redis cache.
  * Subtask: Buat API `POST /api/endorsements/approve` untuk admin melakukan approval.
* **Task 3.3: Integrasi Frontend Endorsement**
  * Subtask: Buat halaman `/endorsements` untuk fetch & display data.
  * Subtask: Buat `EndorsementFormModal` (Organism).
  * Subtask: Integrasikan `@marsidev/react-turnstile` di form untuk spam protection.
  * Subtask: Handle mobile view khusus untuk Turnstile agar responsif.
* **Task 3.4: Sistem Notifikasi Email**
  * Subtask: Setup `src/lib/resend.ts` dengan API Key.
  * Subtask: Buat template React Email di `src/lib/emails/index.ts` untuk notifikasi approval.
  * Subtask: Panggil fungsi kirim email di dalam endpoint `/api/endorsements/approve` setelah status berhasil diupdate.

### Task 4: Halaman Contact & Integrasi (Turunan Epic 4)
* **Task 4.1: Develop Contact Page UI**
  * Subtask: Buat halaman `/contact` dengan informasi sosial media.
  * Subtask: Handle UI state & perbaiki UX mobile navigation untuk contact form agar saat diklik langsung auto-focus ke area form.

### Task 5: Sistem Blog (Turunan Epic 5)
* **Task 5.1: Content Management Setup**
  * Subtask: Buat halaman list `/blog`.
  * Subtask: Buat dynamic route `/blog/[slug]` untuk membaca artikel spesifik.
