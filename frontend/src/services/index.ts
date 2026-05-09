import api from './api';

export const authService = {
  register: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  validateToken: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  },
};

export const applicationService = {
  createApplication: async (data: any) => {
    const response = await api.post('/applications', data);
    return response.data;
  },

  getApplications: async () => {
    const response = await api.get('/applications');
    return response.data;
  },

  getApplicationById: async (id: string) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  uploadDocuments: async (applicationId: string, files: any) => {
    const formData = new FormData();
    formData.append('birthCertificate', files.birthCertificate);
    formData.append('pleResultSlip', files.pleResultSlip);

    const response = await api.post(`/applications/${applicationId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const paymentService = {
  initiatePayment: async (applicationId: string, amount: number, method: string, phone: string) => {
    const response = await api.post('/payments/initiate', {
      applicationId,
      amount,
      paymentMethod: method,
      phone,
    });
    return response.data;
  },

  verifyPayment: async (transactionId: string, externalTransactionId: string) => {
    const response = await api.post('/payments/verify', {
      transactionId,
      externalTransactionId,
    });
    return response.data;
  },

  getPaymentStatus: async (transactionId: string) => {
    const response = await api.get(`/payments/${transactionId}`);
    return response.data;
  },
};

export const admissionService = {
  getShortlistedApplicants: async (academicYear: string) => {
    const response = await api.get(`/admissions/shortlist/${academicYear}`);
    return response.data;
  },

  scheduleInterview: async (shortlistId: string, date: Date, venue: string) => {
    const response = await api.post(`/admissions/shortlist/${shortlistId}/interview/schedule`, {
      interviewDate: date,
      interviewVenue: venue,
    });
    return response.data;
  },
};

export const reportService = {
  getStatistics: async (academicYear: string) => {
    const response = await api.get(`/reports/statistics/${academicYear}`);
    return response.data;
  },

  getPaymentReport: async (academicYear: string) => {
    const response = await api.get(`/reports/payments/${academicYear}`);
    return response.data;
  },
};
