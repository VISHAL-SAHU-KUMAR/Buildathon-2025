import React from 'react';
import { Shield, AlertTriangle, Eye, Lock, ArrowRight, Play } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section className={`pt-20 pb-16 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className={`absolute inset-0 animate-pulse rounded-full opacity-20 ${
                isDark ? 'bg-cyan-400' : 'bg-cyan-500'
              }`}></div>
              <Shield className="h-24 w-24 text-cyan-500 relative z-10" />
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Defend Against
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {' '}Deepfake Threats
            </span>
          </h1>
          
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Advanced AI-powered detection and comprehensive cybersecurity education to protect you from the evolving landscape of digital deception and synthetic media manipulation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Start Detection Scan</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className={`px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              isDark 
                ? 'text-cyan-400 hover:bg-cyan-400 hover:text-gray-900' 
                : 'text-cyan-600 hover:bg-cyan-500 hover:text-white'
            }`}>
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-xl hover:shadow-2xl`}>
              <Eye className="h-16 w-16 text-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200" />
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Real-time Detection
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Advanced AI algorithms analyze media content for deepfake signatures with 99.7% accuracy
              </p>
            </div>
          </div>
          
          <div className="text-center group">
            <div className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-xl hover:shadow-2xl`}>
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200" />
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Threat Intelligence
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Stay informed about emerging deepfake threats and attack vectors with real-time updates
              </p>
            </div>
          </div>
          
          <div className="text-center group">
            <div className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-xl hover:shadow-2xl`}>
              <Lock className="h-16 w-16 text-green-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200" />
              <h3 className={`text-xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Secure Education
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Comprehensive training to recognize and defend against synthetic media and cyber threats
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Trusted by security professionals worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className={`px-4 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Enterprise Grade
              </span>
            </div>
            <div className={`px-4 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                ISO Certified
              </span>
            </div>
            <div className={`px-4 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;