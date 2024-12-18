📁 src/ - Thư mục gốc chứa mã nguồn của ứng dụng
├── 📁 assets/ - Chứa các tài nguyên tĩnh (hình ảnh, fonts, etc.)
│
├── 📁 components/ - Chứa các component có thể tái sử dụng
│   ├── 📁 admin/ - Components cho phần admin
│   ├── 📁 auth/ - Components liên quan đến xác thực
│   ├── 📁 client/ - Components cho phần client/user
│   └── 📁 common/ - Components dùng chung
│
├── 📁 config/ - Cấu hình ứng dụng
│   ├── api.config.ts - Cấu hình API endpoints
│   ├── route.config.ts - Cấu hình routing
│   └── app.config.ts - Các cấu hình chung của ứng dụng
│
├── 📁 constants/ - Các hằng số và enum được sử dụng trong ứng dụng
│   ├── api.constants.ts - Các constant liên quan đến API
│   ├── route.constants.ts - Các constant liên quan đến routing
│   └── common.constants.ts - Các constant dùng chung
│
├── 📁 hooks/ - Custom React hooks
│   ├── useAuth.ts - Hook xử lý authentication
│   ├── useForm.ts - Hook xử lý forms
│   └── useAPI.ts - Hook gọi API
│
├── 📁 layouts/ - Chứa các layout chung của ứng dụng
│   ├── AdminLayout.tsx - Layout cho trang admin
│   └── ClientLayout.tsx - Layout cho trang client
│
├── 📁 pages/ - Chứa các trang của ứng dụng
│   ├── 📁 admin/ - Các trang quản trị
│   ├── 📁 auth/ - Các trang đăng nhập/đăng ký
│   ├── 📁 client/ - Các trang cho người dùng
│   └── 📁 common/ - Các trang dùng chung (404, error, etc.)
│
├── 📁 redux/ - Quản lý state với Redux
│   ├── 📁 actions/ - Định nghĩa các actions
│   ├── 📁 reducers/ - Xử lý state updates
│   ├── 📁 types/ - Type definitions cho Redux
│   └── store.tsx - Cấu hình Redux store
│
├── 📁 routes/ - Cấu hình routing của ứng dụng
│
├── 📁 services/ - Chứa các service gọi API
│   ├── 📁 admin/ - API calls cho admin
│   ├── 📁 auth/ - API calls xác thực
│   ├── 📁 client/ - API calls cho client
│   ├── 📁 types/ - Types cho services
│   └── 📁 utils/ - Utilities cho services