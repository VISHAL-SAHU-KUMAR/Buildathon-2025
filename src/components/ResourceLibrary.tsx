import React, { useState } from 'react';
import { Download, FileText, Video, ExternalLink, Search, FileImage } from 'lucide-react';

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Deepfake Detection Guide 2024',
      type: 'PDF',
      category: 'guide',
      description: 'Comprehensive guide to identifying and preventing deepfake attacks',
      downloads: 1234,
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'Cybersecurity Best Practices',
      type: 'Video',
      category: 'training',
      description: 'Video series covering essential cybersecurity practices',
      downloads: 856,
      size: '45 min'
    },
    {
      id: 3,
      title: 'Threat Intelligence Report',
      type: 'PDF',
      category: 'report',
      description: 'Latest threat intelligence and attack vectors analysis',
      downloads: 567,
      size: '1.8 MB'
    },
    {
      id: 4,
      title: 'AI Security Framework',
      type: 'Document',
      category: 'framework',
      description: 'Implementation framework for AI security in organizations',
      downloads: 432,
      size: '3.1 MB'
    },
    {
      id: 5,
      title: 'The Anatomy of a Phishing Scam',
      type: 'Infographic',
      category: 'infographic',
      description: 'A visual guide to understanding and identifying common phishing attacks.',
      downloads: 2500,
      size: '1.5 MB'
    },
    {
      id: 6,
      title: 'Ransomware Trends in 2024',
      type: 'Whitepaper',
      category: 'report',
      description: 'In-depth analysis of the latest ransomware strains and attack vectors.',
      downloads: 980,
      size: '4.2 MB'
    },
    {
      id: 7,
      title: 'Home Network Security Checklist',
      type: 'PDF',
      category: 'guide',
      description: 'A step-by-step checklist to secure your home Wi-Fi and connected devices.',
      downloads: 3120,
      size: '0.8 MB'
    },
    {
      id: 8,
      title: 'Webinar: Protecting Your Digital Privacy',
      type: 'Video',
      category: 'training',
      description: 'A recording of our expert panel discussing data privacy and protection strategies.',
      downloads: 1500,
      size: '62 min'
    },
    {
      id: 9,
      title: 'NIST Cybersecurity Framework',
      type: 'External Link',
      category: 'framework',
      description: 'Official link to the National Institute of Standards and Technology (NIST) Cybersecurity Framework.',
      downloads: 750,
      size: 'N/A'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'guide', label: 'Guides' },
    { id: 'training', label: 'Training' },
    { id: 'report', label: 'Reports' },
    { id: 'framework', label: 'Frameworks' },
    { id: 'infographic', label: 'Infographics' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="h-5 w-5" />;
      case 'PDF': return <FileText className="h-5 w-5" />;
      case 'Infographic': return <FileImage className="h-5 w-5" />;
      case 'Whitepaper': return <FileText className="h-5 w-5" />;
      case 'External Link': return <ExternalLink className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Resource Library</h2>
          <p className="text-gray-400">Download guides, reports, and tools to enhance your cybersecurity knowledge</p>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-cyan-400">
                  {getTypeIcon(resource.type)}
                  <span className="text-sm font-medium">{resource.type}</span>
                </div>
                <span className="text-xs text-gray-400">{resource.size}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-400 mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Download className="h-4 w-4" />
                  <span>{resource.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700 transition-colors duration-200">
                    Download
                  </button>
                  <button className="px-3 py-1 border border-gray-600 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourceLibrary;