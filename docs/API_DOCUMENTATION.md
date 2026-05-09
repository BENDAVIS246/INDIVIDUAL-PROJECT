# API Documentation

## Overview
This document provides comprehensive API endpoint documentation for the Online Application and Admission System.

**Base URL:** `http://localhost:5000/api`

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "applicant"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "applicant"
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "applicant"
    }
  }
}
```

### Validate Token
**GET** `/auth/validate`

Validate JWT token (Requires Authorization header)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "applicant"
  }
}
```

---

## Application Endpoints

### Create Application
**POST** `/applications`

Submit a new application (Requires Authentication)

**Request Body:**
```json
{
  "pleAggregate": 8,
  "pleNumber": "PLE2024/001",
  "dateOfBirth": "2006-05-15",
  "gender": "Male",
  "preferredCombination": "PCM",
  "applicationType": "Form 1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "id": "uuid",
    "applicationId": "APP-2024-ABCD1234",
    "userId": "uuid",
    "pleAggregate": 8,
    "status": "pending",
    "submittedAt": "2024-05-09T09:00:00Z"
  }
}
```

### Upload Documents
**POST** `/applications/{applicationId}/documents`

Upload supporting documents (Requires Authentication)

**Request Body (Form Data):**
```
birthCertificate: [File]
pleResultSlip: [File]
```

**Response:**
```json
{
  "success": true,
  "message": "Documents uploaded successfully",
  "data": {
    "id": "uuid",
    "birthCertificatePath": "/uploads/cert.pdf",
    "pleResultSlipPath": "/uploads/results.pdf"
  }
}
```

### Get User Applications
**GET** `/applications`

Retrieve all applications of authenticated user (Requires Authentication)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "applicationId": "APP-2024-ABCD1234",
      "pleAggregate": 8,
      "status": "pending",
      "submittedAt": "2024-05-09T09:00:00Z"
    }
  ]
}
```

### Get Application by ID
**GET** `/applications/{applicationId}`

Retrieve specific application details (Requires Authentication)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "applicationId": "APP-2024-ABCD1234",
    "applicant": {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "pleAggregate": 8,
    "status": "pending",
    "payments": [],
    "communications": []
  }
}
```

### Update Application Status
**PUT** `/applications/{applicationId}/status`

Update application status (Admin only)

**Request Body:**
```json
{
  "status": "shortlisted"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application status updated",
  "data": {
    "id": "uuid",
    "status": "shortlisted"
  }
}
```

---

## Payment Endpoints

### Initiate Payment
**POST** `/payments/initiate`

Initiate payment for application (Requires Authentication)

**Request Body:**
```json
{
  "applicationId": "uuid",
  "amount": 10000,
  "paymentMethod": "MTN",
  "phone": "+256701234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "id": "uuid",
    "transactionId": "TXN-1715232000000-ABCD",
    "applicationId": "uuid",
    "amount": 10000,
    "paymentMethod": "MTN",
    "status": "pending"
  }
}
```

### Verify Payment
**POST** `/payments/verify`

Verify payment completion

**Request Body:**
```json
{
  "transactionId": "TXN-1715232000000-ABCD",
  "externalTransactionId": "MTN-REF-001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "id": "uuid",
    "transactionId": "TXN-1715232000000-ABCD",
    "status": "completed",
    "completedAt": "2024-05-09T09:30:00Z"
  }
}
```

### Get Payment Status
**GET** `/payments/{transactionId}`

Retrieve payment status

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "transactionId": "TXN-1715232000000-ABCD",
    "status": "completed",
    "amount": 10000,
    "receiptNumber": "RCP-1715232000000"
  }
}
```

---

## Admission Endpoints

### Generate Shortlist
**POST** `/admissions/shortlist/generate`

Generate shortlist for academic year (Admin/Admissions Officer only)

**Request Body:**
```json
{
  "academicYear": "2024",
  "cutoffAggregate": 12,
  "round": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Shortlist generated successfully",
  "data": [
    {
      "id": "uuid",
      "applicationId": "uuid",
      "academicYear": "2024",
      "selectionStatus": "shortlisted",
      "cutoffAggregate": 12
    }
  ]
}
```

### Get Shortlisted Applicants
**GET** `/admissions/shortlist/{academicYear}`

Retrieve all shortlisted applicants (Requires Authentication)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "application": {
        "applicationId": "APP-2024-ABCD1234",
        "applicant": {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com"
        }
      },
      "selectionStatus": "shortlisted"
    }
  ]
}
```

### Schedule Interview
**POST** `/admissions/shortlist/{shortlistId}/interview/schedule`

Schedule interview for applicant (Admin/Admissions Officer only)

**Request Body:**
```json
{
  "interviewDate": "2024-06-15T10:00:00Z",
  "interviewVenue": "Assembly Hall"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interview scheduled successfully",
  "data": {
    "id": "uuid",
    "interviewDate": "2024-06-15T10:00:00Z",
    "interviewVenue": "Assembly Hall",
    "interviewStatus": "pending"
  }
}
```

### Record Interview Score
**POST** `/admissions/shortlist/{shortlistId}/interview/score`

Record interview score (Admin/Admissions Officer only)

**Request Body:**
```json
{
  "score": 85
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interview score recorded successfully",
  "data": {
    "id": "uuid",
    "interviewScore": 85,
    "interviewStatus": "interviewed"
  }
}
```

### Issue Admission Offer
**POST** `/admissions/shortlist/{shortlistId}/offer`

Issue admission offer to applicant (Admin/Admissions Officer only)

**Response:**
```json
{
  "success": true,
  "message": "Admission offer issued successfully",
  "data": {
    "id": "uuid",
    "admissionOffered": true,
    "selectionStatus": "admitted"
  }
}
```

---

## Communication Endpoints

### Send Email
**POST** `/communications/email`

Send email to applicant (Admin/Admissions Officer only)

**Request Body:**
```json
{
  "applicationId": "uuid",
  "email": "john@example.com",
  "subject": "Application Shortlisting Notification",
  "body": "<html>Dear John, You have been shortlisted...</html>",
  "messageType": "shortlisting_notification"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "id": "uuid",
    "type": "email",
    "status": "sent",
    "sentAt": "2024-05-09T09:00:00Z"
  }
}
```

### Send SMS
**POST** `/communications/sms`

Send SMS to applicant (Admin/Admissions Officer only)

**Request Body:**
```json
{
  "applicationId": "uuid",
  "phone": "+256701234567",
  "body": "Congratulations! You have been shortlisted...",
  "messageType": "shortlisting_notification"
}
```

**Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "id": "uuid",
    "type": "sms",
    "status": "sent",
    "sentAt": "2024-05-09T09:00:00Z"
  }
}
```

### Get Communication History
**GET** `/communications/{applicationId}/history`

Retrieve all communications for application (Requires Authentication)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "email",
      "messageType": "application_received",
      "status": "sent",
      "subject": "Application Received",
      "sentAt": "2024-05-09T09:00:00Z"
    }
  ]
}
```

---

## Report Endpoints

### Get Admission Statistics
**GET** `/reports/statistics/{academicYear}`

Get admission statistics (Admin/Head Teacher only)

**Response:**
```json
{
  "success": true,
  "data": {
    "academicYear": "2024",
    "totalApplications": 1500,
    "shortlistedCount": 450,
    "admittedCount": 400,
    "rejectedCount": 1050,
    "femaleApplicants": 750,
    "maleApplicants": 750,
    "averagePleAggregate": 11.5,
    "genderDistribution": {
      "male": 750,
      "female": 750
    }
  }
}
```

### Get Payment Report
**GET** `/reports/payments/{academicYear}`

Get payment summary (Admin/Accounts Staff/Head Teacher only)

**Response:**
```json
{
  "success": true,
  "data": {
    "academicYear": "2024",
    "totalAmount": 4000000,
    "totalTransactions": 400,
    "paymentsByMethod": {
      "MTN": 2000000,
      "Airtel": 1500000,
      "Bank Transfer": 500000
    }
  }
}
```

### Get Application Distribution
**GET** `/reports/applications/distribution/{academicYear}`

Get application type distribution (Admin/Admissions Officer/Head Teacher only)

**Response:**
```json
{
  "success": true,
  "data": {
    "academicYear": "2024",
    "distribution": {
      "Form 1": 1200,
      "Form 5": 250,
      "Transfer": 50
    }
  }
}
```

### Get Subject Preferences
**GET** `/reports/subjects/{academicYear}`

Get subject preference distribution (Admin/Admissions Officer/Head Teacher only)

**Response:**
```json
{
  "success": true,
  "data": {
    "academicYear": "2024",
    "preferences": {
      "PCM": 120,
      "PCB": 85,
      "PEM": 25,
      "LAM": 20
    }
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "errors": []
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

Tokens are obtained from the login endpoint and are valid for 7 days by default.

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse. Current limits:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated requests

---

## Pagination

Endpoints that return lists support pagination:

```
GET /applications?page=1&limit=10
```

Response includes:
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```
