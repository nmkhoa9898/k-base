import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectService, documentService } from '@/services';
import { Project, Document, ProjectMember } from '@/types';
import { useAuth } from '@/contexts';
import { 
  Card, CardContent, 
  Button, LoadingSpinner, Alert, Modal 
} from '@/components/ui';
import { 
  FileText, Users, Settings, Plus, Upload, 
  Trash2, ArrowLeft
} from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [activeTab, setActiveTab] = useState<'documents' | 'members'>('documents');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setIsLoading(true);
      const [projectData, docsData, membersData] = await Promise.all([
        projectService.getById(Number(id)),
        documentService.getByProject(Number(id), 0, 20),
        projectService.getMembers(Number(id)),
      ]);
      setProject(projectData);
      setDocuments(docsData.data);
      setMembers(membersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      await projectService.delete(Number(id));
      navigate('/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const isOwner = project && user && project.ownerId === user.userId;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Project not found</h2>
        <Link to="/projects" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/projects"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to projects
      </Link>

      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Project header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
          <p className="mt-1 text-gray-600">{project.description || 'No description'}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <span>Owner: {project.ownerName}</span>
            <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Link to={`/projects/${id}/settings`}>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Documents ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Members ({members.length})
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Link to={`/projects/${id}/upload`}>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </Link>
          </div>

          {documents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                <p className="text-gray-500 mb-4">
                  Upload your first document to this project.
                </p>
                <Link to={`/projects/${id}/upload`}>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-gray-200">
                {documents.map((doc) => (
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
                          {doc.fileType} • {(doc.fileSize / 1024).toFixed(1)} KB • {doc.uploadedByName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-4">
          {isOwner && (
            <div className="flex justify-end">
              <Link to={`/projects/${id}/members/add`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </Link>
            </div>
          )}

          <Card>
            <div className="divide-y divide-gray-200">
              {members.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {member.userFullName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {member.userFullName}
                      </p>
                      <p className="text-xs text-gray-500">{member.userEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.role === 'OWNER'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{project.projectName}</strong>? 
            This action cannot be undone and all documents will be removed.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProject}
              isLoading={isDeleting}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailPage;
