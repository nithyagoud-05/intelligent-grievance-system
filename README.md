# 🧠 GrievanceIQ — Intelligent Grievance Management System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Deployment-Live-success)

An AI-inspired grievance management platform that automates complaint handling using priority scoring, duplicate detection, and escalation workflows.

🔗 Live Demo: https://intelligent-grievance-system.vercel.app  
📁 GitHub: https://github.com/nithyagoud-05/intelligent-grievance-system

---

# ✨ Features

- 📝 Submit complaints with priority and status
- 🔍 Search and filter by keyword, status, and priority
- 📊 Live dashboard — total, pending, resolved, escalated
- ⚡ Auto-escalation for unresolved high-priority complaints
- 🔄 Duplicate complaint detection using keyword similarity
- 📈 Resolution rate tracker
- 📄 Pagination and sorting support
- 🧠 Smart complaint management workflow

---

# 🏗️ Architecture

User → React Frontend → Express API → MongoDB Database

---

# 🛠️ Tech Stack

| Layer | Technology |
|------|------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Deployment | Vercel + Render |

---

# 🌍 Live URLs

| Service | URL |
|------|------|
| 🌐 Frontend | https://intelligent-grievance-system.vercel.app |
| ⚙️ Backend | https://intelligent-grievance-system.onrender.com |
| 📡 API | https://intelligent-grievance-system.onrender.com/api/grievances |

---

# 📂 Project Structure

```bash
intelligent-grievance-system/
│
├── grievance-frontend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
│
├── index.js
├── package.json
└── README.md
```

---

# 🚀 Run Locally

```bash
# Clone Repository
git clone https://github.com/nithyagoud-05/intelligent-grievance-system.git

# Navigate into project
cd intelligent-grievance-system

# Backend Setup
npm install

# Create .env file and add:
MONGO_URI=your_mongodb_connection_string

# Run backend
node index.js
```

## Frontend Setup

```bash
cd grievance-frontend

npm install

npm start
```

---

# 📡 API Reference

| Method | Endpoint | Description |
|------|------|------|
| GET | `/api/grievances` | Get all grievances |
| GET | `/api/grievances?status=pending` | Filter by status |
| GET | `/api/grievances?search=water` | Search by keyword |
| GET | `/api/grievances?page=1&limit=5` | Paginated results |
| POST | `/api/grievances` | Create grievance |
| PUT | `/api/grievances/:id` | Update grievance |
| DELETE | `/api/grievances/:id` | Delete grievance |

---

# 📸 Screenshots

## Dashboard

_Add dashboard screenshot here_

## Complaint Submission

_Add complaint form screenshot here_

---

# 🔮 Future Enhancements

- 🤖 NLP-based complaint classification
- 🧠 Semantic duplicate detection using embeddings
- 🔐 JWT Authentication & Role-Based Access Control
- 📬 Real-time notifications
- 📊 Predictive analytics dashboard
- ☁️ Docker + Kubernetes deployment
- 🗺️ Department-based complaint routing

---
---

## 👩‍💻 Developer

**Nithya Goud** — Reliance Foundation Scholar · BPP University Essay Prize Winner · GSSoC 2025 Contributor

🔗 [LinkedIn](https://www.linkedin.com/in/elikatti-nithya-goud/) · [GitHub](https://github.com/nithyagoud-05)

---

⭐ Star this repo if you found it useful!

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
