package com.example.kbase_backend.dto.document;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Document responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Document information response")
public class DocumentDTO {
    
    @Schema(description = "Document ID", example = "1")
    private Long documentId;
    
    @Schema(description = "Project ID", example = "1")
    private Long projectId;
    
    @Schema(description = "Project name", example = "Knowledge Base Project")
    private String projectName;
    
    @Schema(description = "Uploader user ID", example = "1")
    private Long uploadedById;
    
    @Schema(description = "Uploader name", example = "John Doe")
    private String uploadedByName;
    
    @Schema(description = "Document title", example = "Getting Started Guide")
    private String title;
    
    @Schema(description = "Original file name", example = "getting-started.pdf")
    private String fileName;
    
    @Schema(description = "File type/extension", example = "pdf")
    private String fileType;
    
    @Schema(description = "File size in bytes", example = "1024000")
    private Long fileSize;
    
    @Schema(description = "MIME type", example = "application/pdf")
    private String mimeType;
    
    @Schema(description = "Document description", example = "A guide for new users")
    private String description;
    
    @Schema(description = "Whether the document is active", example = "true")
    private Boolean isActive;
    
    @Schema(description = "Document creation timestamp")
    private LocalDateTime createdAt;
    
    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;
}
