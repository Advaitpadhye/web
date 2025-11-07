import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to Gurukul Olympiad School
            </h1>
            <p className="text-xl text-gray-600">
              Nurturing young minds for a brighter tomorrow
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-md font-medium transition-all duration-300 hover:scale-105">
              Join Us Today
            </Button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=700&fit=crop"
              alt="Student"
              className="w-full max-w-md h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;