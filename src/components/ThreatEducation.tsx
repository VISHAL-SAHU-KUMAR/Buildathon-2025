import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Award, ArrowRight } from 'lucide-react';

const ThreatEducation: React.FC = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: 'Understanding Deepfakes',
      description: 'Learn about the technology behind deepfakes and how they are created.',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 2,
      title: 'Identifying Synthetic Media',
      description: 'Develop skills to spot deepfake content in images and videos.',
      duration: '20 min',
      difficulty: 'Intermediate',
      completed: true
    },
    {
      id: 3,
      title: 'Social Engineering Attacks',
      description: 'Understand how deepfakes are used in social engineering campaigns.',
      duration: '25 min',
      difficulty: 'Advanced',
      completed: false
    },
    {
      id: 4,
      title: 'Phishing Awareness',
      description: 'Recognize and avoid phishing scams in emails, texts, and social media.',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 5,
      title: 'Password Security',
      description: 'Best practices for creating and managing strong, unique passwords.',
      duration: '10 min',
      difficulty: 'Beginner',
      completed: true
    },
    {
      id: 6,
      title: 'Two-Factor Authentication (2FA)',
      description: 'Learn how to add an extra layer of security to your online accounts.',
      duration: '12 min',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: 7,
      title: 'Malware Protection',
      description: 'Protect your devices from viruses, ransomware, and other malicious software.',
      duration: '18 min',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: 8,
      title: 'Secure Wi-Fi Usage',
      description: 'Tips for safely connecting to public and private Wi-Fi networks.',
      duration: '10 min',
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 9,
      title: 'Data Privacy',
      description: 'Understand how to protect your personal information online and manage your digital footprint.',
      duration: '20 min',
      difficulty: 'Advanced',
      completed: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Cybersecurity Education</h2>
          <p className="text-gray-400">Comprehensive training modules to stay ahead of evolving threats</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate(`/education/${module.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-cyan-400" />
                {module.completed && (
                  <Award className="h-6 w-6 text-green-400" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
              <p className="text-gray-400 mb-4">{module.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">{module.duration}</span>
                  <span className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-cyan-400" />
              </div>
              
              {module.completed && (
                <div className="mt-4 bg-green-900 rounded-lg p-2 text-center">
                  <span className="text-green-400 text-sm font-semibold">Completed</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Interactive Learning Platform</h3>
            <p className="text-gray-400 mb-6">
              Experience hands-on training with simulated deepfake scenarios and real-world case studies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors duration-200 flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Interactive Demo</span>
              </button>
              <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-colors duration-200">
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatEducation;