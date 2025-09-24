import React, { useState } from 'react';
import { X, Eye, EyeOff, Shield, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface AuthModalProps {
  mode: 'signin' | 'signup' | 'forgot' | 'verify';
  setMode: (mode: 'signin' | 'signup' | 'forgot' | 'verify') => void;
  onClose: () => void;
  onAuth: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, setMode, onClose, onAuth }) => {
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim() && mode !== 'verify') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && mode !== 'verify') {
      newErrors.email = 'Email is invalid';
    }

    if (mode === 'signup' && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (mode !== 'forgot' && mode !== 'verify' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode !== 'forgot' && mode !== 'verify' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (mode === 'verify' && !formData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mode === 'forgot') {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          setMode('signin');
        }, 3000);
      } else if (mode === 'signup') {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          setMode('verify');
        }, 2000);
      } else if (mode === 'verify') {
        // Mock user data
        const userData = {
          id: Date.now(),
          name: formData.name || 'User',
          email: formData.email,
          phone: formData.phone,
          joinDate: new Date().toISOString(),
          isVerified: true
        };
        onAuth(userData);
      } else {
        // Sign in
        const userData = {
          id: Date.now(),
          name: formData.name || 'User',
          email: formData.email,
          phone: formData.phone,
          joinDate: new Date().toISOString(),
          isVerified: true
        };
        onAuth(userData);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Reset Password';
      case 'verify': return 'Verify Email';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signin': return 'Sign in to your CyberShield account';
      case 'signup': return 'Join CyberShield to protect yourself from cyber threats';
      case 'forgot': return 'Enter your email to receive a password reset link';
      case 'verify': return 'Enter the verification code sent to your email';
    }
  };

  if (emailSent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className={`rounded-2xl shadow-2xl w-full max-w-md mx-4 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {mode === 'forgot' ? 'Reset Link Sent!' : 'Verification Email Sent!'}
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {mode === 'forgot' 
                ? 'Check your email for password reset instructions.'
                : 'Please check your email and click the verification link to continue.'
              }
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getTitle()}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getSubtitle()}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name *
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.name 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {mode !== 'verify' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.email 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.phone 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            )}

            {mode === 'verify' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Verification Code *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.verificationCode 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>
                {errors.verificationCode && <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>}
              </div>
            )}

            {mode !== 'forgot' && mode !== 'verify' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.password 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      errors.confirmPassword 
                        ? 'border-red-500' 
                        : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                  {mode === 'verify' && 'Verify Email'}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            {mode === 'signin' && (
              <div className="space-y-4">
                <button
                  onClick={() => setMode('forgot')}
                  className="text-cyan-500 hover:text-cyan-600 text-sm transition-colors"
                >
                  Forgot your password?
                </button>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}

            {mode === 'signup' && (
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Remember your password?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'verify' && (
              <div className="space-y-4">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Didn't receive the code?{' '}
                  <button className="text-cyan-500 hover:text-cyan-600 transition-colors font-medium">
                    Resend
                  </button>
                </p>
                <button
                  onClick={() => setMode('signup')}
                  className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-cyan-500 transition-colors`}
                >
                  ← Back to signup
                </button>
              </div>
            )}
          </div>

          {mode === 'signup' && (
            <div className={`mt-6 p-4 rounded-lg ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  By creating an account, you agree to our Terms of Service and Privacy Policy. 
                  Your data is protected with enterprise-grade security. Email verification is required to activate your account.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;