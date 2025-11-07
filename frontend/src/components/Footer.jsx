import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">GOS</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Gurukul Olympiad School</h3>
            <p className="text-gray-400 mb-4">
              Nurturing young minds for a brighter tomorrow through academic excellence and holistic development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-400 hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/campuses" className="text-gray-400 hover:text-white transition-colors">
                  Campuses
                </Link>
              </li>
              <li>
                <Link to="/life-at-gos" className="text-gray-400 hover:text-white transition-colors">
                  Life at GOS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Gurukul Olympiad School, Airport Road, Pune
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="text-gray-400">info@gurukulschool.net</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Gurukul Olympiad School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;