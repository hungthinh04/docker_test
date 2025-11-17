# 🚀 Hướng dẫn Deploy Full Stack App

## 📦 1. Deploy với Docker (Local hoặc VPS)

### Chạy trên máy local:

```bash
# Cài Docker Desktop (Windows/Mac) hoặc Docker Engine (Linux)
# Sau đó chạy:

docker-compose up -d --build

# Frontend: http://localhost
# Backend: http://localhost:5000
```

### Deploy lên VPS (DigitalOcean, AWS, v.v.):

1. **Mua VPS và SSH vào:**

```bash
ssh root@your-server-ip
```

2. **Cài Docker:**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

3. **Cài Docker Compose:**

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

4. **Clone code và chạy:**

```bash
git clone <your-repo-url>
cd test_build
docker-compose up -d --build
```

---

## ☁️ 2. Deploy lên Cloud (Miễn phí)

### Cách 1: Vercel (Frontend) + Render (Backend) - KHUYẾN NGHỊ

#### Bước 1: Deploy Backend lên Render

1. Vào [render.com](https://render.com) → Đăng ký/Đăng nhập
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo của bạn
4. Cấu hình:

   - **Name:** `backend-app`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. **Thêm Environment Variables:**

   **Cách 1: Thêm khi tạo service (trước khi click "Create Web Service")**

   - Scroll xuống phần **"Environment Variables"** (ở cuối form)
   - Click **"Add Environment Variable"**
   - Thêm từng biến:
     - Key: `NODE_ENV` → Value: `production`
     - Key: `PORT` → Value: `5000`
     - Key: `FRONTEND_URL` → Value: `https://your-app.vercel.app` (tạm thời, sẽ cập nhật sau)

   **Cách 2: Thêm sau khi đã tạo service**

   - Vào Dashboard → Click vào service **"backend-app"**
   - Click tab **"Environment"** ở menu bên trái
   - Click **"Add Environment Variable"**
   - Thêm từng biến như trên

6. Click **"Create Web Service"** → Chờ deploy xong
7. Copy URL backend (ví dụ: `https://backend-app.onrender.com`)

#### Bước 2: Deploy Frontend lên Vercel

1. Vào [vercel.com](https://vercel.com) → Đăng ký/Đăng nhập
2. Click **"Add New..."** → **"Project"**
3. Import GitHub repo
4. Cấu hình:

   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Thêm Environment Variable:

   - `VITE_API_URL` = `https://backend-app.onrender.com` (URL backend từ Render)

6. Click **"Deploy"** → Chờ deploy xong
7. Copy URL frontend (ví dụ: `https://your-app.vercel.app`)

#### Bước 3: Cập nhật CORS

Quay lại Render → Click vào service **"backend-app"** → Tab **"Environment"**:

- Tìm biến `FRONTEND_URL` → Click **"Edit"** (hoặc xóa và thêm lại)
- Cập nhật Value = URL Vercel của bạn (ví dụ: `https://your-app.vercel.app`)
- Click **"Save Changes"** → Render sẽ tự động redeploy

---

### Cách 2: Railway (Cả Frontend và Backend)

#### Deploy Backend:

1. Vào [railway.app](https://railway.app) → Đăng ký
2. **"New Project"** → **"Deploy from GitHub repo"**
3. Chọn repo → Chọn thư mục `backend`
4. Railway tự động detect và deploy
5. Thêm Environment Variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`

#### Deploy Frontend:

1. Tạo service mới trong cùng project
2. Chọn thư mục `frontend`
3. Thêm Environment Variable:
   - `VITE_API_URL` = URL backend từ Railway

---

## 🔧 3. Cấu hình sau khi deploy

### Kiểm tra Backend hoạt động:

Mở trình duyệt: `https://your-backend-url.com/api/health`

Nếu thấy `{"status":"OK","message":"Server is running"}` → OK ✅

### Kiểm tra Frontend:

Mở URL frontend → Nếu thấy giao diện và có thể nhập input → OK ✅

### Nếu gặp lỗi CORS:

Sửa `backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    "https://your-frontend-url.vercel.app",
    "https://your-frontend-url.onrender.com",
  ],
  credentials: true,
};
```

---

## 📝 Checklist

- [ ] Backend deploy thành công
- [ ] Frontend deploy thành công
- [ ] Test API endpoint `/api/health`
- [ ] Test nhập input và bấm Refresh
- [ ] CORS đã cấu hình đúng
- [ ] Environment variables đã set

---

## 🆘 Troubleshooting

### Backend không chạy:

- Kiểm tra logs trên Render/Railway
- Kiểm tra PORT environment variable
- Kiểm tra `package.json` có script `start`

### Frontend không kết nối được Backend:

- Kiểm tra `VITE_API_URL` đã set đúng chưa
- Kiểm tra CORS settings
- Kiểm tra backend URL có `/api` ở cuối không

### Docker không chạy:

```bash
# Xem logs
docker-compose logs

# Rebuild
docker-compose down
docker-compose up -d --build
```

---

## 💡 Tips

- **Render Free Plan:** Server sẽ sleep sau 15 phút không dùng → Lần đầu load sẽ chậm
- **Vercel:** Rất nhanh và ổn định cho frontend
- **Railway:** Có $5 free credit/tháng, không sleep như Render
- **VPS:** Tốt nhất nhưng cần tự quản lý

Chúc bạn deploy thành công! 🎉
