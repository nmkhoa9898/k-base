package com.example.kbase_backend.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating an existing project.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for updating a project")
public class UpdateProjectRequest {
    
    @Size(max = 255, message = "Project name must not exceed 255 characters")
    @Schema(description = "Project name", example = "Updated Project Name")
    private String projectName;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Project description", example = "Updated project description")
    private String description;
    
    @Schema(description = "Whether the project is active", example = "true")
    private Boolean isActive;
}
