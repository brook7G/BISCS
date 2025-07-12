# Barcode Integrated Student Clearance System (BISCS)

## Overview

BISCS is a full-stack web application designed to streamline student clearance processes in academic institutions. It integrates barcode technology for tracking student belongings, loans, and clearance status, providing interfaces for students, officers, and administrators.

---

## Project Structure

```
BISCS/
│
├── backend/      # Node.js/Express REST API, MongoDB models, controllers
│
├── frontend/     # React.js SPA, Redux state management, UI components
│
├── package.json  # Root scripts for concurrent start of backend, frontend, and MongoDB
└── ...
```

---

## Backend

- **Tech Stack:** Node.js, Express, MongoDB (Mongoose), WebSocket, Multer (file uploads)
- **Main Entry:** `server.js`
- **API Endpoints:** `/api/clearanceType`, `/api/Student`, `/api/StudentsClearance`, `/api/loan`, `/api/user`
- **WebSocket:** Used for real-time notifications and updates.

### Key Models

- **Student:** Personal and academic info (`studentModel.js`)
- **User:** Officer/admin info, roles, permissions (`userModel.js`)
- **Clearance:** Academic clearance types and details (`clearanceModel.js`)
- **StudentsClearance:** Tracks each student's clearance progress (`studentsClearanceModel.js`)
- **Loan:** Items borrowed by students (`loanModel.js`)
- **FileCase:** Disciplinary/file cases (`filecaseModel.js`)
- **Notification:** System notifications (`notificationModel.js`)

### Controllers

- **userController.js:** User registration, login, location tracking, command execution.
- **studentController.js:** Student CRUD, info retrieval, notifications.
- **clearanceController.js:** Academic type management, clearance details.
- **studentsClearanceController.js:** Initiate and manage student clearance.
- **loanController.js:** Manage loans, belongings, notifications.

---

## Frontend

- **Tech Stack:** React.js, Redux Toolkit, React Router, Axios, Framer Motion, AG Grid, QR Code libraries
- **Main Entry:** `src/index.js`
- **State Management:** Redux slices for user, loan, clearance, etc.
- **UI Components:** Organized by pages (Login, LandingPage, StudentProfile, OfficerPage) and items (addClearance, scanBarcode, etc.)

### Key Features

- **Authentication:** Login and registration for students and officers.
- **Role-Based Navigation:** Students, officers, and admins see different dashboards.
- **Student Dashboard:** View clearance status, belongings, borrowed items, notifications, QR code for ID.
- **Officer Dashboard:** Approve clearances, manage loans, scan barcodes, view student info.
- **Admin Dashboard:** Manage academic types, users, and system settings.
- **Notifications:** Real-time updates via WebSocket.
- **Barcode/QR Integration:** For item tracking and student identification.

---

## How to Run

1. **Install dependencies:**
   - At root, backend, and frontend folders: `npm install`
2. **Start the system:**
   - At root: `npm start`
   - This runs MongoDB, backend server, and frontend React app concurrently.

---

## API Reference

- **User:** `/api/user` (register, login, location, get users)
- **Student:** `/api/Student` (CRUD, info, notifications)
- **Clearance:** `/api/clearanceType` (create, get types)
- **StudentsClearance:** `/api/StudentsClearance` (initiate, manage clearance)
- **Loan:** `/api/loan` (create, approve, return items)

---

## Data Flow

- **Login:** Authenticates user, sets role, navigates to appropriate dashboard.
- **Clearance:** Admin defines clearance types; students are assigned clearance tasks; officers approve or reject.
- **Loans/Belongings:** Officers manage items; students view and return.
- **Notifications:** Triggered on loan/clearance actions, delivered via WebSocket.

---

## Extensibility

- **Add new clearance types:** Via admin dashboard.
- **Integrate new item categories:** Extend loan and belongings models/controllers.
- **Enhance notifications:** Add more types or delivery channels.

---

## Security

- **Password management:** Basic, should be improved for production.
- **Role-based access:** Enforced in frontend and backend.
- **Environment variables:** Used for sensitive config.

---

## Contribution

- **Backend:** Add new controllers/models for features.
- **Frontend:** Add new pages/components, update Redux slices.
- **Testing:** Use Jest/React Testing Library for frontend; add backend tests.

---

## License

- ISC (see backend/package.json)

---

## Author

- Biruk Fekadu

---

