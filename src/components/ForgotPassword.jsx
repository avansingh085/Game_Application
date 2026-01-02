import React, { useState } from 'react';
import { Mail, ShieldCheck, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';
import apiClient from '../utils/apiClient';
import Toast from './Toast';

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [vals, setVals] = useState({ email: '', otp: '', pass: '', confirm: '' });

  const handleProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (step === 1) {
        await apiClient.post('/api/auth/send-otp', { email: vals.email,subject:'change password ' });
        setStep(2);
      } else if (step === 2) {
        await apiClient.post('/api/auth/verify-otp', { email: vals.email, otp: vals.otp });
        setStep(3);
      } else {
        await apiClient.post('/api/auth/reset-password', { email: vals.email, newPassword: vals.pass,otp: vals.otp });
        Toast.Success("Password Reset!");
        onBack();
      }
    } catch (err) {
      Toast.Fail("Request failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 mb-6 hover:text-indigo-600">
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {step === 1 ? "Reset Password" : step === 2 ? "Check Email" : "New Password"}
      </h2>

      <form onSubmit={handleProcess} className="space-y-4">
        {step === 1 && <AuthInput icon={Mail} type="email" placeholder="Enter your email" onChange={e => setVals({...vals, email: e.target.value})} />}
        {step === 2 && <AuthInput icon={ShieldCheck} type="text" placeholder="6-digit OTP" onChange={e => setVals({...vals, otp: e.target.value})} />}
        {step === 3 && (
          <>
            <AuthInput icon={Lock} type="password" placeholder="New Password" onChange={e => setVals({...vals, pass: e.target.value})} />
            <AuthInput icon={Lock} type="password" placeholder="Confirm" onChange={e => setVals({...vals, confirm: e.target.value})} />
          </>
        )}
        <button className="w-full bg-black text-white py-3 rounded-xl font-bold transition-transform active:scale-95">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;