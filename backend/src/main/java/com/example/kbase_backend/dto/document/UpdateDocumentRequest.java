package com.example.kbase_backend.dto.document;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating an existing document.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for updating a document")
public class UpdateDocumentRequest {
    
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Schema(description = "Document title", example = "Updated Getting Started Guide")
    private String title;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Document description", example = "An updated guide for new users")
    private String description;
    
    @Schema(description = "Whether the document is active", example = "true")
    private Boolean isActive;
}
