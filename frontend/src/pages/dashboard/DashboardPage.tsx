import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { projectService, documentService } from '@/services';
import { Project, Document } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, LoadingSpinner, Alert } from '@/components/ui';
import { 
  FolderKanban, 
  FileText, 
  Users, 
  TrendingUp, 
  Plus,
  ArrowRight
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [projectsRes, documentsRes] = await Promise.all([
        projectService.getMyProjects(0, 6),
        documentService.getAll(0, 5),
      ]);
      setProjects(projectsRes.data);
      setRecentDocuments(documentsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your projects today.
        </p>
      </div>

      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FolderKanban className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Documents</p>
                <p className="text-2xl font-semibold text-gray-900">{recentDocuments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Team Members</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Activity</p>
                <p className="text-2xl font-semibold text-gray-900">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
          <Link
            to="/projects/new"
            className="btn btn-primary btn-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderKanban className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first project to start organizing your documents.
              </p>
              <Link to="/projects/new" className="btn btn-primary btn-md">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.projectId} to={`/projects/${project.projectId}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.projectName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Owner: {project.ownerName}</span>
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-4 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all projects
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}
      </div>

      {/* Recent documents section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Documents</h2>
          <Link
            to="/documents"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>

        {recentDocuments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No documents uploaded yet.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <div className="divide-y divide-gray-200">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.documentId}
                  to={`/documents/${doc.documentId}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center min-w-0">
                    <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.projectName} • {doc.uploadedByName}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className="text-xs text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
