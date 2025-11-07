import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, FileText, Mail, Image, TrendingUp, Clock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { getAuthHeader } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`, {
        headers: getAuthHeader()
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Registered users'
    },
    {
      title: 'Admissions',
      value: stats?.total_admissions || 0,
      icon: FileText,
      color: 'bg-green-500',
      description: `${stats?.pending_admissions || 0} pending`
    },
    {
      title: 'Contact Messages',
      value: stats?.total_contacts || 0,
      icon: Mail,
      color: 'bg-purple-500',
      description: 'Total inquiries'
    },
    {
      title: 'Gallery Images',
      value: stats?.total_gallery || 0,
      icon: Image,
      color: 'bg-pink-500',
      description: 'Total images'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* School Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                School Statistics
              </CardTitle>
              <CardDescription>Overall performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Students</span>
                  <span className="text-2xl font-bold text-blue-900">{stats?.stats?.students}+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Faculty Members</span>
                  <span className="text-2xl font-bold text-green-900">{stats?.stats?.faculty}+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Student-Teacher Ratio</span>
                  <span className="text-2xl font-bold text-purple-900">{stats?.stats?.ratio}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Years of Excellence</span>
                  <span className="text-2xl font-bold text-amber-900">{stats?.stats?.years}+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Parent Satisfaction</span>
                  <span className="text-2xl font-bold text-pink-900">{stats?.stats?.satisfaction}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">System Active</p>
                    <p className="text-sm text-gray-600">All services running normally</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Database Connected</p>
                    <p className="text-sm text-gray-600">MongoDB operational</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pending Reviews</p>
                    <p className="text-sm text-gray-600">{stats?.pending_admissions || 0} admission applications awaiting review</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
