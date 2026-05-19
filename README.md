# 🧠 GrievanceIQ — Intelligent Grievance Management System

> A full-stack complaint management platform with priority scoring, duplicate detection, and automated escalation.

🔗 **Live Demo:** https://intelligent-grievance-system.vercel.app  
📁 **GitHub:** https://github.com/nithyagoud-05/intelligent-grievance-system

---

## ✨ Features

- 📝 Submit complaints with priority and status
- 🔍 Search and filter by keyword, status, priority
- 📊 Live dashboard — total, pending, resolved, escalated
- ⚡ Auto-escalation for unresolved high-priority complaints
- 🔄 Duplicate detection via smart search
- 📈 Resolution rate tracker
- 📄 Pagination and sorting support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Deployment | Vercel + Render |

---

## 🌍 Live URLs

| | URL |
|-|-----|
| 🌐 Frontend | https://intelligent-grievance-system.vercel.app |
| ⚙️ Backend | https://intelligent-grievance-system.onrender.com |
| 📡 API | https://intelligent-grievance-system.onrender.com/api/grievances |

---

## 🚀 Run Locally

```bash
# Clone
git clone https://github.com/nithyagoud-05/intelligent-grievance-system.git
cd intelligent-grievance-system

# Backend
npm install
# Create .env from .env.example and add your MONGO_URI
node index.js

# Frontend
cd grievance-frontend
npm install
npm start
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grievances` | Get all grievances |
| GET | `/api/grievances?status=pending` | Filter by status |
| GET | `/api/grievances?search=water` | Search by keyword |
| GET | `/api/grievances?page=1&limit=5` | Paginated results |
| POST | `/api/grievances` | Create grievance |
| PUT | `/api/grievances/:id` | Update grievance |
| DELETE | `/api/grievances/:id` | Delete grievance |

---

## 🔮 Future Scope

- 🔐 JWT Authentication + Role-based access
- 📧 Email notifications on status updates
- 🗺️ Department-based routing
- 📊 Admin analytics dashboard

---

## 👩‍💻 Developer

**Nithya Goud** — Reliance Foundation Scholar · BPP University Essay Prize Winner · GSSoC 2025 Contributor

🔗 [LinkedIn](https://www.linkedin.com/in/elikatti-nithya-goud/) · [GitHub](https://github.com/nithyagoud-05)

---

⭐ Star this repo if you found it useful!
