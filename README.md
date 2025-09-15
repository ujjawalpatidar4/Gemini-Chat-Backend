# Gemini Chat Backend

A full-stack backend for a Gemini-style chat system with OTP authentication, user-specific chatrooms, Stripe subscriptions, and Gemini API-powered AI conversations.

---

## 🚀 Description
This backend enables:
- User registration and login with OTP verification
- Creation and management of chatrooms
- AI-powered chat using Google Gemini API
- Stripe-based subscription payments and webhook handling
- JWT authentication and rate-limiting

---

## 🛠️ Technologies Used
- Node.js (Express)
- PostgreSQL
- Redis
- Stripe API
- Google Gemini API
- JWT
- Axios
- dotenv, morgan, helmet, cors, body-parser

---

## 📦 Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up `.env` with your secrets (DB, Redis, Stripe, Gemini, etc.)
4. Run database schema: `psql -U <user> -d <db> -f db_schema.sql`
5. Start the server: `npm start`

---

## 📚 API Endpoints (Postman)

### Auth
- **POST /auth/signup**
  - `{ "email": "user@example.com", "password": "yourpassword" }`
- **POST /auth/send-otp**
  - `{ "email": "user@example.com" }`
- **POST /auth/verify-otp**
  - `{ "email": "user@example.com", "otp": "123456" }`
- **POST /auth/forgot-password**
  - `{ "email": "user@example.com" }`
- **POST /auth/change-password**
  - Headers: `Authorization: Bearer <jwt_token>`
  - `{ "oldPassword": "yourpassword", "newPassword": "newpassword" }`

### User
- **GET /user/me**
  - Headers: `Authorization: Bearer <jwt_token>`

### Chatroom
- **POST /chatroom/**
  - Headers: `Authorization: Bearer <jwt_token>`
  - `{ "name": "General Discussion" }`
- **GET /chatroom/**
  - Headers: `Authorization: Bearer <jwt_token>`
- **GET /chatroom/:id**
  - Headers: `Authorization: Bearer <jwt_token>`
- **POST /chatroom/:id/message**
  - Headers: `Authorization: Bearer <jwt_token>`
  - `{ "message": "Hello Gemini, tell me a joke!" }`

### Subscription
- **POST /subscribe/pro**
  - Headers: `Authorization: Bearer <jwt_token>`
- **GET /subscription/status**
  - Headers: `Authorization: Bearer <jwt_token>`

### Stripe Webhook
- **POST /webhook/stripe**
  - (Called by Stripe, not manually)

---

## 📝 Environment Variables (.env)
```
DB_HOST=...
DB_USER=...
DB_PASS=...
DB_NAME=...
REDIS_URL=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
GEMINI_API_KEY=...
GEMINI_SERVICE_ACCOUNT_KEY=...
GEMINI_API_SCOPES=...
JWT_SECRET=...
```

---

## 📸 Screenshots
Add screenshots of Postman requests, Stripe Checkout, and Gemini responses here.

---

## 📖 License
MIT

---

## ✨ Credits
Developed by ujjawalpatidar4
