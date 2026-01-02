import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../services/redux/userSlice';
import apiClient from '../utils/apiClient';
import { setToken } from '../services/authService';
import Toast from '../components/Toast';


import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPassword from '../components/ForgotPassword';

const AuthPage = () => {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({
    name: '',
    email: 'test@gmail.com',
    password: 'test1234',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin: isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) navigate('/Game');
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (view === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const endpoint = view === 'login' ? "/api/auth/login" : "/api/auth/register";
      const payload = view === 'login' 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await apiClient.post(endpoint, payload);
      
      if (response.data.success) {
        if (view === 'login') {
          //setToken(response.data.token);
          dispatch(setUser(response.data?.Profile));
          Toast.Success('Welcome back!');
          navigate("/Game");
        } else {
          Toast.Success('Account created! Please login.');
          setView('login');
        }
      } else {
        Toast.Fail(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      Toast.Fail('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-4">
      {/* <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8">
           */}
          {/* {view === 'login' && (
            <LoginForm 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              onSwitch={() => setView('register')}
              onForgot={() => setView('forgot')}
            />
          )}

          {view === 'register' && (
            <RegisterForm 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              onSwitch={() => setView('login')}
            />
          )}

          {view === 'forgot' && (
            <ForgotPassword onBack={() => setView('login')} />
          )}

        </div>
      </div> */}
    </div>
  );
};

export default AuthPage;