import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Lightbulb, Search, Filter } from 'lucide-react';

const SecurityTips: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Tips', icon: Shield },
    { id: 'passwords', label: 'Passwords', icon: Lock },
    { id: 'phishing', label: 'Phishing', icon: Eye },
    { id: 'deepfakes', label: 'Deepfakes', icon: AlertTriangle },
    { id: 'general', label: 'General Security', icon: CheckCircle }
  ];

  const tips = [
    {
      id: 1,
      title: 'Create Strong, Unique Passwords',
      category: 'passwords',
      difficulty: 'Beginner',
      readTime: '3 min',
      summary: 'Learn how to create and manage secure passwords that protect your accounts.',
      content: `
        <h3>Why Strong Passwords Matter</h3>
        <p>Weak passwords are one of the most common entry points for cybercriminals. A strong password is your first line of defense.</p>
        
        <h3>Password Best Practices:</h3>
        <ul>
          <li>Use at least 12 characters</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Add numbers and special characters</li>
          <li>Avoid personal information</li>
          <li>Use unique passwords for each account</li>
        </ul>
        
        <h3>Password Manager Benefits:</h3>
        <p>Consider using a password manager to generate and store unique passwords for all your accounts. Popular options include:</p>
        <ul>
          <li>1Password</li>
          <li>LastPass</li>
          <li>Bitwarden</li>
          <li>Dashlane</li>
        </ul>
      `,
      tags: ['passwords', 'security', 'authentication']
    },
    {
      id: 2,
      title: 'Identify Phishing Emails',
      category: 'phishing',
      difficulty: 'Intermediate',
      readTime: '5 min',
      summary: 'Recognize the warning signs of phishing attempts and protect yourself from email scams.',
      content: `
        <h3>Common Phishing Red Flags:</h3>
        <ul>
          <li>Urgent or threatening language</li>
          <li>Generic greetings ("Dear Customer")</li>
          <li>Suspicious sender addresses</li>
          <li>Unexpected attachments or links</li>
          <li>Requests for personal information</li>
        </ul>
        
        <h3>How to Verify Suspicious Emails:</h3>
        <ol>
          <li>Check the sender's email address carefully</li>
          <li>Hover over links without clicking</li>
          <li>Contact the organization directly</li>
          <li>Look for spelling and grammar errors</li>
        </ol>
        
        <h3>What to Do if You Suspect Phishing:</h3>
        <p>Never click suspicious links or download attachments. Report the email to your IT department or email provider.</p>
      `,
      tags: ['phishing', 'email', 'social-engineering']
    },
    {
      id: 3,
      title: 'Spot Deepfake Videos',
      category: 'deepfakes',
      difficulty: 'Advanced',
      readTime: '7 min',
      summary: 'Learn to identify synthetic media and deepfake content in videos and images.',
      content: `
        <h3>Visual Indicators of Deepfakes:</h3>
        <ul>
          <li>Unnatural eye movements or blinking patterns</li>
          <li>Inconsistent lighting or shadows</li>
          <li>Blurry or pixelated areas around the face</li>
          <li>Audio-visual synchronization issues</li>
          <li>Unusual facial expressions or movements</li>
        </ul>
        
        <h3>Technical Detection Methods:</h3>
        <p>Use specialized tools and techniques:</p>
        <ul>
          <li>Frame-by-frame analysis</li>
          <li>Reverse image searches</li>
          <li>AI detection tools</li>
          <li>Metadata examination</li>
        </ul>
        
        <h3>Best Practices:</h3>
        <ol>
          <li>Verify sources of suspicious content</li>
          <li>Cross-reference with reliable news sources</li>
          <li>Use our deepfake detection tool</li>
          <li>Report suspected deepfakes</li>
        </ol>
      `,
      tags: ['deepfakes', 'ai', 'media-verification']
    },
    {
      id: 4,
      title: 'Enable Two-Factor Authentication',
      category: 'general',
      difficulty: 'Beginner',
      readTime: '4 min',
      summary: 'Add an extra layer of security to your accounts with two-factor authentication.',
      content: `
        <h3>What is Two-Factor Authentication (2FA)?</h3>
        <p>2FA requires two different authentication factors to verify your identity, making your accounts much more secure.</p>
        
        <h3>Types of 2FA:</h3>
        <ul>
          <li><strong>SMS codes:</strong> Text messages with verification codes</li>
          <li><strong>Authenticator apps:</strong> Google Authenticator, Authy, Microsoft Authenticator</li>
          <li><strong>Hardware tokens:</strong> Physical devices like YubiKey</li>
          <li><strong>Biometrics:</strong> Fingerprint or facial recognition</li>
        </ul>
        
        <h3>How to Enable 2FA:</h3>
        <ol>
          <li>Go to your account security settings</li>
          <li>Look for "Two-Factor Authentication" or "2FA"</li>
          <li>Choose your preferred method</li>
          <li>Follow the setup instructions</li>
          <li>Save backup codes in a secure location</li>
        </ol>
      `,
      tags: ['2fa', 'authentication', 'account-security']
    },
    {
      id: 5,
      title: 'Secure Your Home Wi-Fi Network',
      category: 'general',
      difficulty: 'Intermediate',
      readTime: '6 min',
      summary: 'Protect your home network from unauthorized access and cyber threats.',
      content: `
        <h3>Router Security Checklist:</h3>
        <ul>
          <li>Change default admin credentials</li>
          <li>Use WPA3 encryption (or WPA2 if WPA3 unavailable)</li>
          <li>Create a strong Wi-Fi password</li>
          <li>Disable WPS (Wi-Fi Protected Setup)</li>
          <li>Enable firewall protection</li>
          <li>Keep firmware updated</li>
        </ul>
        
        <h3>Network Monitoring:</h3>
        <p>Regularly check connected devices and monitor for:</p>
        <ul>
          <li>Unknown devices on your network</li>
          <li>Unusual data usage patterns</li>
          <li>Slow internet speeds</li>
          <li>Unexpected network activity</li>
        </ul>
        
        <h3>Guest Network Setup:</h3>
        <p>Create a separate guest network to isolate visitor devices from your main network and smart home devices.</p>
      `,
      tags: ['wifi', 'network-security', 'router']
    },
    {
      id: 6,
      title: 'Social Media Privacy Settings',
      category: 'general',
      difficulty: 'Beginner',
      readTime: '5 min',
      summary: 'Configure your social media accounts to protect your personal information.',
      content: `
        <h3>Essential Privacy Settings:</h3>
        <ul>
          <li>Make your profile private</li>
          <li>Limit who can see your posts</li>
          <li>Disable location tracking</li>
          <li>Review tagged photos before they appear</li>
          <li>Limit friend/follower requests</li>
        </ul>
        
        <h3>Information to Keep Private:</h3>
        <ul>
          <li>Full birth date</li>
          <li>Phone numbers</li>
          <li>Home address</li>
          <li>Workplace details</li>
          <li>Travel plans</li>
          <li>Financial information</li>
        </ul>
        
        <h3>Regular Security Maintenance:</h3>
        <ol>
          <li>Review and update privacy settings quarterly</li>
          <li>Remove unused apps and permissions</li>
          <li>Check login activity regularly</li>
          <li>Be cautious about third-party app connections</li>
        </ol>
      `,
      tags: ['social-media', 'privacy', 'personal-information']
    }
  ];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-900';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900';
      case 'Advanced': return 'text-red-400 bg-red-900';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lightbulb className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Cybersecurity Tips & Best Practices</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay protected with our comprehensive guide to cybersecurity. Learn practical tips to defend against cyber threats.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search security tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tips List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {filteredTips.map((tip) => (
                <div
                  key={tip.id}
                  className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
                    selectedTip === tip.id ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{tip.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                        {tip.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm">{tip.readTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{tip.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {tip.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      {selectedTip === tip.id ? 'Hide Details' : 'Read More'}
                    </button>
                  </div>
                  
                  {selectedTip === tip.id && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: tip.content }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredTips.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No tips found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Security Check</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                  Scan for Threats
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Check Password Strength
                </button>
                <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Report Security Issue
                </button>
              </div>
            </div>

            {/* Security Score */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Security Score</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">85/100</div>
                <p className="text-gray-400 text-sm mb-4">Good security posture</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">2FA Enabled</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Strong Passwords</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Regular Updates</span>
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Latest Threats */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Latest Threat Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-900 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">High Priority</span>
                  </div>
                  <p className="text-white text-sm">New phishing campaign targeting banking customers</p>
                </div>
                <div className="p-3 bg-yellow-900 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">Medium Priority</span>
                  </div>
                  <p className="text-white text-sm">Deepfake videos spreading on social media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityTips;