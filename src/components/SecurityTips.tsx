import React from 'react';
import { Link } from 'react-router-dom';

const tips = [
  {
    id: 'strong-passwords',
    title: 'Use Strong Passwords',
    description: 'Create complex passwords that are difficult to guess. Use a combination of uppercase and lowercase letters, numbers, and symbols.',
    color: 'bg-blue-100',
  },
  {
    id: 'two-factor-authentication',
    title: 'Enable Two-Factor Authentication',
    description: 'Add an extra layer of security to your accounts by enabling two-factor authentication (2FA). This requires a second form of verification.',
    color: 'bg-green-100',
  },
  {
    id: 'phishing-scams',
    title: 'Beware of Phishing Scams',
    description: 'Be cautious of emails, messages, or websites that ask for your personal information. Phishing scams often impersonate legitimate companies.',
    color: 'bg-yellow-100',
  },
  {
    id: 'keep-software-updated',
    title: 'Keep Your Software Updated',
    description: 'Regularly update your operating system, web browser, and other software. Updates often include security patches that protect you from threats.',
    color: 'bg-purple-100',
  },
  {
    id: 'secure-wifi-network',
    title: 'Secure Your Wi-Fi Network',
    description: 'Protect your home Wi-Fi network with a strong password and use WPA3 or WPA2 encryption. Avoid using public Wi-Fi for sensitive transactions.',
    color: 'bg-pink-100',
  },
  {
    id: 'back-up-data',
    title: 'Back Up Your Data',
    description: 'Regularly back up your important files to an external hard drive or cloud storage. This will help you recover your data in case of a disaster.',
    color: 'bg-indigo-100',
  },
  {
    id: 'use-a-vpn',
    title: 'Use a VPN',
    description: 'A VPN encrypts your internet traffic, protecting your online privacy and security, especially when using public Wi-Fi networks.',
    color: 'bg-red-100',
  },
  {
    id: 'manage-social-media-privacy',
    title: 'Manage Social Media Privacy',
    description: 'Regularly review and adjust the privacy settings on your social media accounts to control who can see your personal information.',
    color: 'bg-teal-100',
  },
];

const SecurityTips: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Cybersecurity Tips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip) => (
            <div key={tip.id} className={`${tip.color} p-6 rounded-lg shadow-md flex flex-col`}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{tip.title}</h2>
              <p className="text-gray-700 mb-4 flex-grow">{tip.description}</p>
              <Link to={`/security-tips/${tip.id}`} className="text-blue-600 hover:underline font-semibold mt-auto">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTips;
