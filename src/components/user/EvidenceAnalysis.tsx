import React, { useState } from 'react';
import { Camera, Upload, Scan, CheckCircle, AlertTriangle, FileImage, Mail, MessageSquare, Eye, Download, Share2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface EvidenceAnalysisProps {
  user: any;
}

const EvidenceAnalysis: React.FC<EvidenceAnalysisProps> = ({ user }) => {
  const { isDark } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadDate: new Date().toISOString(),
      status: 'uploaded'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const analyzeFile = (fileId: number) => {
    setIsAnalyzing(true);
    setSelectedFile(fileId);
    
    setTimeout(() => {
      const riskLevel = Math.random();
      const result = {
        fileId,
        riskScore: Math.floor(riskLevel * 100),
        riskLevel: riskLevel > 0.7 ? 'high' : riskLevel > 0.4 ? 'medium' : 'low',
        threats: [
          'Potential phishing indicators detected',
          'Suspicious URL patterns found',
          'Email header inconsistencies'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: [
          'Do not click any links in this email',
          'Verify sender through alternative communication',
          'Report to your IT security team'
        ],
        analysisDate: new Date().toISOString()
      };
      
      setAnalysisResults([...analysisResults, result]);
      setUploadedFiles(uploadedFiles.map(file => 
        file.id === fileId ? { ...file, status: 'analyzed' } : file
      ));
      setIsAnalyzing(false);
      setSelectedFile(null);
    }, 3000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getFileIcon = (type: string) => {
    return type === 'image' ? <FileImage className="h-5 w-5" /> : <Mail className="h-5 w-5" />;
  };

  return (
    <section className={`pt-20 pb-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="h-8 w-8 text-cyan-500" />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Evidence Analysis
            </h1>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Upload screenshots, emails, or documents to analyze for potential scams and fraud
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-8 mb-8 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Upload Evidence
              </h2>
              
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:border-cyan-400 bg-gray-700/50' 
                  : 'border-gray-300 hover:border-cyan-400 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.txt,.eml"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="evidence-upload"
                  multiple
                />
                <label htmlFor="evidence-upload" className="cursor-pointer">
                  <Upload className={`h-16 w-16 mx-auto mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Upload Your Evidence
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Drag and drop files here or click to browse
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Supports: Images, PDFs, Documents, Email files (Max 10MB each)
                  </p>
                </label>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className={`rounded-2xl p-8 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}>
                <h2 className={`text-xl font-semibold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Uploaded Evidence
                </h2>
                
                <div className="space-y-4">
                  {uploadedFiles.map((file) => {
                    const analysis = analysisResults.find(r => r.fileId === file.id);
                    
                    return (
                      <div key={file.id} className={`p-6 rounded-xl border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              file.type === 'image' 
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                                : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                            }`}>
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {file.name}
                              </h3>
                              <p className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {file.size} • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {file.status === 'uploaded' && (
                              <button
                                onClick={() => analyzeFile(file.id)}
                                disabled={isAnalyzing && selectedFile === file.id}
                                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2"
                              >
                                {isAnalyzing && selectedFile === file.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Analyzing...</span>
                                  </>
                                ) : (
                                  <>
                                    <Scan className="h-4 w-4" />
                                    <span>Analyze</span>
                                  </>
                                )}
                              </button>
                            )}
                            
                            {file.status === 'analyzed' && analysis && (
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                getRiskColor(analysis.riskLevel)
                              }`}>
                                {analysis.riskLevel.toUpperCase()} RISK
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {analysis && (
                          <div className={`mt-4 p-4 rounded-lg ${
                            isDark ? 'bg-gray-600' : 'bg-white'
                          }`}>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className={`font-semibold mb-2 ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                  Threats Detected
                                </h4>
                                <ul className="space-y-1">
                                  {analysis.threats.map((threat: string, index: number) => (
                                    <li key={index} className={`text-sm flex items-center space-x-2 ${
                                      isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                      <span>{threat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className={`font-semibold mb-2 ${
                                  isDark ? 'text-white' : 'text-gray-900'
                                }`}>
                                  Recommendations
                                </h4>
                                <ul className="space-y-1">
                                  {analysis.recommendations.map((rec: string, index: number) => (
                                    <li key={index} className={`text-sm flex items-center space-x-2 ${
                                      isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Risk Score: <span className="font-semibold">{analysis.riskScore}/100</span>
                                  </span>
                                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Analyzed: {new Date(analysis.analysisDate).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <button className="p-2 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900 rounded-lg transition-colors">
                                    <Download className="h-4 w-4" />
                                  </button>
                                  <button className="p-2 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900 rounded-lg transition-colors">
                                    <Share2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analysis Stats */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Analysis Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Files Analyzed
                  </span>
                  <span className="text-cyan-500 font-semibold">
                    {analysisResults.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Threats Found
                  </span>
                  <span className="text-red-500 font-semibold">
                    {analysisResults.filter(r => r.riskLevel === 'high').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Safe Files
                  </span>
                  <span className="text-green-500 font-semibold">
                    {analysisResults.filter(r => r.riskLevel === 'low').length}
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
                  File Complaint
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
                  Share Analysis
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className={`rounded-2xl p-6 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Analysis Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-900' : 'bg-blue-50'
                }`}>
                  <p className={isDark ? 'text-blue-200' : 'text-blue-800'}>
                    Upload clear screenshots for better analysis accuracy
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-green-900' : 'bg-green-50'
                }`}>
                  <p className={isDark ? 'text-green-200' : 'text-green-800'}>
                    Include email headers when uploading suspicious emails
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-yellow-900' : 'bg-yellow-50'
                }`}>
                  <p className={isDark ? 'text-yellow-200' : 'text-yellow-800'}>
                    Multiple file formats supported for comprehensive analysis
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

export default EvidenceAnalysis;