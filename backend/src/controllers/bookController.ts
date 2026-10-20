import { Request, Response } from "express";
import db from "../config/db";

// 1. Ambil Semua Buku (Sudah mendukung Search & Filter Kategori Novel/Komik)
export async function getAllBooks(req: Request, res: Response) {
  try {
    const { keyword, category } = req.query;

    let query = "SELECT * FROM books WHERE 1=1";
    let params: any[] = [];

    if (keyword) {
      query += " AND title LIKE ?";
      params.push(`%${keyword}%`);
    }

    if (category && category !== "Semua") {
      query += " AND category = ?";
      params.push(category);
    }

    const [rows] = await db.query(query, params);

    return res.status(200).json({
      message: "Berhasil mengambil data buku",
      data: rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Gagal mengambil data buku",
      error: error.message,
    });
  }
}

// 2. Ambil Detail Buku Berdasarkan ID (Untuk Halaman Detail)
export async function getBookById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const [rows]: any = await db.query("SELECT * FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Buku dengan ID tersebut tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil detail buku",
      data: rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Gagal mengambil detail buku",
      error: error.message,
    });
  }
}

// 3. Tambah Buku Baru (Sudah ada description & kategori Novel/Komik)
export async function createBook(req: Request, res: Response) {
  try {
    const {
      title,
      author,
      page,
      category,
      cover_url,
      description, // <-- Kolom baru ditambahkan di sini
    } = req.body;

    const [result]: any = await db.query(
      "INSERT INTO books (title, author, page, category, cover_url, description) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, page, category, cover_url, description]
    );

    return res.status(201).json({
      message: "Buku berhasil ditambahkan",
      bookId: result.insertId,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Gagal menambahkan buku",
      error: error.message,
    });
  }
}

// 4. Update Buku (Ditambahkan description)
export async function updateBook(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      page,
      category,
      cover_url,
      description, // <-- Ditambahkan di update juga
    } = req.body;

    const [result]: any = await db.query(
      "UPDATE books SET title = ?, author = ?, page = ?, category = ?, cover_url = ?, description = ? WHERE id = ?",
      [title, author, page, category, cover_url, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Buku dengan ID tersebut tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Data buku berhasil diperbarui",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Gagal memperbarui data buku",
      error: error.message,
    });
  }
}

// 5. Hapus Buku (Tetap sama)
export async function deleteBook(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [result]: any = await db.query("DELETE FROM books WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Buku dengan ID tersebut tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Buku berhasil dihapus",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Gagal menghapus buku",
      error: error.message,
    });
  }
}