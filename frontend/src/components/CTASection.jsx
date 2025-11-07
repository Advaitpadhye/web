import React from 'react';
import { Button } from './ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Begin Your Child's Journey with Gurukul Olympiad School
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join our community of learners and innovators today
        </p>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-md font-medium transition-all duration-300 hover:scale-105">
          Apply Now
        </Button>
      </div>
    </section>
  );
};

export default CTASection;