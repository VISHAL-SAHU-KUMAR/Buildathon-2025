import React, { useState } from 'react';
import { FileText, Upload, Send, AlertTriangle, CheckCircle, Clock, Mail, Phone, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ComplaintFormProps {
  user: any;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ user }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium',
    contactMethod: 'email',
    attachments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const categories = [
    { value: 'phishing', label: 'Phishing Attack', icon: '🎣' },
    { value: 'deepfake', label: 'Deepfake Content', icon: '🎭' },
    { value: 'malware', label: 'Malware/Virus', icon: '🦠' },
    { value: 'identity-theft', label: 'Identity Theft', icon: '🆔' },
    { value: 'social-engineering', label: 'Social Engineering', icon: '🎯' },
    { value: 'data-breach', label: 'Data Breach', icon: '🔓' },
    { value: 'fraud', label: 'Financial Fraud', icon: '💳' },
    { value: 'other', label: 'Other', icon: '❓' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-500', description: 'Non-urgent issue' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500', description: 'Standard priority' },
    { value: 'high', label: 'High', color: 'text-red-500', description: 'Urgent attention needed' },
    { value: 'critical', label: 'Critical', color: 'text-red-600', description: 'Immediate action required' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newComplaintId = `CMP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      setComplaintId(newComplaintId);
      setSubmitted(true);
      setIsSubmitting(false);
      
      // Send email notification (simulated)
      console.log('Email sent to:', user.email);
      console.log('Complaint ID:', newComplaintId);
    }, 2000);
  };

  if (submitted) {
    return (
      <section className={`pt-20 pb-16 min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl p-8 text-center ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-xl`}>
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Complaint Submitted Successfully!
            </h2>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your complaint has been received and assigned tracking ID:
            </p>
            <div className={`inline-block px-6 py-3 rounded-lg font-mono text-xl font-bold mb-6 ${
              isDark ? 'bg-cyan-900 text-cyan-200' : 'bg-cyan-100 text-cyan-800'
            }`}>
              {complaintId}
            </div>
            
            <div className={`p-6 rounded-lg mb-6 ${
              isDark ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What happens next?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-cyan-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Confirmation email sent to {user.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Initial review within 24 hours
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Assignment to specialist team
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Regular updates via your preferred contact method
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
              >
                Submit Another Complaint
              </button>
              <button
                onClick={() => window.open(`/track-complaint/${complaintId}`, '_blank')}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Track This Complaint
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-20 pb-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-cyan-500" />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              File a Security Complaint
            </h1>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Report cybersecurity incidents, scams, or suspicious activities. Our team will investigate and take appropriate action.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className={`rounded-2xl p-8 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h2 className={`text-2xl font-semibold mb-8 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Complaint Details
              </h2>

              {/* Category Selection */}
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Issue Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        formData.category === cat.value
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900'
                          : isDark
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={formData.category === cat.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-2xl mb-2">{cat.icon}</div>
                      <div className={`text-sm font-medium ${
                        formData.category === cat.value
                          ? 'text-cyan-700 dark:text-cyan-300'
                          : isDark
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}>
                        {cat.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Level */}
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Priority Level
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <label
                      key={priority.value}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        formData.priority === priority.value
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900'
                          : isDark
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`text-sm font-bold mb-1 ${priority.color}`}>
                        {priority.label}
                      </div>
                      <div className={`text-xs ${
                        formData.priority === priority.value
                          ? 'text-cyan-700 dark:text-cyan-300'
                          : isDark
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}>
                        {priority.description}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Brief description of the issue"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Please provide as much detail as possible about the incident, including when it occurred, what happened, and any relevant information..."
                />
              </div>

              {/* Contact Method */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Preferred Contact Method
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleChange}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    <Mail className="h-4 w-4 text-cyan-500" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleChange}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    <Phone className="h-4 w-4 text-cyan-500" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Phone</span>
                  </label>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Evidence & Supporting Documents
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDark 
                    ? 'border-gray-600 hover:border-cyan-400 bg-gray-700/50' 
                    : 'border-gray-300 hover:border-cyan-400 bg-gray-50'
                }`}>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.eml"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className={`h-12 w-12 mx-auto mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Click to upload or drag and drop
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Screenshots, emails, documents, etc. (Max 10MB each)
                    </p>
                  </label>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDark ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-cyan-500" />
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {file.name}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-600 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.category || !formData.subject || !formData.description}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Complaint</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Your Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-cyan-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-cyan-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user.email}
                  </span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-cyan-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Guidelines */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Filing Guidelines
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-900' : 'bg-blue-50'
                }`}>
                  <p className={isDark ? 'text-blue-200' : 'text-blue-800'}>
                    <strong>Be Specific:</strong> Provide detailed information about the incident
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-green-900' : 'bg-green-50'
                }`}>
                  <p className={isDark ? 'text-green-200' : 'text-green-800'}>
                    <strong>Include Evidence:</strong> Upload screenshots, emails, or documents
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-yellow-900' : 'bg-yellow-50'
                }`}>
                  <p className={isDark ? 'text-yellow-200' : 'text-yellow-800'}>
                    <strong>Act Quickly:</strong> Report incidents as soon as possible
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-red-900' : 'bg-red-50'
            } border border-red-200 dark:border-red-700`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-red-200' : 'text-red-800'
              }`}>
                Emergency Support
              </h3>
              <p className={`text-sm mb-4 ${
                isDark ? 'text-red-300' : 'text-red-700'
              }`}>
                For urgent security incidents requiring immediate attention:
              </p>
              <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDark 
                  ? 'bg-red-700 text-white hover:bg-red-600' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}>
                Emergency Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintForm;