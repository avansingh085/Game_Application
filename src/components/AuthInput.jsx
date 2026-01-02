import React from 'react';

const AuthInput = ({ icon: Icon, error, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
    <input
      {...props}
      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-b-2 outline-none transition-all ${
        error ? 'border-red-500' : 'border-transparent focus:border-indigo-500'
      }`}
    />
    {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
  </div>
);

export default AuthInput;