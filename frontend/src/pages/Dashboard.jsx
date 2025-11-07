import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { LogOut, User, Bell, FileText } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Dashboard = () => {
  const { user, logout, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">GOS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/admissions">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Apply for Admission
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Contact School
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full justify-start">
                  View Website
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>School Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-bold text-blue-900">6000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Faculty</span>
                  <span className="font-bold text-blue-900">400+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years</span>
                  <span className="font-bold text-blue-900">7+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Latest Announcements
            </CardTitle>
            <CardDescription>Stay updated with school news</CardDescription>
          </CardHeader>
          <CardContent>
            {announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-1">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                    <span className="text-xs text-blue-900 font-medium">{announcement.category}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No announcements available</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
