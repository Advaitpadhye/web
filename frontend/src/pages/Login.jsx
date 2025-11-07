import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Login = () => {
  const navigate = useNavigate();
  const { login, adminLogin } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  });

  const [adminForm, setAdminForm] = useState({
    email: '',
    password: ''
  });

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(userForm.email, userForm.password);
      toast({
        title: 'Login successful!',
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.detail || 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminLogin(adminForm.email, adminForm.password);
      toast({
        title: 'Admin login successful!',
        description: 'Welcome to admin panel',
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.detail || 'Invalid admin credentials',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">GOS</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>User Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="your@email.com"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="••••••••"
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-900 hover:underline font-medium">
                      Register here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Admin access only</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@gurukulschool.net"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={loading}>
                    {loading ? 'Signing in...' : 'Admin Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
