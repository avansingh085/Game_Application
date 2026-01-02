import React, { useState } from 'react';
import { Mail, ShieldCheck, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';
import apiClient from '../utils/apiClient';
import Toast from './Toast';

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [vals, setVals] = useState({ email: '', otp: '', pass: '', confirm: '' });

  const handleChange = (field, value) => {
    setVals(prev => ({ ...prev, [field]: value }));
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    
    if (step === 3 && vals.pass !== vals.confirm) {
      Toast.Fail("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (step === 1) {
        await apiClient.post('/api/auth/send-otp', { email: vals.email, subject: 'Change Password' });
        setStep(2);
      } else if (step === 2) {
        await apiClient.post('/api/auth/verify-otp', { email: vals.email, otp: vals.otp });
        setStep(3);
      } else {
        await apiClient.post('/api/auth/reset-password', { 
          email: vals.email, 
          newPassword: vals.pass, 
          otp: vals.otp 
        });
        Toast.Success("Password Reset!");
        onBack();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Request failed";
      Toast.Fail(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <button 
        onClick={onBack} 
        className="flex items-center text-sm text-gray-500 mb-6 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {step === 1 ? "Reset Password" : step === 2 ? "Check Email" : "New Password"}
      </h2>

      <form onSubmit={handleProcess} className="space-y-4">
        {step === 1 && (
          <AuthInput 
            icon={Mail} 
            type="email" 
            placeholder="Enter your email" 
            required
            value={vals.email}
            onChange={e => handleChange('email', e.target.value)} 
          />
        )}
        
        {step === 2 && (
          <AuthInput 
            icon={ShieldCheck} 
            type="text" 
            placeholder="6-digit OTP" 
            required
            value={vals.otp}
            onChange={e => handleChange('otp', e.target.value)} 
          />
        )}
        
        {step === 3 && (
          <>
            <AuthInput 
              icon={Lock} 
              type="password" 
              placeholder="New Password" 
              required
              value={vals.pass}
              onChange={e => handleChange('pass', e.target.value)} 
            />
            <AuthInput 
              icon={Lock} 
              type="password" 
              placeholder="Confirm Password" 
              required
              value={vals.confirm}
              onChange={e => handleChange('confirm', e.target.value)} 
            />
          </>
        )}

        <button 
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;