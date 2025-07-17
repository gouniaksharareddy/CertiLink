<h1 align="center">🎓 CertiLink: A Smart Certificate Application and Approval System</h1>


CertiLink is a web-based platform that enables college students to apply for official certificates online, track their request status, and receive E-mail notifications when their applications are processed. It simplifies and digitizes the certificate issuing workflow for both students and administrators.


🚀 Features

- ✅ Student login with roll number and password
- ✅ Apply for certificates (e.g., Bonafide, Conduct, Transfer)
- ✅ Admin dashboard to view, approve, and complete applications
- ✅ Real-time status tracking
- ✅ E-mail notifications sent upon completion
- ✅ Secure password update option
- ✅ Common navigation bar across all pages

---

🛠 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React.js (with custom CSS) |
| Backend     | Node.js, Express.js |
| Database    |Mongo-DB |
| E-mail Gateway | E-mail JS |
| Hosting     | Localhost / College Server *(customizable)* |


📁 Project Structure
```
CertiLink/
│
├── backend/
│ ├── server.js # Node.js server
│ ├── mailervice.js 
│ 
│
├── projectuser/ # React frontend
│ ├── src/
│ │ ├── Login.js
│ │ ├── Home.js
│ │ ├── Navbar.js
│ │ ├── Admin.js
│ │ ├── AdminProfile.js
│ │ ├── Profile.js
│ │ ├── Status.js
│ │ ├── Login.css
│ │ ├── Home.css
│ │ └── adminstyles.css
│ └── public/
│ └── background.jpg
│
├── README.md
└── package.json
```
---
⚙️ Installation
1. Clone the Repo
git clone https://github.com/your-username/CertiLink.git
cd CertiLink

#Set Up Backend
cd backend
npm install
node server.js

#Set Up Frontend
cd projectuser
npm install
npm start

---
🧑‍💻 Usage
Visit http://localhost:3000
Log in using your roll number
Apply for a certificate
Admin logs in from a different route (e.g., /admin) to manage applications
Once approved, user receives E-mail notification

---
🗃️ Database Design
🧍 Users Table
| Field     | Type   | Description                            |
|-----------|--------|----------------------------------------|
| user_id   | String | Roll number (used as unique ID)        |
| name      | String | Full name of the student               |
| password  | String | Default same as roll number            |
| mobile    | String | Mobile number for SMS notifications    |
| email     | String | Optional: For future enhancements      |

📑 Applications Table
| Field         | Type    | Description                                 |
|---------------|---------|---------------------------------------------|
| app_id        | String  | Unique ID for each certificate request      |
| user_id       | String  | References the user who applied             |
| cert_type     | String  | Type of certificate (e.g., Bonafide, TC)    |
| date_applied  | Date    | Date when the application was submitted     |
| status        | String  | Current status: Pending / Approved / Done   |
| remarks       | String  | Admin comments or feedback (optional)       |

👩‍💼 Admin Credentials
| Field     | Value                | Description                    |
|-----------|----------------------|--------------------------------|
| Name      | Admin name           | Admin full name                |
| User ID   | admin001             | Admin login username           |
| Password  | admin001             | Default admin password         |
| Email     | example@gmail.com    | For receiving notifications (optional) |

👩‍💻 Developers<br>
KONDAKINDI SNEHA REDDY<br>
GOUNI AKSHARA REDDY<br>
SHAHEDA SAMREEN

This project is licensed for educational use only.  
© 2025 CertiLink Team — All rights reserved.





