import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminAdmissions = () => {
  const { getAuthHeader } = useAuth();
  const { toast } = useToast();
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(`${API}/admissions`, {
        headers: getAuthHeader()
      });
      setAdmissions(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch admissions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (admissionId, status) => {
    try {
      await axios.put(
        `${API}/admissions/${admissionId}/status`,
        { status },
        { headers: getAuthHeader() }
      );
      toast({
        title: 'Success',
        description: `Application ${status} successfully`
      });
      fetchAdmissions();
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive'
      });
    }
  };

  const filteredAdmissions = admissions.filter(admission =>
    admission.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admission.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admission.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return styles[status] || styles.pending;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admissions Management</h1>
          <p className="text-gray-600 mt-1">Review and manage admission applications</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>{admissions.length} total applications</CardDescription>
              </div>
              <div className="w-72">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmissions.length > 0 ? (
                      filteredAdmissions.map((admission) => (
                        <TableRow key={admission.id}>
                          <TableCell className="font-medium">{admission.student_name}</TableCell>
                          <TableCell>{admission.parent_name}</TableCell>
                          <TableCell>{admission.email}</TableCell>
                          <TableCell>{admission.grade}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(admission.status)}`}>
                              {admission.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(admission.submitted_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAdmission(admission);
                                setDialogOpen(true);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>Review and manage this application</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Student Name</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.student_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Name</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.parent_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Grade</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.grade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.dob}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.address}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Previous School</label>
                  <p className="text-gray-900 font-medium">{selectedAdmission.previous_school || 'N/A'}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleStatusUpdate(selectedAdmission.id, 'approved')}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={selectedAdmission.status === 'approved'}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(selectedAdmission.id, 'rejected')}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  disabled={selectedAdmission.status === 'rejected'}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(selectedAdmission.id, 'pending')}
                  variant="outline"
                  className="flex-1"
                  disabled={selectedAdmission.status === 'pending'}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Pending
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAdmissions;
