package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.common.ApiResponse;
import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.document.CreateDocumentRequest;
import com.example.kbase_backend.dto.document.DocumentDTO;
import com.example.kbase_backend.dto.document.UpdateDocumentRequest;
import com.example.kbase_backend.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for document management endpoints.
 */
@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management APIs")
@SecurityRequirement(name = "bearerAuth")
public class DocumentController {
    
    private final DocumentService documentService;
    
    /**
     * Get all documents with optional pagination.
     */
    @GetMapping
    @Operation(summary = "Get all documents", description = "Retrieve all documents with optional pagination")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Documents retrieved successfully"
            )
    })
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getAllDocuments(
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<DocumentDTO> documentPage = documentService.findAll(pageable);
        PageMetadata metadata = documentService.createPageMetadata(documentPage);
        
        return ResponseEntity.ok(ApiResponse.success("Documents retrieved successfully", documentPage.getContent(), metadata));
    }
    
    /**
     * Get document by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get document by ID", description = "Retrieve a specific document by its ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Document found",
                    content = @Content(schema = @Schema(implementation = DocumentDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Document not found"
            )
    })
    public ResponseEntity<ApiResponse<DocumentDTO>> getDocumentById(
            @Parameter(description = "Document ID") @PathVariable Long id) {
        DocumentDTO document = documentService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(document));
    }
    
    /**
     * Get documents by project ID.
     */
    @GetMapping("/project/{projectId}")
    @Operation(summary = "Get documents by project", description = "Retrieve all documents in a specific project")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getDocumentsByProject(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<DocumentDTO> documentPage = documentService.findByProjectId(projectId, pageable);
        PageMetadata metadata = documentService.createPageMetadata(documentPage);
        
        return ResponseEntity.ok(ApiResponse.success("Documents retrieved successfully", documentPage.getContent(), metadata));
    }
    
    /**
     * Get documents uploaded by a user.
     */
    @GetMapping("/uploader/{userId}")
    @Operation(summary = "Get documents by uploader", description = "Retrieve all documents uploaded by a specific user")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getDocumentsByUploader(
            @Parameter(description = "Uploader user ID") @PathVariable Long userId) {
        List<DocumentDTO> documents = documentService.findByUploaderId(userId);
        return ResponseEntity.ok(ApiResponse.success(documents));
    }
    
    /**
     * Get documents by file type in a project.
     */
    @GetMapping("/project/{projectId}/type/{fileType}")
    @Operation(summary = "Get documents by file type", description = "Retrieve documents by file type in a project")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getDocumentsByFileType(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @Parameter(description = "File type") @PathVariable String fileType) {
        List<DocumentDTO> documents = documentService.findByProjectIdAndFileType(projectId, fileType);
        return ResponseEntity.ok(ApiResponse.success(documents));
    }
    
    /**
     * Search documents in a project.
     */
    @GetMapping("/project/{projectId}/search")
    @Operation(summary = "Search documents in project", description = "Search documents by title, description, or filename in a project")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> searchDocumentsInProject(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @Parameter(description = "Search term") @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<DocumentDTO> documentPage = documentService.searchInProject(projectId, q, pageable);
        PageMetadata metadata = documentService.createPageMetadata(documentPage);
        
        return ResponseEntity.ok(ApiResponse.success("Search results", documentPage.getContent(), metadata));
    }
    
    /**
     * Create a new document.
     */
    @PostMapping
    @Operation(summary = "Create document", description = "Create a new document metadata entry")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Document created successfully",
                    content = @Content(schema = @Schema(implementation = DocumentDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project or uploader not found"
            )
    })
    public ResponseEntity<ApiResponse<DocumentDTO>> createDocument(@Valid @RequestBody CreateDocumentRequest request) {
        DocumentDTO document = documentService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Document created successfully", document));
    }
    
    /**
     * Update an existing document.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update document", description = "Update an existing document")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Document updated successfully",
                    content = @Content(schema = @Schema(implementation = DocumentDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Document not found"
            )
    })
    public ResponseEntity<ApiResponse<DocumentDTO>> updateDocument(
            @Parameter(description = "Document ID") @PathVariable Long id,
            @Valid @RequestBody UpdateDocumentRequest request) {
        DocumentDTO document = documentService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Document updated successfully", document));
    }
    
    /**
     * Delete a document (soft delete).
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete document", description = "Soft delete a document")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Document deleted successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Document not found"
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteDocument(
            @Parameter(description = "Document ID") @PathVariable Long id) {
        documentService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Document deleted successfully", null));
    }
    
    /**
     * Get project document statistics.
     */
    @GetMapping("/project/{projectId}/stats")
    @Operation(summary = "Get document statistics", description = "Get document count and total size for a project")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProjectStats(
            @Parameter(description = "Project ID") @PathVariable Long projectId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("documentCount", documentService.countByProjectId(projectId));
        stats.put("totalFileSize", documentService.getTotalFileSizeByProjectId(projectId));
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
