import React from 'react';
import { Card, CardContent } from './ui/card';

const LeadershipSection = () => {
  const leaders = [
    {
      name: 'Dr. Satish Tambat',
      title: 'Chief Mentor & Principal',
      subtitle: '(Expert Career Counsellor)',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      message: '"Each new day presents fresh challenges, and as the future approaches us at breakneck speed, we must face it with courage and determination. It is with great pleasure that I welcome you to Gurukul Olympiad School, an institution that is progressive and dedicated to delivering quality education while upholding the esteemed values and traditions of the Gurukul system."'
    },
    {
      name: 'Mr. Ganesh Salunke',
      title: 'Expert Mentor',
      subtitle: '(Career Counsellor)',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      message: '"In every society, a school stands as the cornerstone of an individual\'s journey to intellectual and personal growth. It isn\'t just an institution; it\'s a sanctuary where both the emotional and intellectual dimensions of a young mind are cultivated and nurtured. Here, the process of learning is not restricted to academics alone."'
    },
    {
      name: 'Ms. Rakshanda Tambat',
      title: 'Cultural Executive',
      subtitle: '(Author, Counsellor, Teacher\'s Trainer)',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      message: '"Welcome to the Gurukul family – an institution that consistently shines as a paragon of commitment, resilience, and unparalleled excellence. At Gurukul, we don\'t just see a cohort of students; we see a tapestry of individual threads, each with its own texture and color. We deeply believe that every child is distinct."'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Message from Our Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-amber-500"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-blue-900 font-semibold">{leader.title}</p>
                  <p className="text-sm text-gray-600">{leader.subtitle}</p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  {leader.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;