// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://erp-system-rose.vercel.app' // Your deployed backend URL
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  },
  STUDENT: {
    PROFILE: `${API_BASE_URL}/api/student/profile`,
    FEES: `${API_BASE_URL}/api/student/fees`,
    DOCUMENTS: `${API_BASE_URL}/api/student/documents`,
  },
  ADMIN: {
    OVERVIEW: `${API_BASE_URL}/api/admin/overview`,
  },
  FACULTY: {
    APPLICATIONS: `${API_BASE_URL}/api/faculty/applications`,
  }
};

// API Helper function
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
