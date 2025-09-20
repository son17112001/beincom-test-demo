# Homepage Posts Feature với Infinite Scroll

Tính năng này đã được tích hợp vào trang homepage để hiển thị danh sách posts từ JSONPlaceholder API với infinite scroll.

## ✅ Tính năng đã hoàn thành

### 1. **Tích hợp vào Homepage**
- Thay thế posts tĩnh bằng dữ liệu từ JSONPlaceholder API
- Infinite scroll tự động load thêm posts khi scroll xuống
- Search functionality với debounce 500ms
- Loading states và error handling

### 2. **React Query Integration**
- Sử dụng `useInfinitePosts` hook để quản lý dữ liệu
- Caching thông minh và refetching
- Optimistic updates

### 3. **UI/UX Improvements**
- Search bar trong content tabs
- Posts stats hiển thị số lượng posts
- Loading spinners và error messages
- Responsive design cho mobile

### 4. **Components**
- **PostCard**: Hiển thị individual posts với user info
- **InfiniteScroll**: Tự động load more posts
- **Search**: Real-time search với debounce

## 🚀 Cách sử dụng

1. **Truy cập homepage** (`/`) sau khi đăng nhập
2. **Scroll xuống** để tự động load thêm posts
3. **Sử dụng search bar** để tìm kiếm posts
4. **Click "View Details"** để xem chi tiết post

## 📱 Responsive Design

- **Desktop**: 3 cột layout với sidebar
- **Tablet**: 1 cột layout, search bar responsive
- **Mobile**: Full width, stacked layout

## 🔧 Technical Details

### API Endpoints
- `GET /posts` - Lấy danh sách posts với pagination
- `GET /posts/{id}` - Lấy chi tiết post
- `GET /posts/{id}/comments` - Lấy comments của post
- `GET /users/{id}` - Lấy thông tin user

### Hooks
- `useInfinitePosts`: Quản lý infinite scroll data
- `usePost`: Single post fetching
- `usePostComments`: Comments fetching
- `useUser`: User data fetching

### Styling
- SCSS modules cho component-specific styles
- CSS variables cho theming
- Responsive breakpoints
- Loading animations

## 🎯 Features

- ✅ **Infinite Scroll**: Tự động load 10 posts mỗi lần
- ✅ **Search**: Tìm kiếm theo title và content
- ✅ **Loading States**: Spinner và loading messages
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Responsive**: Mobile-first design
- ✅ **Performance**: React Query caching
- ✅ **Accessibility**: Proper ARIA labels

## 📊 Performance

- **Caching**: 5 phút cho posts, 10 phút cho users
- **Debounce**: 500ms cho search input
- **Pagination**: 10 posts per page
- **Lazy Loading**: Chỉ load khi cần thiết

Tính năng này cung cấp trải nghiệm người dùng mượt mà với infinite scroll và search functionality, hoàn toàn tích hợp vào homepage hiện tại.
