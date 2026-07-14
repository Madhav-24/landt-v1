# 🏗️ AI Construction Monitoring System

An enterprise-grade AI-powered Construction Monitoring Platform designed for large-scale infrastructure and construction projects. The platform provides real-time monitoring, workforce analytics, PPE compliance tracking, project progress monitoring, safety alerts, and AI-driven insights for Project Managers and Site Supervisors.

---

# 🚀 Features

## 🎯 Role-Based Dashboards

### 👨‍💼 Project Manager Dashboard

Provides high-level visibility across all projects, sites, and chainages.

Features:

* Multi-project monitoring
* State, City, Site, and Chainage filtering
* Workforce analytics
* PPE compliance monitoring
* Budget utilization tracking
* Delay prediction analytics
* Resource allocation monitoring
* Chainage progress tracking
* AI-generated recommendations
* Real-time alerts and notifications
* Project health monitoring
* Open RFIs and issue management

---

### 👷 Site Supervisor Dashboard

Designed for mobile and tablet usage for daily site operations.

Features:

* Attendance check-in
* Hazard and incident reporting
* Daily site log creation
* Material delivery tracking
* Daily manpower monitoring
* Task management (Today & Tomorrow)
* Defect and snag management
* PPE compliance monitoring
* AI safety alerts
* Open issues tracking
* Voice-to-text daily diary

---

# 🏗️ System Architecture

```text
CCTV Cameras
        ↓
AI Detection Engine (YOLO)
        ↓
Backend APIs (.NET Core)
        ↓
PostgreSQL Database
        ↓
WebSocket Real-Time Engine
        ↓
React Frontend Dashboard
```

---

# 🖥️ Tech Stack

## Frontend

* ReactJS
* TypeScript
* Vite
* TailwindCSS
* Shadcn UI
* Framer Motion
* Zustand / Redux Toolkit
* React Query
* React Router
* Recharts
* Lucide Icons

---

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* SignalR / WebSockets
* JWT Authentication
* REST APIs

---

## Database

* PostgreSQL

---

## AI Services

* Python
* YOLOv8
* OpenCV
* TensorFlow / PyTorch
* AI Analytics Engine

---

# 👥 User Roles

---

## Project Manager

### Responsibilities

* Monitor all projects
* Monitor budgets
* Analyze productivity
* Review project health
* View AI predictions
* Review workforce trends
* Monitor safety compliance

### Dashboard Modules

* Global Search Filters
* KPI Cards
* Attendance Analytics
* PPE Analytics
* Resource Allocation
* Budget S-Curve
* Project Health
* AI Predictions
* Chainage Progress
* Open Issues
* Critical Alerts

---

## Site Supervisor

### Responsibilities

* Manage daily operations
* Track manpower
* Report hazards
* Manage deliveries
* Update daily logs
* Monitor defects
* Track task completion

### Dashboard Modules

* Quick Actions
* Attendance Check-In
* Today's Tasks
* Material Deliveries
* Worker Distribution
* PPE Analytics
* Open Snags
* Daily Diary
* AI Safety Alerts

---

# 📊 Dashboard Metrics

## Workforce

* Total Workers
* Present Workers
* Absent Workers
* Contractor Attendance
* Productivity Index

---

## Safety

* PPE Violations
* PPE Compliance %
* Incident Reports
* Unsafe Zones
* AI Safety Alerts

---

## Progress

* Daily Progress
* Chainage Progress
* Milestone Completion
* Delayed Activities
* Percent Plan Complete

---

## Financial

* Budget Utilization
* Planned vs Actual Cost
* Resource Cost Tracking

---

# 🤖 AI Features

## PPE Detection

Detect:

* Helmet
* Safety Vest
* Gloves
* Shoes

---

## Worker Analytics

* Worker Tracking
* Attendance Analytics
* Crowd Detection
* Unauthorized Entry Detection

---

## AI Predictions

* Project Delay Prediction
* Weather Impact Prediction
* Labour Shortage Prediction
* Productivity Risk Score

---

# 📂 Project Structure

```bash
src/
│
├── assets/
├── components/
│
├── layouts/
│
├── pages/
│   ├── dashboard/
│   │
│   ├── project-manager/
│   │
│   └── site-supervisor/
│
├── routes/
│
├── services/
│
├── hooks/
│
├── store/
│
├── context/
│
├── types/
│
├── utils/
│
├── constants/
│
└── App.tsx
```

---

# 📊 Dashboard Modules

## Project Manager Dashboard

```text
Filters
     ↓
KPI Cards
     ↓
Attendance Analytics
     ↓
PPE Analytics
     ↓
Budget S Curve
     ↓
Chainage Progress
     ↓
AI Predictions
     ↓
Open Issues
```

---

## Site Supervisor Dashboard

```text
Quick Actions
      ↓
Attendance
      ↓
Today's Tasks
      ↓
Deliveries
      ↓
Defects
      ↓
AI Alerts
      ↓
Daily Diary
```

---

# 🔔 Real-Time Features

* WebSocket Integration
* Live Attendance Updates
* Instant Safety Alerts
* Real-Time PPE Detection
* Live Notifications
* AI Alert Engine

---

# 🔐 Authentication & Authorization

Role-Based Access Control (RBAC)

Roles:

```text
Admin
Project Manager
Site Supervisor
Safety Officer
Client Viewer
```

Permissions are managed using JWT authentication and role-based routing.

---

# 🌍 Search Filters

Global filtering available through:

* State
* City
* Site
* Chainage
* Date Range
* Project
* Contractor

---

# 📱 Responsive Design

Supported Devices:

* Desktop
* Laptop
* Tablet
* Mobile Devices

Optimized for field engineers and site supervisors.

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

---

# 📈 Future Enhancements

* Drone Monitoring Integration
* BIM Integration
* GIS Mapping
* Digital Twin Dashboard
* Voice Assistant
* AI Report Generation
* Predictive Maintenance
* Worker Face Recognition
* Smart CCTV Analytics
* Mobile Offline Mode

---

# 📄 License

This project is developed for enterprise construction monitoring and research purposes.

---

# 👨‍💻 Developed By

**Madhav S**

Junior Research Fellow

B.Tech Artificial Intelligence & Data Science
 

**Kartheeswaran R**

AI Construction Monitoring Platform
M.Tech Defence Technology
Full Stack Developer | AI & Drone Research Enthusiast
