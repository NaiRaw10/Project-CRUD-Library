import { X, BookPlus, Save } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Book {
  id?: number;
  title: string;
  author?: string;
  page?: string | number; // <-- Tambahan field page
  category: string;
  cover_url: string;
  description?: string;
}

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit?: Book | null;
  onSave: (bookData: Book) => void;
  isSaving: boolean;
}

export default function BookFormModal({
  isOpen,
  onClose,
  bookToEdit,
  onSave,
  isSaving
}: BookFormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isEditing = !!bookToEdit;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(""); // <-- State untuk halaman
  const [category, setCategory] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || "");
      setAuthor(bookToEdit.author || "");
      setPage(bookToEdit.page ? String(bookToEdit.page) : "");
      setCategory(bookToEdit.category || "");
      setCoverUrl(bookToEdit.cover_url || "");
      setDescription(bookToEdit.description || "");
    } else {
      setTitle("");
      setAuthor("");
      setPage("");
      setCategory("");
      setCoverUrl("");
      setDescription("");
    }
  }, [bookToEdit, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData: Book = {
      id: bookToEdit?.id,
      title,
      author,
      page, // <-- Kirim data page
      category,
      cover_url: coverUrl,
      description
    };
    onSave(bookData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-3xl rounded-4xl p-8 flex flex-col gap-6 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BookPlus size={26} className="text-[#C4D664]" />
            <h2 className="text-xl font-bold text-gray-800">
              {isEditing ? "Edit Buku" : "Tambah Buku Baru"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Judul Buku *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Masukkan judul buku"
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Penulis</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Masukkan nama penulis"
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Input Jumlah Halaman */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Jumlah Halaman (Page)</label>
              <input
                type="text"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                placeholder="Contoh: 156 atau 244"
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Kategori *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="Masukkan kategori (misal: Novel)"
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">URL Gambar Cover *</label>
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">Deskripsi Singkat</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Tuliskan deskripsi singkat buku..."
                className="w-full px-4 py-2.5 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm text-gray-800 placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all text-sm cursor-pointer disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-gray-900 font-semibold hover:opacity-90 transition-all text-sm flex items-center gap-2 cursor-pointer disabled:opacity-60"
              style={{ backgroundColor: "#C4D664" }}
            >
              <Save size={16} />
              {isSaving ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Buku"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}