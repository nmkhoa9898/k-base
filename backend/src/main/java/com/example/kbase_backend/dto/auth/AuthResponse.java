package com.example.kbase_backend.dto.auth;

import com.example.kbase_backend.dto.user.UserDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response containing JWT token and user info.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Authentication response containing JWT token and user information")
public class AuthResponse {
    
    @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String accessToken;
    
    @Schema(description = "Token type", example = "Bearer")
    @Builder.Default
    private String tokenType = "Bearer";
    
    @Schema(description = "Token expiration time in seconds", example = "86400")
    private Long expiresIn;
    
    @Schema(description = "Authenticated user information")
    private UserDTO user;
}
