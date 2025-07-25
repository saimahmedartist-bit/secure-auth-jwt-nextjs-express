﻿
---

## 🔧 Technologies Used

### Frontend
- React (via Next.js)
- Axios
- React Hooks
- CSS Modules

### Backend
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- bcryptjs for password hashing
- cookie-parser for reading cookies
- dotenv for environment variables

---

## 🔑 Authentication Flow

1. User registers via `/api/register`
2. User logs in via `/api/login`
   - Server returns:
     - `accessToken` (15min) in response
     - `refreshToken` (7d) in **HttpOnly cookie**
3. Access token is stored in **React state** (not localStorage)
4. Axios attaches `Authorization: Bearer <accessToken>` header automatically
5. `/api/protected` route is guarded by middleware
6. If token expires, `/api/refresh-token` returns new accessToken using the `refreshToken` cookie

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| POST   | `/api/register`        | Register a new user           |
| POST   | `/api/login`           | Login and receive tokens      |
| GET    | `/api/protected`       | Access protected content      |
| POST   | `/api/refresh-token`   | Refresh access token via cookie |

---

## 🔐 Security Highlights

- ✅ `refreshToken` stored as **HttpOnly cookie**
- ✅ `accessToken` never stored in localStorage
- ✅ Middleware validates JWT on each protected route
- ✅ Secrets are stored in `.env`
- ✅ Tokens signed with separate keys:
  - `ACCESS_TOKEN_SECRET`
  - `REFRESH_TOKEN_SECRET`

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/saimahmed-bit/auth-app-next-express.git
cd auth-app-next-express
# secure-auth-jwt-nextjs-express
