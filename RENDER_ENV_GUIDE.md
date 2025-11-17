# 📝 Hướng dẫn thêm Environment Variables trên Render

## Cách 1: Thêm khi tạo service mới

1. Khi đang ở form tạo Web Service, scroll xuống **cuối trang**
2. Tìm phần **"Environment Variables"**
3. Click nút **"Add Environment Variable"**
4. Nhập:
   - **Key:** Tên biến (ví dụ: `NODE_ENV`)
   - **Value:** Giá trị (ví dụ: `production`)
5. Click **"Add"** để thêm biến tiếp theo
6. Sau khi thêm xong, click **"Create Web Service"**

## Cách 2: Thêm sau khi đã tạo service

1. Vào **Dashboard** của Render
2. Click vào **service** của bạn (ví dụ: `backend-app`)
3. Ở menu bên trái, click tab **"Environment"**
4. Click nút **"Add Environment Variable"** (màu xanh)
5. Nhập Key và Value
6. Click **"Save Changes"** → Render sẽ tự động redeploy

## Cách 3: Sửa/Xóa Environment Variable

1. Vào service → Tab **"Environment"**
2. Tìm biến cần sửa
3. Click **"Edit"** (icon bút chì) để sửa
4. Hoặc click **"Delete"** (icon thùng rác) để xóa
5. Click **"Save Changes"**

## ⚠️ Lưu ý

- Sau khi thêm/sửa/xóa env vars, Render sẽ **tự động redeploy** service
- Nếu không thấy phần Environment Variables khi tạo service, có thể thêm sau khi tạo xong
- Environment Variables sẽ được inject vào process.env trong Node.js

## 📸 Vị trí Environment Variables

**Khi tạo service:**
```
Form tạo Web Service
├── Name
├── Region
├── Branch
├── Root Directory
├── Build Command
├── Start Command
├── ...
└── Environment Variables  ← Ở đây (scroll xuống cuối)
    └── Add Environment Variable
```

**Sau khi tạo service:**
```
Service Dashboard
├── Overview
├── Logs
├── Metrics
├── Environment  ← Click vào đây
│   └── Add Environment Variable
├── Settings
└── ...
```

