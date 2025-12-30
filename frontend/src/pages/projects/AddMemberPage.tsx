import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService, userService } from '@/services';
import { User, Project } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, Button, Alert, LoadingSpinner } from '@/components/ui';
import { UserPlus, ArrowLeft, Search } from 'lucide-react';

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [existingMemberIds, setExistingMemberIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const [projectData, membersData, usersData] = await Promise.all([
        projectService.getById(Number(id)),
        projectService.getMembers(Number(id)),
        userService.getAll(0, 100),
      ]);

      setProject(projectData);
      setExistingMemberIds(new Set(membersData.map(m => m.userId)));
      setUsers(usersData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!id || !selectedUserId) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await projectService.addMember(Number(id), { userId: selectedUserId });
      setSuccess('Member added successfully!');
      setSelectedUserId(null);
      // Refresh the members list
      const membersData = await projectService.getMembers(Number(id));
      setExistingMemberIds(new Set(membersData.map(m => m.userId)));
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate(`/projects/${id}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add member');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter users who are not already members
  const availableUsers = users.filter(user => 
    !existingMemberIds.has(user.userId) &&
    user.isActive &&
    (searchQuery === '' || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <Alert variant="error">Project not found</Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(`/projects/${id}`)}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Member</h1>
          <p className="text-sm text-gray-500">
            Add a new member to <span className="font-medium">{project.projectName}</span>
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          {success}
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Select User to Add
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* User list */}
          <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
            {availableUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? 'No users found matching your search' : 'No available users to add'}
              </div>
            ) : (
              availableUsers.map((user) => (
                <div
                  key={user.userId}
                  onClick={() => setSelectedUserId(user.userId)}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                    selectedUserId === user.userId
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'OWNER' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                    {selectedUserId === user.userId && (
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/${id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={!selectedUserId || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMemberPage;
