package com.example.kbase_backend.service;

import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.document.CreateDocumentRequest;
import com.example.kbase_backend.dto.document.DocumentDTO;
import com.example.kbase_backend.dto.document.UpdateDocumentRequest;
import com.example.kbase_backend.entity.Document;
import com.example.kbase_backend.entity.Project;
import com.example.kbase_backend.entity.User;
import com.example.kbase_backend.exception.ResourceNotFoundException;
import com.example.kbase_backend.repository.DocumentRepository;
import com.example.kbase_backend.repository.ProjectRepository;
import com.example.kbase_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for document-related business logic.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DocumentService {
    
    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    
    /**
     * Get all documents.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findAll() {
        log.debug("Fetching all documents");
        return documentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get documents with pagination.
     */
    @Transactional(readOnly = true)
    public Page<DocumentDTO> findAll(Pageable pageable) {
        log.debug("Fetching documents with pagination: {}", pageable);
        return documentRepository.findAll(pageable).map(this::convertToDTO);
    }
    
    /**
     * Get document by ID.
     */
    @Transactional(readOnly = true)
    public DocumentDTO findById(Long id) {
        log.debug("Fetching document by id: {}", id);
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document", "id", id));
        return convertToDTO(document);
    }
    
    /**
     * Get document entity by ID.
     */
    @Transactional(readOnly = true)
    public Document findEntityById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document", "id", id));
    }
    
    /**
     * Get documents by project ID.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findByProjectId(Long projectId) {
        log.debug("Fetching documents by project id: {}", projectId);
        
        // Verify project exists
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project", "id", projectId);
        }
        
        return documentRepository.findByProjectId(projectId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get documents by project ID with pagination.
     */
    @Transactional(readOnly = true)
    public Page<DocumentDTO> findByProjectId(Long projectId, Pageable pageable) {
        log.debug("Fetching documents by project id: {} with pagination", projectId);
        
        // Verify project exists
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project", "id", projectId);
        }
        
        return documentRepository.findByProjectId(projectId, pageable).map(this::convertToDTO);
    }
    
    /**
     * Get documents uploaded by a specific user.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findByUploaderId(Long userId) {
        log.debug("Fetching documents by uploader id: {}", userId);
        
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        
        return documentRepository.findByUploaderId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get documents by file type in a project.
     */
    @Transactional(readOnly = true)
    public List<DocumentDTO> findByProjectIdAndFileType(Long projectId, String fileType) {
        log.debug("Fetching documents by project id: {} and file type: {}", projectId, fileType);
        return documentRepository.findByProjectIdAndFileType(projectId, fileType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Search documents in a project.
     */
    @Transactional(readOnly = true)
    public Page<DocumentDTO> searchInProject(Long projectId, String search, Pageable pageable) {
        log.debug("Searching documents in project {} with term: {}", projectId, search);
        return documentRepository.searchDocumentsInProject(projectId, search, pageable).map(this::convertToDTO);
    }
    
    /**
     * Create a new document.
     */
    public DocumentDTO create(CreateDocumentRequest request) {
        log.info("Creating new document: {} in project {}", request.getFileName(), request.getProjectId());
        
        // Find project
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", request.getProjectId()));
        
        // Find uploader
        User uploader = userRepository.findById(request.getUploadedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUploadedBy()));
        
        Document document = Document.builder()
                .project(project)
                .uploadedBy(uploader)
                .title(request.getTitle())
                .fileName(request.getFileName())
                .fileType(request.getFileType())
                .fileSize(request.getFileSize())
                .storagePath(request.getStoragePath())
                .mimeType(request.getMimeType())
                .description(request.getDescription())
                .isActive(true)
                .build();
        
        Document savedDocument = documentRepository.save(document);
        log.info("Created document with id: {}", savedDocument.getDocumentId());
        return convertToDTO(savedDocument);
    }
    
    /**
     * Update an existing document.
     */
    public DocumentDTO update(Long id, UpdateDocumentRequest request) {
        log.info("Updating document with id: {}", id);
        
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document", "id", id));
        
        if (request.getTitle() != null) {
            document.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            document.setDescription(request.getDescription());
        }
        if (request.getIsActive() != null) {
            document.setIsActive(request.getIsActive());
        }
        
        Document updatedDocument = documentRepository.save(document);
        log.info("Updated document with id: {}", updatedDocument.getDocumentId());
        return convertToDTO(updatedDocument);
    }
    
    /**
     * Delete a document (soft delete by deactivating).
     */
    public void delete(Long id) {
        log.info("Deleting document with id: {}", id);
        
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document", "id", id));
        
        document.setIsActive(false);
        documentRepository.save(document);
        log.info("Soft deleted document with id: {}", id);
    }
    
    /**
     * Hard delete a document (permanent).
     */
    public void hardDelete(Long id) {
        log.warn("Hard deleting document with id: {}", id);
        
        if (!documentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Document", "id", id);
        }
        
        documentRepository.deleteById(id);
        log.info("Hard deleted document with id: {}", id);
    }
    
    /**
     * Get document count for a project.
     */
    @Transactional(readOnly = true)
    public long countByProjectId(Long projectId) {
        return documentRepository.countByProjectId(projectId);
    }
    
    /**
     * Get total file size for a project.
     */
    @Transactional(readOnly = true)
    public long getTotalFileSizeByProjectId(Long projectId) {
        return documentRepository.getTotalFileSizeByProjectId(projectId);
    }
    
    /**
     * Convert Document entity to DocumentDTO.
     */
    private DocumentDTO convertToDTO(Document document) {
        return DocumentDTO.builder()
                .documentId(document.getDocumentId())
                .projectId(document.getProject().getProjectId())
                .projectName(document.getProject().getProjectName())
                .uploadedById(document.getUploadedBy().getUserId())
                .uploadedByName(document.getUploadedBy().getFullName())
                .title(document.getTitle())
                .fileName(document.getFileName())
                .fileType(document.getFileType())
                .fileSize(document.getFileSize())
                .mimeType(document.getMimeType())
                .description(document.getDescription())
                .isActive(document.getIsActive())
                .createdAt(document.getCreatedAt())
                .updatedAt(document.getUpdatedAt())
                .build();
    }
    
    /**
     * Create PageMetadata from Page object.
     */
    public PageMetadata createPageMetadata(Page<?> page) {
        return PageMetadata.builder()
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }
}
