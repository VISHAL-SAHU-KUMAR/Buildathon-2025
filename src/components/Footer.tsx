import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-cyan-500" />
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                CyberShield
              </span>
            </div>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Advanced cybersecurity solutions protecting against deepfakes and digital threats worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`transition-colors ${
                isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-500'
              }`}>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Deepfake Detection
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Evidence Analysis
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Threat Intelligence
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Security Training
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/security-tips" className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-500'
                }`}>
                  Security Tips
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cyan-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  support@cybershield.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyan-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyan-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            © 2024 CyberShield. All rights reserved. Protecting digital integrity worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;