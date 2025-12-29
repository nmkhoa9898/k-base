package com.example.kbase_backend.service;

import com.example.kbase_backend.dto.auth.AuthResponse;
import com.example.kbase_backend.dto.auth.LoginRequest;
import com.example.kbase_backend.dto.auth.RegisterRequest;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.entity.User;
import com.example.kbase_backend.entity.enums.UserRole;
import com.example.kbase_backend.exception.AuthenticationException;
import com.example.kbase_backend.exception.DuplicateResourceException;
import com.example.kbase_backend.repository.UserRepository;
import com.example.kbase_backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for authentication-related business logic.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    
    /**
     * Authenticate a user and return a JWT token.
     */
    public AuthResponse login(LoginRequest request) {
        log.info("Attempting login for user: {}", request.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            
            String token = jwtTokenProvider.generateToken(authentication);
            
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new AuthenticationException("User not found"));
            
            log.info("User {} logged in successfully", request.getEmail());
            
            return AuthResponse.builder()
                    .accessToken(token)
                    .tokenType("Bearer")
                    .expiresIn(jwtTokenProvider.getExpirationInSeconds())
                    .user(convertToDTO(user))
                    .build();
                    
        } catch (BadCredentialsException e) {
            log.warn("Failed login attempt for user: {}", request.getEmail());
            throw new AuthenticationException("Invalid email or password");
        }
    }
    
    /**
     * Register a new user.
     */
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getEmail());
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", "email", request.getEmail());
        }
        
        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole() != null ? request.getRole() : UserRole.USER)
                .isActive(true)
                .build();
        
        User savedUser = userRepository.save(user);
        log.info("Created new user with id: {}", savedUser.getUserId());
        
        // Generate token for auto-login after registration
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());
        
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationInSeconds())
                .user(convertToDTO(savedUser))
                .build();
    }
    
    /**
     * Get current authenticated user.
     */
    @Transactional(readOnly = true)
    public UserDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("User not found"));
        return convertToDTO(user);
    }
    
    /**
     * Validate if a token is valid.
     */
    public boolean validateToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }
    
    /**
     * Change user password.
     */
    public void changePassword(String email, String currentPassword, String newPassword) {
        log.info("Changing password for user: {}", email);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("User not found"));
        
        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new AuthenticationException("Current password is incorrect");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        log.info("Password changed successfully for user: {}", email);
    }
    
    /**
     * Convert User entity to UserDTO.
     */
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
