## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Shadcn UI


## Cara Menjalankan

Install dependency:

```bash
bun install
```

Jalankan development server:

```bash
bun dev
```

Build production:

```bash
bun run build
```

Lint:

```bash
bun run lint
```

Format kode:

```bash
bun run format
```

## Fitur yang Selesai

### Level 1

- ✅ List Karyawan
- ✅ Search Employee
- ✅ Detail Employee

### Level 2

- ✅ Tambah Karyawan
- ✅ Ubah Karyawan
- ✅ Hapus Karyawan
- ✅ Filter Departemen


## Struktur State Management

### useEmployeeStore

State yang hanya digunakan oleh fitur Employee ditempatkan pada store fitur

Contoh:
- listEmployee
- selectedEmployee
- page
- keyword
- selectedDepartment
- editingEmployee
- isFormOpen

Alasan:
State tersebut hanya digunakan pada modul Employee sehingga tidak perlu ditempatkan di global store


### useState

Digunakan untuk state yang bersifat lokal dan hanya dipakai oleh satu komponen

Contoh:

- nilai input pencarian sebelum debounce
- status dialog hapus
- employee yang sedang dipilih untuk dihapus

Alasan:
State lokal tidak perlu dimasukkan ke Zustand untuk menghindari kompleksitas yang tidak diperlukan


## Kendala yang Ditemui

- DummyJSON tidak menyimpan perubahan data secara permanen sehingga perubahan create, update, dan delete harus disinkronkan ke Zustand Store agar UI tetap konsisten
- Pagination sempat kembali ke halaman pertama karena perubahan keyword memicu reset page
- Data hasil update dapat tertimpa oleh response API ketika berpindah halaman sehingga diperlukan sinkronisasi state lokal