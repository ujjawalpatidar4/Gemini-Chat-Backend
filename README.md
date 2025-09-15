
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


## 🏗️ Architecture Overview
The backend is built with Node.js and Express, using a modular structure:
- **Controllers** handle business logic for authentication, chatrooms, subscriptions, and webhooks.
- **Models** interact with PostgreSQL for users, chatrooms, and messages.
- **Services** integrate with Stripe, Gemini API, and Google Auth.
- **Middlewares** provide authentication, caching, error handling, and rate limiting.
- **Queue System** (Bull + Redis) can be used for background tasks and message processing.

All API endpoints are routed through `src/app.js` and `src/server.js` is the entry point.

---

## � Queue System Explanation
The project uses **Bull** (with Redis) for queue management. This allows for:
- Handling background jobs (e.g., sending Gemini responses asynchronously)
- Rate limiting and caching chatroom data
- Scalable message processing for chatrooms

Redis is used as the queue backend, ensuring fast and reliable job management.

---

## 📋 Assumptions & Design Decisions
- OTP is sent and returned in response for demo/testing (should be sent via SMS/email in production)
- JWT is used for stateless authentication
- Each user can have multiple chatrooms
- Stripe is used for subscription payments; webhook endpoint is protected and expects raw body
- Gemini API integration uses Google service account for secure access
- Rate limiting applies only to Basic tier users
- All sensitive keys/secrets are managed via environment variables

---

## 🚦 Access & Deployment Instructions
1. **Clone the repository:**
  ```sh
  git clone <repo-url>
  cd Gemini-Chat-Backend
  ```
2. **Install dependencies:**
  ```sh
  npm install
  ```
3. **Set up environment variables:**
  - Copy `.env-example` to `.env` and fill in your secrets (DB, Redis, Stripe, Gemini, etc.)
4. **Initialize the database:**
  ```sh
  psql -U <user> -d <db> -f db_schema.sql
  ```
5. **Start the server locally:**
  ```sh
  npm start
  ```
6. **Deploy to Render/Vercel:**
  - Add all environment variables in the dashboard
  - Upload your service account key (as a file or env variable)
  - Set the start command to `npm start`
  - Ensure your database and Redis services are running and accessible

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
### Postman & Feature Screenshots

![Screenshot 156](screenshots/Screenshot%20(156).png)
![Screenshot 157](screenshots/Screenshot%20(157).png)
![Screenshot 158](screenshots/Screenshot%20(158).png)
![Screenshot 159](screenshots/Screenshot%20(159).png)
![Screenshot 160](screenshots/Screenshot%20(160).png)
![Screenshot 161](screenshots/Screenshot%20(161).png)
![Screenshot 162](screenshots/Screenshot%20(162).png)
![Screenshot 163](screenshots/Screenshot%20(163).png)
![Screenshot 164](screenshots/Screenshot%20(164).png)
![Screenshot 165](screenshots/Screenshot%20(165).png)
![Screenshot 166](screenshots/Screenshot%20(166).png)
![Screenshot 167](screenshots/Screenshot%20(167).png)

---

## 📖 License
MIT

---

## ✨ Credits
Developed by ujjawalpatidar4
