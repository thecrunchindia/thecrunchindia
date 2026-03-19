import { useState } from 'react';
import api from '../../../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useContact = () => {
   const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const scrollTop = () => {
  window.scrollTo({ top: 0 , behavior: "instant" });
};


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      scrollTop();
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      full_name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      const response = await api.post('/contact/', payload);

      if (response.data.status === true) {
        toast.success(response.data.message || "Message sent successfully!");
         queryClient.invalidateQueries({ queryKey: ['messages'] });
        
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errMsg = response.data.message || "Failed to send message.";
        setError(errMsg);
        scrollTop();
      }
    } catch (err) {
      const cleanError = extractErrorMessages(err);
      setError(cleanError);
      scrollTop();
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};