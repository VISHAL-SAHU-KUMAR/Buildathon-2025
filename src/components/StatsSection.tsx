import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Shield, AlertCircle } from 'lucide-react';

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({
    threatsDetected: 0,
    usersProtected: 0,
    accuracyRate: 0,
    alertsIssued: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        threatsDetected: Math.min(prev.threatsDetected + Math.floor(Math.random() * 3), 24567),
        usersProtected: Math.min(prev.usersProtected + Math.floor(Math.random() * 5), 156789),
        accuracyRate: Math.min(prev.accuracyRate + 0.1, 99.7),
        alertsIssued: Math.min(prev.alertsIssued + Math.floor(Math.random() * 2), 8934)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Shield,
      label: 'Threats Detected',
      value: stats.threatsDetected.toLocaleString(),
      color: 'text-cyan-400'
    },
    {
      icon: Users,
      label: 'Users Protected',
      value: stats.usersProtected.toLocaleString(),
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      label: 'Accuracy Rate',
      value: `${stats.accuracyRate.toFixed(1)}%`,
      color: 'text-blue-400'
    },
    {
      icon: AlertCircle,
      label: 'Alerts Issued',
      value: stats.alertsIssued.toLocaleString(),
      color: 'text-yellow-400'
    }
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Real-time Protection Stats</h2>
          <p className="text-gray-400">Live data from our global threat detection network</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200">
                <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-4`} />
                <div className={`text-2xl font-bold ${item.color} mb-2`}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;