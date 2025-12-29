package com.example.kbase_backend.dto.user;

import com.example.kbase_backend.entity.enums.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for User responses (excludes sensitive data like password).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "User information response")
public class UserDTO {
    
    @Schema(description = "User ID", example = "1")
    private Long userId;
    
    @Schema(description = "User email address", example = "john.doe@example.com")
    private String email;
    
    @Schema(description = "User full name", example = "John Doe")
    private String fullName;
    
    @Schema(description = "User role in the system", example = "USER")
    private UserRole role;
    
    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive;
    
    @Schema(description = "Account creation timestamp")
    private LocalDateTime createdAt;
    
    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;
}
