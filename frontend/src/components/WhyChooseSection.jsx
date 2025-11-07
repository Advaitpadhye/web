import React from 'react';
import { Target, BookOpen, Users, Brain, Zap, UserCheck } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Target,
      title: 'Our Philosophy',
      description: 'Nurturing each child\'s unique potential through an integrated approach that blends academics with competitive edge and future readiness.',
      points: [
        'Personalized learning paths',
        'Future-ready curriculum',
        'Holistic development focus'
      ],
      color: 'text-red-500'
    },
    {
      icon: BookOpen,
      title: 'Smart Learning',
      description: 'Pioneering the SWitCh model that seamlessly integrates schooling with competitive exam preparation.',
      points: [
        'NCERT + CBSE + Competitive prep',
        'Early exposure to national exams',
        'Progressive assessment system'
      ],
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Seasoned educators from India\'s top coaching institutes, bringing excellence to every classroom.',
      points: [
        'Kota\'s finest educators',
        '1:1 mentorship',
        'Innovative teaching methods'
      ],
      color: 'text-amber-500'
    },
    {
      icon: Brain,
      title: 'Brain Power',
      description: 'Comprehensive development of cognitive and emotional intelligence for well-rounded growth.',
      points: [
        'EQ + IQ development',
        'Critical thinking focus',
        'Analytical skills training'
      ],
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      title: 'Beyond Classroom',
      description: 'Signature programs and activities that go beyond textbooks to shape confident individuals.',
      points: [
        'EduSports program',
        '30+ clubs & societies',
        'Leadership opportunities'
      ],
      color: 'text-orange-500'
    },
    {
      icon: UserCheck,
      title: 'Parents Club',
      description: 'We have established a Parents Club for regular interactions. This forum helps parents to understand their child better and promote positive parenting',
      points: [
        'Regular parent-teacher meets',
        'Workshop & seminar access',
        'Community support network'
      ],
      color: 'text-green-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Why Families Choose <span className="text-amber-500">GOS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${reason.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                  <ul className="space-y-2">
                    {reason.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;