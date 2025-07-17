# 🎓 CertiLink — Digital Certificate Management System

**CertiLink** is a full-stack web application designed for college environments to streamline the process of applying for, processing, and issuing student certificates. The system enables students to apply online, track application status, and receive real-time SMS notifications once certificates are ready for collection.

---

## ✨ Key Features

- 🔐 Secure student login using roll number credentials  
- 📝 Online application for various certificate types (Bonafide, Transfer, Conduct, etc.)  
- 🧑‍💼 Admin dashboard to review, approve, and complete applications  
- 📡 Email notifications to inform students when certificates are ready  
- 🌐 Responsive user interface built with React  
- 🔄 Real-time status updates  
- ⚙️ Backend powered by Node.js and Express  

---

## ⚙️ Technology Stack

| Category       | Technology            |
|----------------|------------------------|
| Frontend       | React.js, CSS          |
| Backend        | Node.js, Express.js    |
| Database       | Firebase / JSON / MySQL|
| Notifications  | Email-to-SMS Gateway   |
| Deployment     | Localhost / LAN Server |

---

## 📁 Project Structure

```
CertiLink/
├── backend/
│   ├── server.js                 # Express backend server
│   ├── smsService.js            # SMS via email-to-SMS logic
│   └── service-account-key.json # Firebase service key (if used)
│
├── projectuser/                 # React frontend
│   ├── src/
│   │   ├── Login.js
│   │   ├── Home.js
│   │   ├── Navbar.js
│   │   ├── Admin.js
│   │   ├── AdminProfile.js
│   │   ├── Profile.js
│   │   ├── Status.js
│   │   ├── Login.css
│   │   ├── Home.css
│   │   └── adminstyles.css
│   └── public/
│       └── background.jpg       # Optional background image
│
└── README.md
```

---

## 🛠️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CertiLink.git
cd CertiLink
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

> ⚠️ Make sure your Firebase config or database connection is correctly set in `server.js`.

### 3. Frontend Setup

```bash
cd projectuser
npm install
npm start
```

> The frontend will be available at: `http://localhost:3000`

---

## 🗃️ Database Design

### 🧍 Users Table

| Column   | Type   | Description                          |
|----------|--------|--------------------------------------|
| user_id  | String | Student roll number (Primary Key)    |
| name     | String | Student's full name                  |
| password | String | Default = roll number (can be edited)|
| mobile   | String | Used for SMS notifications           |

### 📑 Applications Table

| Column        | Type   | Description                         |
|---------------|--------|-------------------------------------|
| app_id        | String | Unique ID for each application      |
| user_id       | String | Linked student roll number          |
| cert_type     | String | Type of certificate requested       |
| date_applied  | Date   | Date of submission                  |
| status        | String | Pending / Approved / Completed      |

---

## 📲 SMS Notification System

CertiLink uses an **email-to-SMS gateway** to notify students once their certificate status is updated to **"Completed"**.

### Example:

```
To: 9876543210@airtelmail.com  
Subject: CertiLink Notification  
Message: Your certificate request has been completed. Please collect it from the admin office.
```

> 📨 The SMS gateway domain will vary based on the student’s telecom provider (e.g., Airtel, Jio, BSNL, etc.).

---

## 🔐 Default Login Credentials

- **Username:** Student Roll Number (e.g., `22CS101`)  
- **Password:** Same as the roll number *(can be changed after login)*  

---

## 📸 Screenshots *(Optional)*

> Add screenshots inside the `/screenshots` folder and reference them below.

```markdown
![Login Page](screenshots/login.png)
![Student Dashboard](screenshots/student_dashboard.png)
![Admin Panel](screenshots/admin_panel.png)
```

---

## 👩‍🎓 Developed By

**Sneha**  
Student Developer | Creator of CertiLink  
📫 For queries, collaborations, or contributions, contact via GitHub or official college channels.

---

## 📝 License

This project is licensed for **academic and educational use only**.  
© 2025 CertiLink. All rights reserved.
