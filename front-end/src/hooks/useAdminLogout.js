import { toast } from 'sonner';
import api from '../api/axios';
import { messaging, getToken } from '../utils/firebase';

export const useAdminLogout = () => {
    const handleLogout = async () => {
        try {
            const currentToken = await getToken(messaging);
            const adminToken = localStorage.getItem("admin_token");

            if (currentToken && adminToken) {
                await api.post('/notifications/delete-fcm-token/', { 
                    fcm_token: currentToken 
                });
                console.log("FCM Token deleted from server");
            }
        } catch (error) {
            console.error("Error deleting FCM token:", error);
        } finally {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_refresh");
            localStorage.removeItem("admin_role");

            toast.success("Logged out successfully!");

            setTimeout(() => {
                window.location.href = "/admin/login";
            }, 2000);
        }
    };

    return { handleLogout };
};