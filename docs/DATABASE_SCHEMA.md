# Database Schema Documentation

## Overview
This document describes the database schema for the Online Application and Admission System.

**Database Type:** PostgreSQL

---

## Tables

### 1. Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| firstName | VARCHAR(100) | NOT NULL | First name |
| lastName | VARCHAR(100) | NOT NULL | Last name |
| role | ENUM | DEFAULT 'applicant' | User role (admin, admissions_officer, accounts_staff, head_teacher, applicant) |
| isActive | BOOLEAN | DEFAULT true | Account active status |
| phoneNumber | VARCHAR(20) | NULLABLE | Contact phone number |
| profileImage | VARCHAR(500) | NULLABLE | Profile image path |
| createdAt | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `email` (UNIQUE)
- `role`

---

### 2. Applications Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique application identifier |
| applicationId | VARCHAR(50) | UNIQUE, NOT NULL | Human-readable application number |
| userId | UUID | FOREIGN KEY (users.id) | Applicant user ID |
| pleAggregate | INTEGER | NOT NULL | PLE aggregate score |
| pleNumber | VARCHAR(50) | NOT NULL | PLE examination number |
| dateOfBirth | DATE | NOT NULL | Applicant's date of birth |
| gender | VARCHAR(10) | NOT NULL | Gender (Male/Female) |
| preferredCombination | VARCHAR(50) | NULLABLE | Subject combination for Form 5 |
| applicationType | ENUM | DEFAULT 'Form 1' | Application type (Form 1, Form 5, Transfer) |
| academicYear | VARCHAR(4) | NOT NULL | Academic year of application |
| birthCertificatePath | VARCHAR(500) | NULLABLE | Path to birth certificate document |
| pleResultSlipPath | VARCHAR(500) | NULLABLE | Path to PLE result slip document |
| status | ENUM | DEFAULT 'pending' | Status (pending, under_review, shortlisted, rejected, admitted, deferred) |
| isPaymentVerified | BOOLEAN | DEFAULT false | Payment verification status |
| submittedAt | TIMESTAMP | DEFAULT NOW() | Submission timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `(userId, academicYear)`
- `applicationId` (UNIQUE)
- `status`
- `academicYear`

---

### 3. Payments Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique payment identifier |
| transactionId | VARCHAR(50) | UNIQUE, NOT NULL | Transaction reference number |
| applicationId | UUID | FOREIGN KEY (applications.id) | Related application ID |
| amount | DECIMAL(10,2) | NOT NULL | Payment amount |
| paymentMethod | ENUM | NOT NULL | Payment method (MTN, Airtel, Stripe, Bank Transfer) |
| phone | VARCHAR(20) | NOT NULL | Phone number for mobile money |
| status | ENUM | DEFAULT 'pending' | Status (pending, processing, completed, failed, refunded) |
| receiptNumber | VARCHAR(50) | NULLABLE | Digital receipt number |
| receiptUrl | VARCHAR(500) | NULLABLE | URL to digital receipt |
| externalTransactionId | VARCHAR(100) | NULLABLE | Payment gateway transaction ID |
| failureReason | TEXT | NULLABLE | Reason for payment failure |
| initiatedAt | TIMESTAMP | DEFAULT NOW() | Payment initiation timestamp |
| completedAt | TIMESTAMP | NULLABLE | Payment completion timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `(applicationId, status)`
- `transactionId` (UNIQUE)
- `status`

---

### 4. Shortlists Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique shortlist record identifier |
| applicationId | UUID | FOREIGN KEY (applications.id) | Related application ID |
| academicYear | VARCHAR(4) | NOT NULL | Academic year |
| round | INTEGER | NOT NULL | Shortlisting round number |
| cutoffAggregate | INTEGER | NOT NULL | Minimum PLE aggregate for shortlisting |
| selectionStatus | ENUM | DEFAULT 'pending' | Selection status (shortlisted, rejected, pending) |
| interviewDate | DATE | NULLABLE | Scheduled interview date |
| interviewVenue | VARCHAR(255) | NULLABLE | Interview location |
| interviewStatus | ENUM | DEFAULT 'pending' | Interview status (pending, interviewed, admitted, rejected) |
| interviewScore | INTEGER | NULLABLE | Interview score |
| admissionOffered | BOOLEAN | DEFAULT false | Whether admission was offered |
| admissionLetterId | VARCHAR(100) | NULLABLE | Admission letter reference |
| isActive | BOOLEAN | DEFAULT true | Record active status |
| createdAt | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `(academicYear, isActive)`
- `applicationId`

---

### 5. Communications Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique communication record identifier |
| applicationId | UUID | FOREIGN KEY (applications.id) | Related application ID |
| recipientEmail | VARCHAR(255) | NOT NULL | Recipient email address |
| recipientPhone | VARCHAR(20) | NULLABLE | Recipient phone number |
| type | ENUM | NOT NULL | Communication type (email, sms, both) |
| messageType | ENUM | NOT NULL | Message type (application_received, payment_confirmation, etc.) |
| subject | VARCHAR(500) | NOT NULL | Message subject |
| body | TEXT | NOT NULL | Message body/content |
| status | ENUM | DEFAULT 'pending' | Delivery status (pending, sent, failed, read) |
| failureReason | TEXT | NULLABLE | Reason for delivery failure |
| sentAt | TIMESTAMP | NULLABLE | Delivery timestamp |
| createdAt | TIMESTAMP | DEFAULT NOW() | Creation timestamp |

**Indexes:**
- `(applicationId, type)`
- `status`

---

### 6. SystemSettings Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique setting identifier |
| settingKey | ENUM | NOT NULL | Setting key (application_fee, cutoff_aggregate, etc.) |
| value | TEXT | NOT NULL | Setting value |
| description | VARCHAR(500) | NULLABLE | Description of the setting |
| createdAt | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

---

### 7. AuditLogs Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique audit log identifier |
| userId | VARCHAR(100) | NOT NULL | User performing the action |
| action | VARCHAR(255) | NOT NULL | Action performed |
| entityType | VARCHAR(100) | NULLABLE | Type of entity affected |
| entityId | VARCHAR(100) | NULLABLE | ID of entity affected |
| details | TEXT | NULLABLE | Additional details |
| severity | VARCHAR(20) | DEFAULT 'info' | Log severity (info, warning, error) |
| ipAddress | VARCHAR(45) | NULLABLE | IP address of user |
| createdAt | TIMESTAMP | DEFAULT NOW() | Log creation timestamp |

**Indexes:**
- `(userId, action)`
- `createdAt`

---

### 8. AdmissionStatistics Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique statistic record identifier |
| academicYear | VARCHAR(4) | NOT NULL | Academic year |
| totalApplications | INTEGER | NOT NULL | Total number of applications |
| shortlistedCount | INTEGER | NOT NULL | Number of shortlisted applicants |
| admittedCount | INTEGER | NOT NULL | Number of admitted applicants |
| rejectedCount | INTEGER | NOT NULL | Number of rejected applicants |
| femaleApplicants | INTEGER | NOT NULL | Number of female applicants |
| maleApplicants | INTEGER | NOT NULL | Number of male applicants |
| subjectDistribution | TEXT | NOT NULL | JSON string of subject preferences |
| geographicalDistribution | TEXT | NOT NULL | JSON string of geographical distribution |
| averagePleAggregate | DECIMAL(5,2) | NOT NULL | Average PLE aggregate score |
| createdAt | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

---

## Relationships

```
Users (1) -----> (Many) Applications
                       |
                       v
                    (1) Applications (1) -----> (Many) Payments
                                      |
                                      v
                                    (1) Applications (1) -----> (Many) Shortlists
                                                         |
                                                         v
                                                       (1) Applications (1) -----> (Many) Communications
```

---

## Data Integrity Constraints

1. **Foreign Keys:**
   - Applications.userId → Users.id (ON DELETE CASCADE)
   - Payments.applicationId → Applications.id (ON DELETE CASCADE)
   - Shortlists.applicationId → Applications.id (ON DELETE CASCADE)
   - Communications.applicationId → Applications.id (ON DELETE CASCADE)

2. **Unique Constraints:**
   - Users.email
   - Applications.applicationId
   - Payments.transactionId

3. **Check Constraints:**
   - Payments.amount > 0
   - Shortlists.round >= 1
   - Applications.pleAggregate >= 1

---

## Indexes

### Performance Indexes
```sql
CREATE INDEX idx_applications_user_year ON applications(userId, academicYear);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_payments_app_status ON payments(applicationId, status);
CREATE INDEX idx_shortlists_year_active ON shortlists(academicYear, isActive);
CREATE INDEX idx_communications_app_type ON communications(applicationId, type);
CREATE INDEX idx_auditlogs_user_action ON audit_logs(userId, action);
```

---

## Backup Strategy

- Full backup: Daily at 2:00 AM
- Incremental backup: Every 6 hours
- Retention: 30 days

---

## Scalability Considerations

1. **Partitioning:** Applications table can be partitioned by academicYear
2. **Caching:** High-traffic queries cached in Redis
3. **Read Replicas:** For report generation on separate database instance
4. **Archive:** Historical data (>2 years) moved to archive database
