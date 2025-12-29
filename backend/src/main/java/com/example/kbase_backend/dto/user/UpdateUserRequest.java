package com.example.kbase_backend.dto.user;

import com.example.kbase_backend.entity.enums.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating an existing user.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for updating a user")
public class UpdateUserRequest {
    
    @Size(max = 255, message = "Full name must not exceed 255 characters")
    @Schema(description = "User full name", example = "John Doe Updated")
    private String fullName;
    
    @Schema(description = "User role (ADMIN, OWNER, or USER)", example = "OWNER")
    private UserRole role;
    
    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive;
}
