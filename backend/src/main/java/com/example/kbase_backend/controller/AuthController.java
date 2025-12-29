package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.auth.AuthResponse;
import com.example.kbase_backend.dto.auth.LoginRequest;
import com.example.kbase_backend.dto.auth.RegisterRequest;
import com.example.kbase_backend.dto.common.ApiResponse;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication endpoints.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * Authenticate user and return JWT token.
     */
    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate a user with email and password")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Login successful",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Invalid credentials"
            )
    })
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }
    
    /**
     * Register a new user.
     */
    @PostMapping("/register")
    @Operation(summary = "User registration", description = "Register a new user account")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Registration successful",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409",
                    description = "Email already exists"
            )
    })
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse authResponse = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Registration successful", authResponse));
    }
    
    /**
     * Get current authenticated user information.
     */
    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Get the currently authenticated user's information")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User information retrieved",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Not authenticated"
            )
    })
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(Authentication authentication) {
        UserDTO user = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    /**
     * Validate a JWT token.
     */
    @GetMapping("/validate")
    @Operation(summary = "Validate token", description = "Validate if the current token is valid")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Token is valid"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Token is invalid"
            )
    })
    public ResponseEntity<ApiResponse<Boolean>> validateToken(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success("Token is valid", true));
    }
}
