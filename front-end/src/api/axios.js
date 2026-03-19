import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
});

const getAuthData = () => {
  const pathname = window.location.pathname;
  const isAdminPath = pathname.startsWith('/admin');

  const adminToken = localStorage.getItem('admin_token');
  const userToken = localStorage.getItem('user_access');

  if (isAdminPath && adminToken) {
    return {
      token: adminToken,
      refresh: localStorage.getItem('admin_refresh'),
      context: 'admin_panel'
    };
  }

  return {
    token: userToken,
    refresh: localStorage.getItem('user_refresh'),
    context: 'user_side'
  };
};

// Request Interceptor
api.interceptors.request.use((config) => {
  const { token } = getAuthData();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  else {
    config.headers.Authorization = null;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { context } = getAuthData();

    // 1. INSTANT KICK-OUT LOGIC 
    if (error.response?.status === 403) {
      const errorDetail = error.response.data.detail;

      if (errorDetail === "Your account has been blocked by the admin. You are logged out.") {
        console.warn("[Security] User blocked by admin. Clearing session...");
        
        // Clear all storage
        localStorage.clear();

        // Show professional warning
        toast.error("Your account has been blocked by the admin.", {
          description: "Access denied. Logging you out now.",
          duration: 6000,
        });

        // Redirect instantly
        setTimeout(() => {
          window.location.href = context === 'admin_panel' ? '/admin/login' : '/';
        }, 1500);

        return Promise.reject(error);
      }
    }

    // 2. TOKEN REFRESH LOGIC 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refresh } = getAuthData();

      if (!refresh) return Promise.reject(error);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
          refresh: refresh,
        });

        if (res.status === 200) {
          const newAccessToken = res.data.access;

          if (context === 'admin_panel') {
            localStorage.setItem('admin_token', newAccessToken);
          } else {
            localStorage.setItem('user_access', newAccessToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh failed, clearing storage...");
        localStorage.clear();
        toast.error('Session expired. Please login again !');
        setTimeout(() => {
            window.location.href = context === 'admin_panel' ? '/admin/login' : '/login';
        }, 1500);
      }
    }

    return Promise.reject(error);
  }
);

export default api;