import React, { useState } from 'react';
import { BarChart3, Search, Filter, Eye, Download, MessageSquare, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ComplaintTrackingProps {
  user: any;
}

const ComplaintTracking: React.FC<ComplaintTrackingProps> = ({ user }) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(null);

  const complaints = [
    {
      id: 'CMP-2024-001',
      subject: 'Phishing Email from Fake Bank',
      category: 'phishing',
      status: 'investigating',
      priority: 'high',
      submittedDate: '2024-01-15T10:30:00Z',
      lastUpdate: '2024-01-16T14:20:00Z',
      assignedTo: 'Security Team Alpha',
      description: 'Received suspicious email claiming to be from my bank asking for account verification.',
      evidence: ['email_screenshot.png', 'email_headers.txt'],
      updates: [
        {
          date: '2024-01-16T14:20:00Z',
          status: 'investigating',
          message: 'Case assigned to security analyst. Initial review completed.',
          author: 'System'
        },
        {
          date: '2024-01-15T10:35:00Z',
          status: 'submitted',
          message: 'Complaint submitted successfully. Reference ID: CMP-2024-001',
          author: 'System'
        }
      ]
    },
    {
      id: 'CMP-2024-002',
      subject: 'Deepfake Video on Social Media',
      category: 'deepfake',
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-01-10T09:15:00Z',
      lastUpdate: '2024-01-14T16:45:00Z',
      assignedTo: 'AI Analysis Team',
      description: 'Found a deepfake video of a public figure spreading misinformation.',
      evidence: ['deepfake_video.mp4', 'social_media_screenshot.png'],
      resolution: 'Video confirmed as deepfake. Reported to platform and removed within 24 hours.',
      updates: [
        {
          date: '2024-01-14T16:45:00Z',
          status: 'resolved',
          message: 'Case resolved. Deepfake video removed from platform.',
          author: 'AI Analysis Team'
        },
        {
          date: '2024-01-12T11:30:00Z',
          status: 'investigating',
          message: 'AI analysis confirms 94% probability of deepfake manipulation.',
          author: 'AI Analysis Team'
        },
        {
          date: '2024-01-10T09:20:00Z',
          status: 'submitted',
          message: 'Complaint received and queued for analysis.',
          author: 'System'
        }
      ]
    },
    {
      id: 'CMP-2024-003',
      subject: 'Cryptocurrency Scam Website',
      category: 'fraud',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-01-18T15:45:00Z',
      lastUpdate: '2024-01-18T15:45:00Z',
      assignedTo: 'Pending Assignment',
      description: 'Fake cryptocurrency investment website stealing user funds.',
      evidence: ['website_screenshot.png', 'transaction_details.pdf'],
      updates: [
        {
          date: '2024-01-18T15:45:00Z',
          status: 'submitted',
          message: 'Complaint submitted. Awaiting assignment to investigation team.',
          author: 'System'
        }
      ]
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'investigating': return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed': return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'investigating': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'resolved': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'closed': return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className={`pt-20 pb-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-cyan-500" />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Complaint Tracking
            </h1>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track the status and progress of your submitted complaints
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search complaints by ID or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Complaints List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className={`rounded-2xl p-6 transition-all duration-200 cursor-pointer ${
                    isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg hover:shadow-xl ${
                    selectedComplaint === parseInt(complaint.id.split('-')[2]) 
                      ? 'ring-2 ring-cyan-500' 
                      : ''
                  }`}
                  onClick={() => setSelectedComplaint(
                    selectedComplaint === parseInt(complaint.id.split('-')[2]) 
                      ? null 
                      : parseInt(complaint.id.split('-')[2])
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {complaint.subject}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(complaint.status)
                        }`}>
                          {complaint.status.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ID: {complaint.id}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {complaint.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getPriorityColor(complaint.priority)
                      }`}>
                        {complaint.priority.toUpperCase()}
                      </span>
                      {getStatusIcon(complaint.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Submitted: {new Date(complaint.submittedDate).toLocaleDateString()}
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Updated: {new Date(complaint.lastUpdate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {complaint.evidence.length} evidence files
                      </span>
                      <Eye className="h-4 w-4 text-cyan-500" />
                    </div>
                  </div>

                  {selectedComplaint === parseInt(complaint.id.split('-')[2]) && (
                    <div className={`mt-6 pt-6 border-t ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className={`font-semibold mb-3 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            Case Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                Assigned To:
                              </span>
                              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                {complaint.assignedTo}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                Category:
                              </span>
                              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                {complaint.category}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                Evidence Files:
                              </span>
                              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                {complaint.evidence.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            Evidence Files
                          </h4>
                          <div className="space-y-2">
                            {complaint.evidence.map((file, index) => (
                              <div key={index} className={`flex items-center justify-between p-2 rounded ${
                                isDark ? 'bg-gray-700' : 'bg-gray-100'
                              }`}>
                                <span className={`text-sm ${
                                  isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {file}
                                </span>
                                <button className="text-cyan-500 hover:text-cyan-600">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {complaint.resolution && (
                        <div className={`mb-6 p-4 rounded-lg ${
                          isDark ? 'bg-green-900' : 'bg-green-50'
                        }`}>
                          <h4 className={`font-semibold mb-2 ${
                            isDark ? 'text-green-200' : 'text-green-800'
                          }`}>
                            Resolution
                          </h4>
                          <p className={`text-sm ${
                            isDark ? 'text-green-300' : 'text-green-700'
                          }`}>
                            {complaint.resolution}
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className={`font-semibold mb-4 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Case Updates
                        </h4>
                        <div className="space-y-4">
                          {complaint.updates.map((update, index) => (
                            <div key={index} className={`flex space-x-3 p-3 rounded-lg ${
                              isDark ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                              <div className="flex-shrink-0">
                                {getStatusIcon(update.status)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-sm font-medium ${
                                    isDark ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {update.author}
                                  </span>
                                  <span className={`text-xs ${
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {new Date(update.date).toLocaleString()}
                                  </span>
                                </div>
                                <p className={`text-sm ${
                                  isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                  {update.message}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredComplaints.length === 0 && (
              <div className={`text-center py-12 rounded-2xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <BarChart3 className={`h-16 w-16 mx-auto mb-4 ${
                  isDark ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  No complaints found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Complaint Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Total Complaints
                  </span>
                  <span className="text-cyan-500 font-semibold text-lg">
                    {complaints.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Pending
                  </span>
                  <span className="text-yellow-500 font-semibold">
                    {complaints.filter(c => c.status === 'pending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Investigating
                  </span>
                  <span className="text-blue-500 font-semibold">
                    {complaints.filter(c => c.status === 'investigating').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Resolved
                  </span>
                  <span className="text-green-500 font-semibold">
                    {complaints.filter(c => c.status === 'resolved').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200">
                  File New Complaint
                </button>
                <button className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Export Report
                </button>
                <button className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Contact Support
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-900' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                    Case CMP-2024-001 status updated to "Investigating"
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    2 hours ago
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-green-900' : 'bg-green-50'
                }`}>
                  <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-800'}`}>
                    Case CMP-2024-002 has been resolved
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                    1 day ago
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-yellow-900' : 'bg-yellow-50'
                }`}>
                  <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                    New complaint CMP-2024-003 submitted
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintTracking;