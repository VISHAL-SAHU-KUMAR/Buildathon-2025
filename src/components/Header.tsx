import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, FileText, HelpCircle, Camera, BarChart3, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  isAuthenticated: boolean;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  user, 
  onAuthClick, 
  onLogout 
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'detection', label: 'Detection Tool', path: '/detection' },
    { id: 'education', label: 'Education', path: '/education' },
    { id: 'resources', label: 'Resources', path: '/resources' },
    { id: 'tips', label: 'Security Tips', path: '/tips' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const userMenuItems = [
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'evidence', label: 'Evidence Analysis', icon: Camera, path: '/evidence' },
    { id: 'complaint', label: 'File Complaint', icon: FileText, path: '/complaint' },
    { id: 'tracking', label: 'Track Complaints', icon: BarChart3, path: '/tracking' },
    { id: 'tips', label: 'Security Tips', icon: HelpCircle, path: '/tips' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-800' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              CyberShield
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-cyan-500 border-b-2 border-cyan-500'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle & User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'User'}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setShowUserMenu(false)}
                        className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors first:rounded-t-lg ${isDark 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />
                    <button
                      onClick={onLogout}
                      className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors rounded-b-lg ${
                        isDark 
                          ? 'text-red-400 hover:bg-gray-700' 
                          : 'text-red-600 hover:bg-gray-50'
                      }`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-cyan-500 bg-cyan-50 dark:bg-gray-800'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
            
            {isAuthenticated ? (
              <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-600 hover:bg-gray-50'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;