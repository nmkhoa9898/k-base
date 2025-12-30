import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, DatabaseOverview, DatabaseStats } from '@/services/adminService';
import { useAuth } from '@/contexts';
import { Card, CardHeader, CardTitle, CardContent, LoadingSpinner, Alert, Button } from '@/components/ui';
import { formatFileSize, formatDate } from '@/utils';
import { 
  Database, 
  Users, 
  FolderKanban, 
  FileText, 
  UserCheck, 
  RefreshCw,
  Shield
} from 'lucide-react';

type TabType = 'overview' | 'users' | 'projects' | 'documents' | 'memberships';

const DatabasePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<DatabaseOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const overview = await adminService.getDatabaseOverview();
      setData(overview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load database overview');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert variant="error">
          Access denied. Admin privileges required.
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
        <Button onClick={fetchData}>Retry</Button>
      </div>
    );
  }

  if (!data) return null;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <Database className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" />, count: data.users.length },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" />, count: data.projects.length },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" />, count: data.documents.length },
    { id: 'memberships', label: 'Memberships', icon: <UserCheck className="w-4 h-4" />, count: data.projectMembers.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Database Overview</h1>
            <p className="text-sm text-gray-500">Admin-only view of all system data</p>
          </div>
        </div>
        <Button onClick={fetchData} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab stats={data.stats} />}
      {activeTab === 'users' && <UsersTable users={data.users} formatDate={formatDate} />}
      {activeTab === 'projects' && <ProjectsTable projects={data.projects} formatDate={formatDate} />}
      {activeTab === 'documents' && <DocumentsTable documents={data.documents} formatDate={formatDate} formatFileSize={formatFileSize} />}
      {activeTab === 'memberships' && <MembershipsTable memberships={data.projectMembers} formatDate={formatDate} />}
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ stats: DatabaseStats }> = ({ stats }) => {
  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, active: stats.activeUsers, icon: <Users className="w-6 h-6" />, color: 'blue' },
    { label: 'Total Projects', value: stats.totalProjects, active: stats.activeProjects, icon: <FolderKanban className="w-6 h-6" />, color: 'green' },
    { label: 'Total Documents', value: stats.totalDocuments, active: stats.activeDocuments, icon: <FileText className="w-6 h-6" />, color: 'purple' },
    { label: 'Total Memberships', value: stats.totalMemberships, icon: <UserCheck className="w-6 h-6" />, color: 'orange' },
  ];

  const colorClasses: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const colors = colorClasses[stat.color];
        return (
          <Card key={index} className={colors.bg}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold ${colors.text}`}>{stat.value}</p>
                  {stat.active !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.active} active / {stat.value - stat.active} inactive
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${colors.iconBg} ${colors.text}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// Users Table Component
const UsersTable: React.FC<{ users: DatabaseOverview['users']; formatDate: (d: string) => string }> = ({ users, formatDate }) => (
  <Card>
    <CardHeader>
      <CardTitle>All Users ({users.length})</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{user.userId}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.fullName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'OWNER' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// Projects Table Component
const ProjectsTable: React.FC<{ projects: DatabaseOverview['projects']; formatDate: (d: string) => string }> = ({ projects, formatDate }) => (
  <Card>
    <CardHeader>
      <CardTitle>All Projects ({projects.length})</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.projectId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{project.projectId}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{project.projectName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div>
                    <p className="font-medium text-gray-900">{project.ownerName}</p>
                    <p className="text-xs text-gray-400">{project.ownerEmail}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.memberCount}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.documentCount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {project.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(project.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// Documents Table Component
const DocumentsTable: React.FC<{ 
  documents: DatabaseOverview['documents']; 
  formatDate: (d: string) => string;
  formatFileSize: (b: number) => string;
}> = ({ documents, formatDate, formatFileSize }) => (
  <Card>
    <CardHeader>
      <CardTitle>All Documents ({documents.length})</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded By</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.documentId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{doc.documentId}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium max-w-xs truncate">{doc.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{doc.projectName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{doc.uploadedByName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div>
                    <p className="truncate max-w-xs">{doc.fileName}</p>
                    <p className="text-xs text-gray-400">{doc.mimeType}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatFileSize(doc.fileSize)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doc.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {doc.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(doc.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// Memberships Table Component
const MembershipsTable: React.FC<{ memberships: DatabaseOverview['projectMembers']; formatDate: (d: string) => string }> = ({ memberships, formatDate }) => (
  <Card>
    <CardHeader>
      <CardTitle>All Project Memberships ({memberships.length})</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {memberships.map((membership, idx) => (
              <tr key={`${membership.projectId}-${membership.userId}-${idx}`} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{membership.projectId}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{membership.userId}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div>
                    <p className="font-medium text-gray-900">{membership.userFullName}</p>
                    <p className="text-xs text-gray-400">{membership.userEmail}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    membership.role === 'OWNER' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {membership.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    membership.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {membership.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(membership.joinedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default DatabasePage;
