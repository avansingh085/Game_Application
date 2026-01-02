import React from 'react';
import { User, Mail, Lock, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import AuthInput from './AuthInput';

const RegisterForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  errors, 
  isSubmitting, 
  onSwitch 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-2">Join us and start your adventure today</p>
      </div>

      {/* Full Name Field */}
      <AuthInput 
        icon={User} 
        name="name" 
        type="text" 
        placeholder="Full Name"
        value={formData.name} 
        onChange={handleChange} 
        error={errors.name}
      />

    
      <AuthInput 
        icon={Mail} 
        name="email" 
        type="email" 
        placeholder="Email Address"
        value={formData.email} 
        onChange={handleChange} 
        error={errors.email}
      />
      
     
      <AuthInput 
        icon={Lock} 
        name="password" 
        type="password" 
        placeholder="Password"
        value={formData.password} 
        onChange={handleChange} 
        error={errors.password}
      />

      <AuthInput 
        icon={Lock} 
        name="confirmPassword" 
        type="password" 
        placeholder="Confirm Password"
        value={formData.confirmPassword} 
        onChange={handleChange} 
        error={errors.confirmPassword}
      />

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <UserPlus size={18} /> 
            Get Started
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={onSwitch} 
          className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;