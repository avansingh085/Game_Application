import React, { useState, useRef, memo } from 'react';
import { Mail, ShieldCheck, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';
import apiClient from '../utils/apiClient';
import Toast from './Toast';

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const emailRef = useRef('');
  const otpRef = useRef('');
  const passRef = useRef('');
  const confirmRef = useRef('');

  const handleProcess = async (e) => {
    e.preventDefault();

    const email = emailRef.current;
    const otp = otpRef.current;
    const pass = passRef.current;
    const confirm = confirmRef.current;

    if (step === 3 && pass !== confirm) {
      Toast.Fail("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (step === 1) {
        await apiClient.post('/api/auth/send-otp', { email, subject: 'Change Password' });
        setStep(2);
      } else if (step === 2) {
        await apiClient.post('/api/auth/verify-otp', { email, otp });
        setStep(3);
      } else {
        await apiClient.post('/api/auth/reset-password', { email, newPassword: pass, otp });
        Toast.Success("Password Reset!");
        onBack();
      }
    } catch (err) {
      Toast.Fail(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 mb-6 hover:text-indigo-600">
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
            onChange={e => emailRef.current = e.target.value} 
          />
        )}
        
        {step === 2 && (
          <AuthInput 
            icon={ShieldCheck} 
            type="text" 
            placeholder="6-digit OTP" 
            required
            onChange={e => otpRef.current = e.target.value} 
          />
        )}
        
        {step === 3 && (
          <>
            <AuthInput 
              icon={Lock} 
              type="password" 
              placeholder="New Password" 
              required
              onChange={e => passRef.current = e.target.value} 
            />
            <AuthInput 
              icon={Lock} 
              type="password" 
              placeholder="Confirm Password" 
              required
              onChange={e => confirmRef.current = e.target.value} 
            />
          </>
        )}

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default memo(ForgotPassword);