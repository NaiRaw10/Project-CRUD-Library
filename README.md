# Full-Stack Project: Express & Next.js CRUD Library

Project aplikasi web full-stack untuk manajemen data perpustakaan/koleksi yang dibangun menggunakan **Express.js (TypeScript)** di sisi backend, **Next.js & Tailwind CSS** di sisi frontend, dan **MySQL (`mysql2`)** untuk penyimpanan database.

## Tech Stack

* **Backend:** Express.js, TypeScript, Node.js, MySQL (`mysql2`)
* **Frontend:** Next.js (App Router), Tailwind CSS
* **Tools & Workflow:** Git, GitHub, Postman

## Project Structure

```text
Project-CRUD-Library/
│
├── backend/                  # REST API Express.js + TypeScript
│   ├── src/
│   │   ├── controllers/      # Logika CRUD
│   │   ├── routes/           # Routing endpoint API
│   │   └── app.ts            # Entry point server
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Tampilan Next.js + Tailwind CSS
│   ├── app/                  # Halaman & App Router Next.js
│   ├── components/           # Komponen UI
│   └── package.json
│
├── .gitignore                # File & folder yang di-ignore oleh Git
└── README.md                 # Dokumentasi project