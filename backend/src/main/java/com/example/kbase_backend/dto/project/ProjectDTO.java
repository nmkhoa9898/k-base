package com.example.kbase_backend.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Project responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Project information response")
public class ProjectDTO {
    
    @Schema(description = "Project ID", example = "1")
    private Long projectId;
    
    @Schema(description = "Project name", example = "Knowledge Base Project")
    private String projectName;
    
    @Schema(description = "Project description", example = "A comprehensive knowledge management system")
    private String description;
    
    @Schema(description = "Owner user ID", example = "1")
    private Long ownerId;
    
    @Schema(description = "Owner name", example = "John Doe")
    private String ownerName;
    
    @Schema(description = "Owner email", example = "john.doe@example.com")
    private String ownerEmail;
    
    @Schema(description = "Whether the project is active", example = "true")
    private Boolean isActive;
    
    @Schema(description = "Number of members in the project", example = "5")
    private Integer memberCount;
    
    @Schema(description = "Number of documents in the project", example = "25")
    private Integer documentCount;
    
    @Schema(description = "Project creation timestamp")
    private LocalDateTime createdAt;
    
    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;
}
