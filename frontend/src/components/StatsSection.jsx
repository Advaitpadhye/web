import React from 'react';
import { Trophy } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { label: 'Years of Excellence', value: '7+', icon: '🏆' },
    { label: 'Students', value: '6000+', icon: '👨‍🎓' },
    { label: 'Expert Faculty', value: '400+', icon: '👩‍🏫' },
    { label: 'Student-Teacher Ratio', value: '35:1', icon: '📊' },
    { label: 'Parent Satisfaction', value: '100%', icon: '💯' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;