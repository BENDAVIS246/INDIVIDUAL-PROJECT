# Online Application and Admission System

## Project Overview
An online application and admission management system for Excel Secondary School, Kyenjojo District, Western Uganda.

### Developed By
- **TUMUSIIME DAVIS** (Reg: 2024/U/MMU/BCS/00159)
- **AGABA CRANMER** (Reg: 2024/U/MMU/BCS/00172)

**University:** Mountains of the Moon University
**Department:** Computer Science
**Program:** Bachelor's Degree in Computer Science

---

## System Features

### 1. Online Application Portal
- User-friendly electronic application form
- Real-time form validation
- Document upload functionality (birth certificate, PLE results)
- Unique application ID generation
- Multi-step form wizard

### 2. Automated Payment Module
- Integration with MTN and Airtel mobile money
- Bank payment gateways
- Automatic receipt generation (email & SMS)
- Real-time payment status tracking
- Payment reconciliation dashboard

### 3. Centralized Database & Records Management
- Secure applicant data storage
- Advanced search functionality
- Regular automated backups
- Historical record tracking
- Audit trail logging

### 4. Automated Communication Module
- SMS notifications via integrated gateway
- Email notifications
- Application submission acknowledgment
- Payment confirmation messages
- Shortlisting notifications
- Interview schedule updates
- Admission offers

### 5. Shortlisting & Admission Management Dashboard
- Applicant viewing and filtering
- Automated cut-off point calculation
- Bulk shortlist generation
- Admission letter generation
- Reporting instructions management

### 6. Reporting & Analytics Module
- Real-time admission statistics
- Gender distribution reports
- Subject preference analysis
- Geographical distribution maps
- Payment summaries
- PDF and Excel export functionality
- Graphical visualizations

### 7. Role-Based Access Control
- **System Administrator:** Full system access
- **Admissions Officer:** Application & shortlisting management
- **Accounts Staff:** Payment record management
- **Head Teacher:** Read-only reports and dashboards
- **Applicants/Parents:** Public portal access

---

## Technology Stack

### Backend
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT with bcrypt hashing
- **Payment Integration:** Stripe, MTN API, Airtel API
- **Notifications:** Twilio (SMS), SendGrid (Email)
- **File Storage:** AWS S3 / Local File System
- **Reporting:** ReportLab / jsPDF

### Frontend
- **Framework:** React.js with TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI (MUI)
- **Forms:** React Hook Form with Zod validation
- **Charts:** Chart.js / Recharts
- **File Upload:** Dropzone.js

### DevOps & Deployment
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Hosting:** AWS EC2 / Heroku
- **Database Migrations:** Sequelize / TypeORM
- **Logging:** Winston / Morgan
- **Monitoring:** Sentry

---

## Project Structure

```
INDIVIDUAL-PROJECT/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.ts
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── .github/
│   └── workflows/
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   └── SETUP_GUIDE.md
└── README.md
```

---

## Installation & Setup

Refer to [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) for detailed installation instructions.

## API Documentation

Refer to [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for complete API endpoints.

## Database Schema

Refer to [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) for database structure.

---

## Testing Strategy

- **Unit Tests:** Jest for backend and frontend
- **Integration Tests:** Supertest for API endpoints
- **E2E Tests:** Cypress for user workflows
- **Security Testing:** OWASP compliance checks

## License

Mountains of the Moon University - Computer Science Department

## Contact

- **TUMUSIIME DAVIS:** tumusimedavis21@gmail.com | 0775133819
- **AGABA CRANMER:** cranmeragaba37@gmail.com | 0780164077
