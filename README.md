# Scalable Web App – Authentication & Task Dashboard

## Project Overview

A secure authentication system with a task dashboard supporting CRUD operations and protected routes.

---

## Screenshots
![login](https://github.com/user-attachments/assets/f9671e93-d649-4cae-82ac-788e4fbb828e)
![reg](https://github.com/user-attachments/assets/39840d77-4916-4552-8a64-0d5bda3b7617)
![dash](https://github.com/user-attachments/assets/266c7832-d41c-4181-b101-b4dd4acff449)


---

## Tech Stack

**Frontend:** React, Vite, TypeScript, Tailwind, SWR, Axios, Zod

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

---

## Features Implemented

### Authentication

* User registration
* Login with JWT
* Logout
* Protected routes

### Dashboard

* Display user profile (fetched from backend)
* CRUD operations on tasks
* Search and filter UI
* Logout flow

### Security & Scalability

* Password hashing (bcrypt)
* JWT authentication middleware
* Error handling & validation
* Modular code structure for scalability

---

## Project Structure

```
backend/
  configs/
  controllers/
  middlewares/
  models/
  routes/
  zod/
  app.js
  server.js

frontend/
  public/
  src/
    api/
    assets/
    components/
    context/
    hooks/
    pages/
    types/
    zod/
    App.tsx
    main.tsx
    index.css
```

Backend is organized using controller‑service‑route separation. Frontend is component‑driven with reusable hooks and contexts.

---

## API Documentation

Postman API collection is included in the repository. Import the collection and test endpoints directly.

---

## Setup Instructions

### 1. Clone repository

```
git clone https://github.com/vikaspatil0021/Web-app-task.git
cd Web-app-task
```

### 2. Environment Variables (backend/.env)

```
PORT=
MONGODB_URI=
TOKEN_SECRET_KEY=
```

### 3. Run Backend

```
cd backend
npm install
npm run start
```

### 4. Run Frontend

```
cd frontend
npm install
npm run dev
```

---

## Scalability Notes

* Modular folder structure for feature expansion
* Middleware‑based authentication for reuse
* Validation separated using Zod schemas
* Can add pagination & caching for large datasets
* Refresh token strategy can be introduced for production

---

## Future Improvements

* Role based authorization
* Unit & integration tests
* Docker deployment
* CI/CD pipeline
* WebSocket real‑time updates
