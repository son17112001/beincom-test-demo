# Social Media App

Một ứng dụng mạng xã hội được xây dựng với Next.js, React và các công nghệ hiện đại khác.

## 🚀 Tính năng chính

- **Authentication**: Đăng nhập, đăng ký và quản lý người dùng
- **Posts Management**: Tạo, xem và quản lý bài viết
- **Search & Filter**: Tìm kiếm và lọc bài viết theo tiêu chí khác nhau
- **Comments System**: Hệ thống bình luận cho bài viết
- **Infinite Scroll**: Tải thêm bài viết tự động
- **Responsive Design**: Giao diện thân thiện trên mọi thiết bị
- **Internationalization**: Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: SCSS Modules
- **State Management**: React Query, Context API
- **Authentication**: JWT, Cookies
- **API**: JSONPlaceholder API
- **Icons**: Custom SVG Icons
- **UI Components**: Custom Components

## 📋 Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 8.0.0 hoặc yarn >= 1.22.0
- Git

## 🔧 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd nextjs-template
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình environment variables

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=30000
CUSTOM_KEY=your_custom_key_here
```

### 4. Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

## 📁 Cấu trúc thư mục

```
nextjs-template/
├── components/           # React components
│   ├── Common/          # Components dùng chung
│   ├── layouts/         # Layout components
│   └── Pages/           # Page components
├── constants/           # Constants và config
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── locales/             # Internationalization files
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   └── posts/          # Dynamic routes
├── public/              # Static files
├── services/            # API services
├── styles/              # Global styles
└── utils/               # Utility functions
```

## 🎯 Cách sử dụng

### Authentication

1. **Đăng ký tài khoản mới**:
   - Truy cập `/register`
   - Điền thông tin đăng ký
   - Nhấn "Đăng ký"

2. **Đăng nhập**:
   - Truy cập `/login`
   - Nhập email và mật khẩu
   - Nhấn "Đăng nhập"

### Quản lý bài viết

1. **Xem danh sách bài viết**:
   - Truy cập trang chủ `/`
   - Xem danh sách bài viết với infinite scroll

2. **Tìm kiếm bài viết**:
   - Sử dụng thanh tìm kiếm ở header
   - Gõ từ khóa để tìm kiếm theo title hoặc content

3. **Lọc bài viết**:
   - Nhấn nút "Filter" bên cạnh thanh tìm kiếm
   - Chọn tiêu chí sắp xếp:
     - Newest First (Mới nhất)
     - Oldest First (Cũ nhất)
     - Title A-Z (Tiêu đề A-Z)
     - Title Z-A (Tiêu đề Z-A)
     - Most Comments (Nhiều bình luận nhất)
     - Least Comments (Ít bình luận nhất)

4. **Xem chi tiết bài viết**:
   - Nhấn vào bài viết để xem chi tiết
   - Xem bình luận và thêm bình luận mới

### Bình luận

1. **Xem bình luận**:
   - Truy cập trang chi tiết bài viết
   - Xem danh sách bình luận

2. **Thêm bình luận**:
   - Đăng nhập để có thể bình luận
   - Điền thông tin và nội dung bình luận
   - Nhấn "Gửi bình luận"

## 🔧 Scripts có sẵn

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start

# Chạy linter
npm run lint

# Fix linter errors
npm run lint:fix

# Chạy type checking
npm run type-check
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/validate` - Xác thực token

### Posts
- `GET /api/posts` - Lấy danh sách bài viết
- `GET /api/posts/:id` - Lấy chi tiết bài viết
- `GET /api/posts/:id/comments` - Lấy bình luận của bài viết

### Comments
- `POST /api/comments` - Tạo bình luận mới

## 🎨 Customization

### Thay đổi theme
Chỉnh sửa file `styles/globals.scss` để thay đổi CSS variables:

```scss
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  // ... các biến khác
}
```

### Thêm ngôn ngữ mới
1. Tạo file `locales/[language].json`
2. Thêm ngôn ngữ vào `constants/constant.js`
3. Cập nhật `next.config.js`

### Thêm filter mới
1. Thêm option vào `constants/constant.js`
2. Cập nhật logic trong `utils/filter-helper.js`

## 🐛 Troubleshooting

### Lỗi thường gặp

1. **Module not found**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port đã được sử dụng**:
   ```bash
   npm run dev -- -p 3001
   ```

3. **Build failed**:
   ```bash
   npm run lint:fix
   npm run build
   ```

### Debug mode
Chạy với debug mode:
```bash
DEBUG=* npm run dev
```
