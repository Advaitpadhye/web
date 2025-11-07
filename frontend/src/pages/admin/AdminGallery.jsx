import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
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

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminGallery = () => {
  const { getAuthHeader } = useAuth();
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'campus'
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setImages(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch gallery',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/gallery`, formData, {
        headers: getAuthHeader()
      });
      toast({
        title: 'Success',
        description: 'Image added successfully'
      });
      setFormData({ title: '', image_url: '', category: 'campus' });
      setDialogOpen(false);
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add image',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`${API}/gallery/${imageId}`, {
        headers: getAuthHeader()
      });
      toast({
        title: 'Success',
        description: 'Image deleted successfully'
      });
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive'
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-1">Manage school gallery images</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogDescription>Add a new image to the gallery</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Image title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
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
                    <option value="campus">Campus</option>
                    <option value="students">Students</option>
                    <option value="facilities">Facilities</option>
                    <option value="sports">Sports</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                  Add Image
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>{images.length} total images</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{image.title}</p>
                      <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No images in gallery</p>
                <Button
                  className="mt-4 bg-amber-500 hover:bg-amber-600"
                  onClick={() => setDialogOpen(true)}
                >
                  Add First Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
