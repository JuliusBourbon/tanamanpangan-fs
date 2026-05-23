# API Documentation

Base URL: `/api`

---

## 📁 Routes

- [Auth](#auth-routes) — `/auth`
- [Classify](#classify-routes) — `/api/classify`
- [Disease](#disease-routes) — `/api/diseases`

---

## Auth Routes

### `POST /auth/register`
Mendaftarkan pengguna baru.

**Request Body (JSON):**
| Field | Type | Required | Keterangan |
|-------|------|----------|------------|
| `name` | string | ✅ | Nama pengguna |
| `email` | string | ✅ | Format email valid |
| `password` | string | ✅ | Minimal 8 karakter |

**Response:**
```json
// 201 Created
{
  "message": "Registrasi berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": null,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "<jwt_token>"
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Semua field wajib diisi / Format email tidak valid / Password minimal 8 karakter |
| `409` | Email sudah terdaftar |
| `500` | Terjadi kesalahan server |

---

### `POST /auth/login`
Login pengguna dan mendapatkan token JWT.

**Request Body (JSON):**
| Field | Type | Required |
|-------|------|----------|
| `email` | string | ✅ |
| `password` | string | ✅ |

**Response:**
```json
// 200 OK
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": null,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "<jwt_token>"
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Email dan password wajib diisi |
| `401` | Email atau password salah |
| `500` | Terjadi kesalahan server |

---

### `GET /auth/me`
Mendapatkan data pengguna yang sedang login.

🔒 **Requires Authentication**

**Response:**
```json
// 200 OK
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": "https://...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `401` | Unauthorized |
| `500` | Terjadi kesalahan server |

---

### `PUT /auth/change-password`
Mengubah password pengguna.

🔒 **Requires Authentication**

**Request Body (JSON):**
| Field | Type | Required | Keterangan |
|-------|------|----------|------------|
| `currentPassword` | string | ✅ | Password saat ini |
| `newPassword` | string | ✅ | Minimal 8 karakter |
| `confirmNewPassword` | string | ✅ | Harus sama dengan `newPassword` |

**Response:**
```json
// 200 OK
{
  "message": "Password berhasil diubah."
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Semua field wajib diisi / Password baru minimal 8 karakter / Konfirmasi password tidak cocok / Password baru tidak boleh sama dengan password lama |
| `401` | Password saat ini tidak valid |
| `404` | User tidak ditemukan |
| `500` | Terjadi kesalahan server |

---

### `PUT /auth/profile/image`
Mengunggah atau memperbarui foto profil pengguna. Foto lama di S3 akan otomatis dihapus.

🔒 **Requires Authentication**

**Request:** `multipart/form-data`
| Field | Type | Required |
|-------|------|----------|
| `image` | file | ✅ |

**Response:**
```json
// 200 OK
{
  "message": "Foto profil berhasil diperbarui.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": "https://s3.amazonaws.com/...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Foto profil wajib diunggah |
| `500` | Terjadi kesalahan server |

---

### `DELETE /auth/profile/image`
Menghapus foto profil pengguna dari database dan S3.

🔒 **Requires Authentication**

**Response:**
```json
// 200 OK
{
  "message": "Foto profil berhasil dihapus."
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `404` | Tidak ada foto profil yang tersimpan |
| `500` | Terjadi kesalahan server |

---

### `PUT /auth/profile/name`
Memperbarui nama pengguna.

🔒 **Requires Authentication**

**Request Body (JSON):**
| Field | Type | Required | Keterangan |
|-------|------|----------|------------|
| `name` | string | ✅ | Minimal 3 karakter |

**Response:**
```json
// 200 OK
{
  "message": "Nama berhasil diperbarui.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": "https://...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```
**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Nama tidak boleh kosong / Nama minimal 3 karakter |
| `500` | Terjadi kesalahan server |

---

### `DELETE /auth/account`
Menghapus akun pengguna beserta foto profilnya dari S3.

🔒 **Requires Authentication**

**Request Body (JSON):**
| Field | Type | Required |
|-------|------|----------|
| `password` | string | ✅ |

**Response:**
```json
// 200 OK
{
  "message": "Akun berhasil dihapus."
}
```
**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Password wajib diisi untuk konfirmasi |
| `401` | Password tidak valid |
| `401` | User tidak ditemukan |
| `500` | Terjadi kesalahan server |

---

## Classify Routes

### `POST /api/classify`
Mengunggah gambar dan melakukan klasifikasi penyakit.

🔒 **Requires Authentication**

**Request:** `multipart/form-data`
| Field | Type | Required |
|-------|------|----------|
| `image` | file | ✅ |

**Response:**
```json
// 201 Created
{
  "message": "Klasifikasi berhasil",
  "result": {
    "classificationId": 10,
    "disease": {
      "name": "Leaf Blight",
      "slug": "leaf-blight",
      "scientificName": "Helminthosporium sp.",
      "description": "...",
      "symptoms": "...",
      "treatment": "..."
    },
    "confidenceScore": 0.8731,
    "imageUrl": "https://s3.amazonaws.com/...",
    "classifiedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `400` | Gambar wajib diunggah |
| `500` | Penyakit tidak ditemukan di database / Terjadi kesalahan saat memproses gambar |

---

### `GET /api/classify/history`
Mengambil riwayat klasifikasi milik pengguna dengan pagination.

🔒 **Requires Authentication**

**Query Parameters:**
| Param | Type | Default | Keterangan |
|-------|------|---------|------------|
| `page` | number | `1` | Halaman saat ini |
| `limit` | number | `10` | Jumlah item per halaman |
| `keyword` | string | - | Filter berdasarkan nama atau slug |
| `crop_type` | string | - | Filter berdasarkan jenis tanaman |
| `sort` | string | newest | Filter Pengurutan (newest atau oldest) |

**Response:**
```json
// 200 OK
{
  "data": [
    {
      "id": 10,
      "imageUrl": "https://s3.amazonaws.com/...",
      "confidenceScore": 0.8731,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "disease": {
        "name": "Leaf Blight",
        "slug": "leaf-blight",
        "scientificName": "Helminthosporium sp."
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `500` | Terjadi kesalahan server |

---

### `GET /api/classify/history/:id`
Mengambil detail satu riwayat klasifikasi berdasarkan ID.

🔒 **Requires Authentication**

**Path Parameters:**
| Param | Type | Keterangan |
|-------|------|------------|
| `id` | number | ID klasifikasi |

**Response:**
```json
// 200 OK
{
  "data": {
    "id": 10,
    "imageUrl": "https://s3.amazonaws.com/...",
    "confidenceScore": 0.8731,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "disease": {
      "id": 2,
      "name": "Leaf Blight",
      "slug": "leaf-blight",
      "scientificName": "Helminthosporium sp.",
      "description": "...",
      "symptoms": "...",
      "treatment": "...",
      "imageUrl": "https://...",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `404` | Data klasifikasi tidak ditemukan |
| `500` | Terjadi kesalahan server |

---

### `DELETE /api/classify/history/:id`
Menghapus satu riwayat klasifikasi beserta gambarnya dari S3.

🔒 **Requires Authentication**

**Path Parameters:**
| Param | Type | Keterangan |
|-------|------|------------|
| `id` | number | ID klasifikasi |

**Response:**
```json
// 200 OK
{
  "message": "Riwayat klasifikasi berhasil dihapus."
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `404` | Data klasifikasi tidak ditemukan |
| `500` | Terjadi kesalahan server |

---

### `DELETE /api/classify/history`
Menghapus seluruh riwayat klasifikasi milik pengguna beserta semua gambar terkait di S3.

🔒 **Requires Authentication**

**Response:**
```json
{
  "message": "X riwayat klasifikasi berhasil dihapus."
}
```
**Error Responses:**
| Status | Pesan |
|--------|-------|
| `404` | Tidak ada riwayat klasifikasi |
| `500` | Terjadi kesalahan server |

---

## Disease Routes

### `GET /api/diseases`
Mengambil seluruh daftar penyakit yang tersedia.

**Query Parameters:**
| Param | Type | Default | Keterangan |
|-------|------|---------|------------|
| `keyword` | string | - | Filter berdasarkan nama atau slug |
| `crop_type` | string | - | Filter berdasarkan jenis tanaman |

**Response:**
```json
// 200 OK
{
  "data": [
    {
      "id": 1,
      "name": "Leaf Blight",
      "slug": "leaf-blight",
      "scientificName": "Helminthosporium sp.",
      "description": "..."
    }
  ]
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `500` | Terjadi kesalahan server |

---

### `GET /api/diseases/:slug`
Mengambil detail lengkap satu penyakit berdasarkan slug, termasuk jumlah total deteksi.

**Path Parameters:**
| Param | Type | Keterangan |
|-------|------|------------|
| `slug` | string | Slug unik penyakit (contoh: `leaf-blight`) |

**Response:**
```json
// 200 OK
{
  "data": {
    "id": 1,
    "name": "Leaf Blight",
    "slug": "leaf-blight",
    "scientificName": "Helminthosporium sp.",
    "description": "...",
    "symptoms": "...",
    "treatment": "...",
    "imageUrl": "https://...",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "totalDetections": 142
  }
}
```

**Error Responses:**
| Status | Pesan |
|--------|-------|
| `404` | Penyakit tidak ditemukan |
| `500` | Terjadi kesalahan server |
