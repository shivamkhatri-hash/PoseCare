# Quick Start Guide: PoseCare (RehabSync)

All services can be run simultaneously in separate terminals:

### 1. Computer Vision Service (Flask + MediaPipe)
```powershell
cd e:\rehab-ai-platform-main\cv-service
.\venv\Scripts\activate
python app.py
```
- **URL**: `http://localhost:8000`

---

### 2. Express Backend Server (Node.js + MongoDB)
```powershell
cd e:\rehab-ai-platform-main\rehab-backend
node server.js
```
- **URL**: `http://localhost:5000`

---

### 3. Frontend Application (React + Vite)
```powershell
cd e:\rehab-ai-platform-main\rehab-ai
npm run dev
```
- **URL**: `http://localhost:5173` (or active port)
