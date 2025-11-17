# Hướng dẫn Deploy Full Stack App

## 🐳 Deploy với Docker (Local/Server)

### 1. Build và chạy với Docker Compose

```bash
# Build và chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down

# Rebuild sau khi thay đổi code
docker-compose up -d --build
```

### 2. Chạy từng service riêng

**Backend:**

```bash
cd backend
docker build -t backend-app .
docker run -p 5000:5000 backend-app
```

**Frontend:**

```bash
cd frontend
docker build -t frontend-app .
docker run -p 80:80 frontend-app
```

---

## ☁️ Deploy lên Cloud

### Option 1: Deploy lên Vercel (Frontend) + Railway/Render (Backend)

#### Frontend - Vercel (Miễn phí)

1. **Cài đặt Vercel CLI:**

```bash
npm install -g vercel
```

2. **Deploy:**

```bash
cd frontend
vercel
```

3. **Hoặc qua GitHub:**

   - Push code lên GitHub
   - Vào [vercel.com](https://vercel.com)
   - Import project từ GitHub
   - Chọn thư mục `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Cấu hình Environment Variables:**
   - Thêm `VITE_API_URL=https://your-backend-url.com` (nếu cần)

#### Backend - Railway (Miễn phí $5/tháng)

1. **Tạo tài khoản tại [railway.app](https://railway.app)**

2. **Deploy:**

   - Click "New Project" → "Deploy from GitHub"
   - Chọn repo và thư mục `backend`
   - Railway tự động detect và deploy

3. **Cấu hình Environment Variables:**

   - `PORT=5000`
   - `NODE_ENV=production`

4. **Cập nhật CORS trong backend:**
   - Thêm domain Vercel vào CORS whitelist

---

### Option 2: Deploy lên Render (Cả Frontend và Backend)

#### Backend trên Render

1. **Tạo tài khoản tại [render.com](https://render.com)**

2. **Tạo Web Service:**

   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
   - Plan: Free (có thể sleep sau 15 phút không dùng)

3. **Thêm Environment Variables:**

   **Khi tạo service:**

   - Scroll xuống phần **"Environment Variables"** (ở cuối form)
   - Click **"Add Environment Variable"**
   - Thêm:
     - Key: `PORT` → Value: `5000`
     - Key: `NODE_ENV` → Value: `production`
     - Key: `FRONTEND_URL` → Value: `https://your-frontend-url.com`

   **Sau khi đã tạo service:**

   - Vào Dashboard → Click vào service
   - Click tab **"Environment"** ở menu bên trái
   - Click **"Add Environment Variable"** để thêm mới

#### Frontend trên Render

1. **Tạo Static Site:**

   - New → Static Site
   - Connect GitHub repo
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Cập nhật API URL:**
   - Sửa `vite.config.js` để trỏ đến Render backend URL

---

### Option 3: Deploy lên VPS (DigitalOcean, AWS EC2, etc.)

#### Chuẩn bị VPS

1. **Cài đặt Docker và Docker Compose:**

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Clone project lên VPS:**

```bash
git clone <your-repo-url>
cd test_build
```

3. **Chạy với Docker Compose:**

```bash
docker-compose up -d
```

4. **Cấu hình Nginx Reverse Proxy (Optional):**

```nginx
# /etc/nginx/sites-available/your-app
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

5. **Cài đặt SSL với Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Cấu hình CORS cho Production

Cập nhật `backend/server.js`:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.vercel.app",
      "https://your-frontend-domain.onrender.com",
    ],
    credentials: true,
  })
);
```

---

## 📝 Checklist trước khi deploy

- [ ] Kiểm tra environment variables
- [ ] Cập nhật CORS settings
- [ ] Test API endpoints
- [ ] Build frontend thành công
- [ ] Kiểm tra Docker images
- [ ] Cấu hình domain/DNS (nếu có)
- [ ] Setup SSL/HTTPS
- [ ] Backup database (nếu có)

---

## 🚀 Quick Deploy Commands

### Local Docker

```bash
docker-compose up -d --build
```

### Vercel (Frontend)

```bash
cd frontend && vercel --prod
```

### Railway (Backend)

```bash
# Qua GitHub hoặc Railway CLI
railway up
```

---

## 📚 Tài liệu tham khảo

- [Docker Documentation](https://docs.docker.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
