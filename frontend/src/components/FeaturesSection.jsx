import React from 'react';
import { Trophy, Sprout, Microscope } from 'lucide-react';
import { Button } from './ui/button';

const FeaturesSection = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Proven Excellence',
      description: '7+ years of academic distinction and student success stories',
      color: 'text-amber-500'
    },
    {
      icon: Sprout,
      title: 'Holistic Growth',
      description: 'Balancing academics, sports, arts, and character development',
      color: 'text-green-500'
    },
    {
      icon: Microscope,
      title: 'Future-Ready',
      description: 'Cutting-edge facilities and innovative teaching methodologies',
      color: 'text-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Nurturing Future Leaders
            </h2>
            <p className="text-lg text-gray-600">
              Welcome to Gurukul Olympiad School, where academic excellence meets holistic development in a nurturing environment that inspires greatness.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${feature.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium">
                Our Story
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium">
                Explore Our Campuses
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop"
              alt="School Campus"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;