package com.example.kbase_backend.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new project.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for creating a new project")
public class CreateProjectRequest {
    
    @NotBlank(message = "Project name is required")
    @Size(max = 255, message = "Project name must not exceed 255 characters")
    @Schema(description = "Project name", example = "Knowledge Base Project", requiredMode = Schema.RequiredMode.REQUIRED)
    private String projectName;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Project description", example = "A comprehensive knowledge management system")
    private String description;
    
    @NotNull(message = "Owner ID is required")
    @Schema(description = "Owner user ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long ownerId;
}
