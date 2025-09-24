import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Shield, Edit, Save, X, Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface UserProfileProps {
  user: any;
  setUser: (user: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <section className={`pt-20 pb-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-200">Profile updated successfully!</span>
          </div>
        )}

        <div className={`rounded-2xl shadow-xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-16 w-16 text-gray-600" />
                </div>
                <button className="absolute bottom-2 right-2 bg-cyan-600 rounded-full p-3 hover:bg-cyan-700 transition-colors shadow-lg">
                  <Camera className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
                <p className="text-cyan-100 text-lg mb-3">{user?.email}</p>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="h-5 w-5 text-cyan-200" />
                  <span className="text-cyan-200">
                    Member since {new Date(user?.joinDate).toLocaleDateString()}
                  </span>
                </div>
                {user?.isVerified && (
                  <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <span className="text-green-300 text-sm">Verified Account</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Edit className="h-5 w-5" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Personal Information */}
              <div>
                <h2 className={`text-2xl font-semibold mb-8 flex items-center space-x-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <User className="h-6 w-6 text-cyan-500" />
                  <span>Personal Information</span>
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`px-4 py-3 rounded-lg ${
                        isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                      }`}>
                        {user?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`px-4 py-3 rounded-lg flex items-center space-x-3 ${
                        isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                      }`}>
                        <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span>{user?.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`px-4 py-3 rounded-lg flex items-center space-x-3 ${
                        isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                      }`}>
                        <Phone className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span>{user?.phone || 'Not provided'}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                        }`}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className={`px-4 py-3 rounded-lg min-h-[100px] ${
                        isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                      }`}>
                        {user?.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                    >
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                        isDark 
                          ? 'bg-gray-600 text-white hover:bg-gray-700' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <X className="h-5 w-5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Security & Activity */}
              <div>
                <h2 className={`text-2xl font-semibold mb-8 flex items-center space-x-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <Shield className="h-6 w-6 text-cyan-500" />
                  <span>Security & Activity</span>
                </h2>

                <div className="space-y-6">
                  <div className={`rounded-lg p-6 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Account Security
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Two-Factor Authentication
                        </span>
                        <span className="text-green-500 text-sm font-medium">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Password Strength
                        </span>
                        <span className="text-yellow-500 text-sm font-medium">Strong</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Email Verification
                        </span>
                        <span className="text-green-500 text-sm font-medium">Verified</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Last Password Change
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          30 days ago
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-6 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Last Login
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Today, 2:30 PM
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Scans Performed
                        </span>
                        <span className="text-cyan-500 text-sm font-medium">47</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Threats Detected
                        </span>
                        <span className="text-red-500 text-sm font-medium">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Complaints Filed
                        </span>
                        <span className="text-orange-500 text-sm font-medium">2</span>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-lg p-6 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Preferences
                    </h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" 
                          defaultChecked 
                        />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Email notifications
                        </span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" 
                          defaultChecked 
                        />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Security alerts
                        </span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" 
                        />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          Marketing updates
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;