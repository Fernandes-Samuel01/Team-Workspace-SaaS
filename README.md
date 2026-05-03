# 🚀 Team Workspace SaaS (MERN)

A full-stack SaaS-style team workspace application where users can create workspaces, manage tasks using a Kanban board, and collaborate with others.

Built using the **MERN stack** with authentication, email verification, and a clean UI.

---

## 🌐 Live Demo

* 🔗 Frontend: https://mern-saas-eight.vercel.app
* 🔗 Backend API: https://mern-backend-wuhf.onrender.com

---

## ✨ Features

### 🔐 Authentication System

* User signup & login
* Email verification (via Mailtrap sandbox)
* Block login if user is not verified
* JWT-based authentication with cookies
* Password reset via email

---

### 📁 Workspace Management

* Create workspaces
* View all user workspaces
* Delete workspaces
* Invite users to a workspace via email

---

### ✅ Task Management (Kanban Board)

* Create tasks
* Move tasks between:

  * Todo
  * In Progress
  * Done
* Delete tasks
* Tasks scoped per workspace

---

### 🎨 UI/UX Improvements

* Replaced all `prompt()` with proper input fields
* Clean dashboard with workspace creation input
* Workspace board with task + invite inputs
* Responsive and modern UI using Tailwind CSS
* Smooth animations using Motion

---

### 📧 Email System

* Email verification codes
* Welcome email
* Password reset email
* Implemented using Mailtrap Email Sandbox (no domain required)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* Motion (animations)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Nodemailer

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## ⚙️ Environment Variables

### 📁 Frontend (`/frontend/.env`)

```env
VITE_API_URL=https://mern-backend-wuhf.onrender.com/api
```

---

### 📁 Backend (`/backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production

CLIENT_URL=https://mern-saas-eight.vercel.app

MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Fernandes-Samuel01/Team-Workspace-Saas.git
cd Team-Workspace-SaaS
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment Guide

### Backend (Render)

* Create new Web Service
* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `node index.js`
* Add environment variables

---

### Frontend (Vercel)

* Import GitHub repo
* Framework: Vite
* Root Directory: `frontend`
* Build Command: `npm run build`
* Output Directory: `dist`
* Add:

```env
VITE_API_URL=https://mern-backend-wuhf.onrender.com/api
```

---

## 🔐 Authentication Flow

1. User signs up
2. Verification code sent via email (Mailtrap)
3. User verifies account
4. Login allowed only if verified
5. JWT stored in cookies

---

## 📌 Key Learnings

* Building a full-stack SaaS application
* Authentication & authorization handling
* Email workflows (verification, reset)
* REST API design
* State management in React
* Deployment and environment handling
* CORS & production debugging

---

## 📈 Future Improvements (Optional)

* Role-based access (admin/member permissions)
* Real-time updates (WebSockets)
* Drag & drop tasks
* Notifications system
* File attachments in tasks

---

## 👨‍💻 Author

**Samuel Fernandes**

---

## ⭐ Show Your Support

If you found this project useful, give it a ⭐ on GitHub!
