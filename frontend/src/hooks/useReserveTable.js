import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { toast } from 'sonner';
import { extractErrorMessages } from '../utils/extractErrorMessages';

export const useReserveTable = (onSuccess) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2 People',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Numbers only and max 10 digits
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: onlyNums }));
      }
      return; 
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateDateTime = () => {
    if (!formData.date || !formData.time) return null;
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      return "You cannot book a table for a past date or time.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Basic Required Fields Check
    if (!formData.full_name || !formData.phone || !formData.date || !formData.time) {
      setError("Please fill in all required fields.");
      return;
    }

    // 2. Exact 10-digit Phone Validation
    if (formData.phone.length !== 10) {
      const phoneErr = "Phone number must be exactly 10 digits.";
      setError(phoneErr);
      return;
    }

    // 3. Past Date Validation
    const dateError = validateDateTime();
    if (dateError) {
      setError(dateError);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/bookings/create/', formData);

      if (response.data.status === "success" || response.data.status === true) {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        toast.success(response.data.message || "Table booked successfully!");
        
        // Reset form
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: '2 People',
          notes: ''
        });

        if (onSuccess) onSuccess();
      } else {
        const errMsg = response.data.message || "Failed to book table.";
        setError(errMsg);
      }
    } catch (err) {
      const cleanError = extractErrorMessages(err);
      setError(cleanError);
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};