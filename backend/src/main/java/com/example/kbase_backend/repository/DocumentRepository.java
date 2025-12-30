package com.example.kbase_backend.repository;

import com.example.kbase_backend.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Document entity operations.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    /**
     * Find all documents in a specific project.
     */
    @Query("SELECT d FROM Document d WHERE d.project.projectId = :projectId AND d.isActive = true ORDER BY d.createdAt DESC")
    List<Document> findByProjectId(@Param("projectId") Long projectId);
    
    /**
     * Find all documents in a project with pagination.
     */
    @Query("SELECT d FROM Document d WHERE d.project.projectId = :projectId AND d.isActive = true")
    Page<Document> findByProjectId(@Param("projectId") Long projectId, Pageable pageable);
    
    /**
     * Find all documents uploaded by a specific user.
     */
    @Query("SELECT d FROM Document d WHERE d.uploadedBy.userId = :userId AND d.isActive = true ORDER BY d.createdAt DESC")
    List<Document> findByUploaderId(@Param("userId") Long userId);
    
    /**
     * Find documents by file type in a project.
     */
    @Query("SELECT d FROM Document d WHERE d.project.projectId = :projectId AND d.fileType = :fileType AND d.isActive = true")
    List<Document> findByProjectIdAndFileType(@Param("projectId") Long projectId, @Param("fileType") String fileType);
    
    /**
     * Search documents by title or description in a project.
     */
    @Query("SELECT d FROM Document d WHERE d.project.projectId = :projectId AND d.isActive = true AND " +
           "(LOWER(d.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(d.fileName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Document> searchDocumentsInProject(@Param("projectId") Long projectId, @Param("search") String search, Pageable pageable);
    
    /**
     * Count documents in a project.
     */
    @Query("SELECT COUNT(d) FROM Document d WHERE d.project.projectId = :projectId AND d.isActive = true")
    long countByProjectId(@Param("projectId") Long projectId);
    
    /**
     * Count documents in a project (for admin).
     */
    int countByProjectProjectId(Long projectId);
    
    /**
     * Count documents by active status.
     */
    long countByIsActive(Boolean isActive);
    
    /**
     * Calculate total file size in a project.
     */
    @Query("SELECT COALESCE(SUM(d.fileSize), 0) FROM Document d WHERE d.project.projectId = :projectId AND d.isActive = true")
    long getTotalFileSizeByProjectId(@Param("projectId") Long projectId);
    
    /**
     * Find documents by mime type.
     */
    List<Document> findByMimeTypeAndIsActive(String mimeType, Boolean isActive);
}
