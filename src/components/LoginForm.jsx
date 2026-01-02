import React from 'react';
import { Mail, Lock, LogIn, ArrowRight, Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';

const LoginForm = ({ formData, handleChange, handleSubmit, errors, isSubmitting, onSwitch, onForgot }) => (
  <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
      <p className="text-gray-500 text-sm mt-2">Sign in to continue your session</p>
    </div>

    <AuthInput 
      icon={Mail} name="email" type="email" placeholder="Email Address"
      value={formData.email} onChange={handleChange} error={errors.email}
    />
    
    <AuthInput 
      icon={Lock} name="password" type="password" placeholder="Password"
      value={formData.password} onChange={handleChange} error={errors.password}
    />

    <div className="text-right">
      <button type="button" onClick={onForgot} className="text-sm text-indigo-600 hover:underline">
        Forgot Password?
      </button>
    </div>

    <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
      {isSubmitting ? <Loader2 className="animate-spin" /> : <><LogIn size={18} /> Sign In</>}
    </button>

    <p className="text-center text-gray-600 text-sm">
      Don't have an account? <button type="button" onClick={onSwitch} className="text-indigo-600 font-bold">Sign Up</button>
    </p>
  </form>
);

export default LoginForm;