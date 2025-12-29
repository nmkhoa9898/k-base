package com.example.kbase_backend.dto.document;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new document (metadata only).
 * File upload is handled separately via multipart form.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for creating a document")
public class CreateDocumentRequest {
    
    @NotNull(message = "Project ID is required")
    @Schema(description = "Project ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long projectId;
    
    @NotNull(message = "Uploader user ID is required")
    @Schema(description = "Uploader user ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long uploadedBy;
    
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Schema(description = "Document title", example = "Getting Started Guide")
    private String title;
    
    @NotBlank(message = "File name is required")
    @Size(max = 255, message = "File name must not exceed 255 characters")
    @Schema(description = "Original file name", example = "getting-started.pdf", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fileName;
    
    @NotBlank(message = "File type is required")
    @Size(max = 50, message = "File type must not exceed 50 characters")
    @Schema(description = "File type/extension", example = "pdf", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fileType;
    
    @NotNull(message = "File size is required")
    @Schema(description = "File size in bytes", example = "1024000", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long fileSize;
    
    @NotBlank(message = "Storage path is required")
    @Size(max = 500, message = "Storage path must not exceed 500 characters")
    @Schema(description = "Storage path in object storage", example = "/projects/1/documents/getting-started.pdf", requiredMode = Schema.RequiredMode.REQUIRED)
    private String storagePath;
    
    @Size(max = 100, message = "MIME type must not exceed 100 characters")
    @Schema(description = "MIME type", example = "application/pdf")
    private String mimeType;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Document description", example = "A guide for new users")
    private String description;
}
