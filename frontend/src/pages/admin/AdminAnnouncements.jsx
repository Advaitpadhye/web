import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Trash2, Plus, Edit, Bell } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Switch } from '../../components/ui/switch';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminAnnouncements = () => {
  const { getAuthHeader } = useAuth();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    is_active: true
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch announcements',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${API}/announcements/${selectedId}`, formData, {
          headers: getAuthHeader()
        });
        toast({
          title: 'Success',
          description: 'Announcement updated successfully'
        });
      } else {
        await axios.post(`${API}/announcements`, formData, {
          headers: getAuthHeader()
        });
        toast({
          title: 'Success',
          description: 'Announcement created successfully'
        });
      }
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save announcement',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      is_active: announcement.is_active
    });
    setSelectedId(announcement.id);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleDelete = async (announcementId) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await axios.delete(`${API}/announcements/${announcementId}`, {
        headers: getAuthHeader()
      });
      toast({
        title: 'Success',
        description: 'Announcement deleted successfully'
      });
      fetchAnnouncements();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete announcement',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general',
      is_active: true
    });
    setSelectedId(null);
    setEditMode(false);
    setDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">Manage school announcements</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? 'Edit Announcement' : 'Create New Announcement'}
                </DialogTitle>
                <DialogDescription>
                  {editMode ? 'Update announcement details' : 'Add a new announcement'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Announcement title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Announcement content"
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="admissions">Admissions</option>
                    <option value="events">Events</option>
                    <option value="achievements">Achievements</option>
                    <option value="holidays">Holidays</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                  {editMode ? 'Update' : 'Create'} Announcement
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Announcements</CardTitle>
            <CardDescription>{announcements.length} total announcements</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Bell className="w-4 h-4 text-amber-500" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {announcement.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            announcement.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {announcement.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{announcement.content}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {announcement.category}
                          </span>
                          <span>
                            {new Date(announcement.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(announcement)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(announcement.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No announcements yet</p>
                <Button
                  className="mt-4 bg-amber-500 hover:bg-amber-600"
                  onClick={() => setDialogOpen(true)}
                >
                  Create First Announcement
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncements;
