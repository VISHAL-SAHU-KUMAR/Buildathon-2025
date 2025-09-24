import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import DetectionTool from './components/DetectionTool';
import ThreatEducation from './components/ThreatEducation';
import ResourceLibrary from './components/ResourceLibrary';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuthModal from './components/auth/AuthModal';
import UserProfile from './components/user/UserProfile';
import ComplaintForm from './components/user/ComplaintForm';
import SecurityTips from './components/SecurityTips';
import EvidenceAnalysis from './components/user/EvidenceAnalysis';
import ComplaintTracking from './components/user/ComplaintTracking';
import ModuleDetail from './components/ModuleDetail';
import SecurityTipDetail from './components/SecurityTipDetail';

function App() {
  const { isDark } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot' | 'verify'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleAuth = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header 
        isAuthenticated={isAuthenticated}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <StatsSection />
            <DetectionTool />
            <ThreatEducation />
          </>
        } />
        <Route path="/detection" element={<DetectionTool />} />
        <Route path="/education" element={<ThreatEducation />} />
        <Route path="/education/:moduleId" element={<ModuleDetail />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/profile" element={isAuthenticated ? <UserProfile user={user} setUser={setUser} /> : <></>} />
        <Route path="/complaint" element={isAuthenticated ? <ComplaintForm user={user} /> : <></>} />
        <Route path="/evidence" element={isAuthenticated ? <EvidenceAnalysis user={user} /> : <></>} />
        <Route path="/tracking" element={isAuthenticated ? <ComplaintTracking user={user} /> : <></>} />
                <Route path="/tips" element={<SecurityTips />} />
                <Route path="/security-tips" element={<SecurityTips />} />
        <Route path="/security-tips/:tipId" element={<SecurityTipDetail />} />
      </Routes>
      
      <Footer />
      
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />
      )}
    </div>
  );
}

export default App;