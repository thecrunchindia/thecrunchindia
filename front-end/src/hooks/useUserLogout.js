import { toast } from 'sonner';

export const useUserLogout = () => {
    const handleLogout = () => {
        localStorage.removeItem("user_access");
        localStorage.removeItem("user_refresh");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_name");

        toast.success("Logged out successfully!");

        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };

    return { handleLogout };
};