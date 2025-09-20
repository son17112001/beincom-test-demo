# Hướng Dẫn Build Project Next.js

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= 18.17.0
- **npm** hoặc **yarn**
- **Git** (để clone project)

## 🚀 Cách Build Project

### 1. Development Build

```bash
# Cài đặt dependencies
npm install
# hoặc
yarn install

# Chạy development server
npm run dev
# hoặc
yarn dev

# Server sẽ chạy tại: http://localhost:3000
```

### 2. Production Build

```bash
# Build project cho production
npm run build
# hoặc
yarn build

# Chạy production server
npm run start
# hoặc
yarn start

# Server sẽ chạy tại: http://localhost:3001
```

### 3. Lint và Format Code

```bash
# Chạy ESLint và tự động fix
npm run lint
# hoặc
yarn lint

# Format code với Prettier
npm run format
# hoặc
yarn format
```

## 🏗️ Build Process

### Development Mode
- **Hot reload** - tự động reload khi có thay đổi
- **Source maps** - debug dễ dàng
- **Fast refresh** - giữ state khi edit component
- **Port 3000** - development server

### Production Mode
- **Optimized bundle** - code được minify và optimize
- **Tree shaking** - loại bỏ code không sử dụng
- **Code splitting** - chia nhỏ bundle để load nhanh hơn
- **Static generation** - pre-render pages khi có thể
- **Port 3001** - production server

## 📁 Build Output

Sau khi build, Next.js sẽ tạo thư mục `.next/` chứa:

```
.next/
├── static/          # Static assets
├── server/          # Server-side code
├── cache/           # Build cache
└── standalone/      # Standalone build (nếu có)
```

## 🌐 Deploy Options

### 1. Vercel (Recommended)

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc connect GitHub repository
# Vercel sẽ tự động build và deploy
```

### 2. Netlify

```bash
# Cài đặt Netlify CLI
npm i -g netlify-cli

# Build command: npm run build
# Publish directory: .next
# Deploy
netlify deploy
```

### 3. Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build Docker image
docker build -t nextjs-app .

# Chạy container
docker run -p 3000:3000 nextjs-app
```

### 4. Traditional Server

```bash
# Build project
npm run build

# Copy .next folder và package.json lên server
# Cài đặt dependencies
npm ci --only=production

# Chạy production server
npm start
```

## ⚙️ Environment Variables

Tạo file `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_API_TIMEOUT=30000

# JWT Secret
JWT_SECRET=your-secret-key

# Database (nếu có)
DATABASE_URL=your-database-url
```

## 🔧 Build Optimization

### 1. Bundle Analyzer

```bash
# Cài đặt bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Thêm vào next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // config
})

# Chạy analyzer
ANALYZE=true npm run build
```

### 2. Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 3. Compression

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
}
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Memory Issues

```bash
# Tăng memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Port Already in Use

```bash
# Kill process trên port 3000
npx kill-port 3000

# Hoặc sử dụng port khác
npm run dev -- -p 3001
```

## 📊 Performance Monitoring

### 1. Lighthouse

```bash
# Cài đặt Lighthouse CLI
npm install -g lighthouse

# Chạy audit
lighthouse http://localhost:3000 --output html
```

### 2. Next.js Analytics

```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

## 🚀 Quick Start Commands

```bash
# Clone project
git clone <repository-url>
cd nextjs-template

# Cài đặt dependencies
npm install

# Chạy development
npm run dev

# Build production
npm run build

# Chạy production
npm start
```

## 📝 Notes

- **Development**: Sử dụng `npm run dev` để development
- **Production**: Sử dụng `npm run build` + `npm start` cho production
- **Port**: Development (3000), Production (3001)
- **Hot Reload**: Chỉ có trong development mode
- **Optimization**: Chỉ có trong production build

