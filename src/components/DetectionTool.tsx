import React, { useState } from 'react';
import { Upload, Scan, CheckCircle, AlertTriangle, FileImage, FileVideo } from 'lucide-react';

const DetectionTool: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'clean' | 'spam' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setScanResult(null);
    }
  };

  const handleScan = () => {
    if (!uploadedFile) return;
    
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(Math.random() > 0.5 ? 'spam' : 'clean');
      setIsScanning(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Email Spam Detection Tool</h2>
          <p className="text-gray-400">Upload a screenshot of an email to analyze for potential spam</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Upload Media File
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Supports images (Max 10MB)</p>
              </label>
            </div>
          </div>
          
          {uploadedFile && (
            <div className="mb-8">
              <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {uploadedFile.includes('.mp4') || uploadedFile.includes('.mov') ? (
                    <FileVideo className="h-6 w-6 text-blue-400" />
                  ) : (
                    <FileImage className="h-6 w-6 text-green-400" />
                  )}
                  <span className="text-white">{uploadedFile}</span>
                </div>
                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isScanning ? (
                    <div className="flex items-center space-x-2">
                      <Scan className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    'Scan for Spam'
                  )}
                </button>
              </div>
            </div>
          )}
          
          {isScanning && (
            <div className="mb-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Scan className="h-6 w-6 text-cyan-400 animate-spin" />
                  <span className="text-white font-semibold">Analyzing content...</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Running advanced AI detection algorithms...
                </div>
              </div>
            </div>
          )}
          
          {scanResult && (
            <div className="mb-8">
              <div className={`rounded-lg p-6 ${
                scanResult === 'clean' 
                  ? 'bg-green-900 border border-green-700' 
                  : 'bg-red-900 border border-red-700'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  {scanResult === 'clean' ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  )}
                  <span className={`font-semibold ${
                    scanResult === 'clean' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {scanResult === 'clean' ? 'Email Appears Safe' : 'Potential Spam Detected'}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  {scanResult === 'clean' 
                    ? 'Our analysis indicates this email is likely safe with no signs of spam.'
                    : 'Our analysis has detected potential signs of spam. Please be cautious with this email.'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Confidence Score:</span>
                    <span className={`ml-2 font-semibold ${
                      scanResult === 'clean' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {scanResult === 'clean' ? '95%' : '85%'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Analysis Time:</span>
                    <span className="ml-2 text-white">1.8 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetectionTool;