import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios'; 
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../utils/extractErrorMessages';

export const useAdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (error) setError(""); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 

        try {
            const res = await api.post('/auth/admin-login/', credentials);
            
            if (res.data.status === true) {
                localStorage.setItem("admin_token", res.data.access);
                localStorage.setItem("admin_refresh", res.data.refresh);
                localStorage.setItem("admin_role", res.data.role); 
                
                toast.success("successfully logged in!");
                setTimeout(() => {
                     window.location.href = '/admin/dashboard';
                }, 1500);
               
            } else {
                setError(res.data.message || "Unauthorized access.");
        
            }
        } catch (err) {
            const cleanError = extractErrorMessages(err);
            setError(cleanError || "Authentication Failed.");
        } finally {
            setLoading(false);
        }
    };

    return {
        credentials,
        loading,
        showPassword,
        error,
        handleChange,
        handleLogin,
        togglePasswordVisibility
    };
};