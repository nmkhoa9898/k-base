import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { documentService } from '@/services';
import { Document } from '@/types';
import { useAuth } from '@/contexts';
import { Card, CardContent, Button, LoadingSpinner, Alert, Modal } from '@/components/ui';
import { FileText, Download, Trash2, ArrowLeft, Calendar, User, Folder } from 'lucide-react';

const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      const data = await documentService.getById(Number(id));
      setDocument(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!document) return;
    // Note: Download endpoint not available in backend yet
    setError('Document download is not yet implemented');
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await documentService.delete(Number(id));
      navigate('/documents');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const canDelete = document && user && document.uploadedById === user.userId;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Document not found</h2>
        <Link to="/documents" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          Back to documents
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        to="/documents"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to documents
      </Link>

      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Document header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
                {document.description && (
                  <p className="mt-2 text-gray-600">{document.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {canDelete && (
                <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document details */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">File Type</p>
                <p className="text-sm font-medium text-gray-900">{document.fileType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">File Size</p>
                <p className="text-sm font-medium text-gray-900">{formatFileSize(document.fileSize)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Folder className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <Link
                  to={`/projects/${document.projectId}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  {document.projectName}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Uploaded By</p>
                <p className="text-sm font-medium text-gray-900">{document.uploadedByName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(document.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(document.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Document"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{document.title}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} isLoading={isDeleting}>
              Delete Document
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentDetailPage;
