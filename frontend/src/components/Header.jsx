import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GOS</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium border-b-2 border-blue-900 pb-1">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-900 font-medium">
              About
            </Link>
            <Link to="/life-at-gos" className="text-gray-700 hover:text-blue-900 font-medium">
              Life at GOS
            </Link>
            <Link to="/campuses" className="text-gray-700 hover:text-blue-900 font-medium">
              Campuses
            </Link>
            <Link to="/admissions" className="text-gray-700 hover:text-blue-900 font-medium">
              Admissions
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="text-gray-700 hover:text-blue-900 font-medium flex items-center gap-1"
              >
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              {isMoreOpen && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                  <Link to="/gallery" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Gallery
                  </Link>
                  <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium gap-2">
                <User className="w-4 h-4" />
                {user?.name}
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;