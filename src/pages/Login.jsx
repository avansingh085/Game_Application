import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../services/redux/globalSlice';
import apiClient from '../utils/apiClient';
import { setToken, setUserID } from '../services/authService';
import Toast from '../components/Toast';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let response = await apiClient.post(isLogin ? "/api/auth/login" : "/api/auth/register", {
        email,
        password,
        ...(isLogin ? {} : { name }),
      });
      console.log(response.data)
      if (response.data.success) {
        setToken(response.data.token);
        Toast.Success('login successfully!')
      
        dispatch(setUser(response.data?.Profile));
        navigate("/Game");
      } else {
        Toast.Fail('fail to login');
        // console.error("Authentication failed:", response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                required
                className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                required
                className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? 'New user?' : 'Already have an account?'}
              </span>
            </div>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-4 flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50"
            >
              {isLogin ? 'Create a new account' : 'Sign in instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
