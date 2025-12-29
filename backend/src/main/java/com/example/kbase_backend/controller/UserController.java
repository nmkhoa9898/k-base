package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.common.ApiResponse;
import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.user.CreateUserRequest;
import com.example.kbase_backend.dto.user.UpdateUserRequest;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.entity.enums.UserRole;
import com.example.kbase_backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for user management endpoints.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management APIs")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    
    private final UserService userService;
    
    /**
     * Get all users with optional pagination.
     */
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieve all users with optional pagination")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Users retrieved successfully"
            )
    })
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers(
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<UserDTO> userPage = userService.findAll(pageable);
        PageMetadata metadata = userService.createPageMetadata(userPage);
        
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", userPage.getContent(), metadata));
    }
    
    /**
     * Get user by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve a specific user by their ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User found",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found"
            )
    })
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(
            @Parameter(description = "User ID") @PathVariable Long id) {
        UserDTO user = userService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    /**
     * Get users by role.
     */
    @GetMapping("/role/{role}")
    @Operation(summary = "Get users by role", description = "Retrieve all users with a specific role")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getUsersByRole(
            @Parameter(description = "User role") @PathVariable UserRole role) {
        List<UserDTO> users = userService.findByRole(role);
        return ResponseEntity.ok(ApiResponse.success(users));
    }
    
    /**
     * Search users.
     */
    @GetMapping("/search")
    @Operation(summary = "Search users", description = "Search users by name or email")
    public ResponseEntity<ApiResponse<List<UserDTO>>> searchUsers(
            @Parameter(description = "Search term") @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTO> userPage = userService.searchUsers(q, pageable);
        PageMetadata metadata = userService.createPageMetadata(userPage);
        
        return ResponseEntity.ok(ApiResponse.success("Search results", userPage.getContent(), metadata));
    }
    
    /**
     * Create a new user.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create user", description = "Create a new user (Admin only)")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "User created successfully",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409",
                    description = "Email already exists"
            )
    })
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("User created successfully", user));
    }
    
    /**
     * Update an existing user.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Update an existing user")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User updated successfully",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found"
            )
    })
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @Parameter(description = "User ID") @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        UserDTO user = userService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", user));
    }
    
    /**
     * Delete a user (soft delete).
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete user", description = "Soft delete a user (Admin only)")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User deleted successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found"
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @Parameter(description = "User ID") @PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }
    
    /**
     * Check if email exists.
     */
    @GetMapping("/check-email")
    @Operation(summary = "Check email availability", description = "Check if an email is already registered")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(
            @Parameter(description = "Email to check") @RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(ApiResponse.success(exists ? "Email is taken" : "Email is available", exists));
    }
}
