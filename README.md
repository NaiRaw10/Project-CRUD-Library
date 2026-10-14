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