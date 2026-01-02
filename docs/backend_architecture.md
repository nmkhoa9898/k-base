# KBase Backend Architecture - Complete Technical Guide

> This document provides a comprehensive breakdown of the KBase backend service architecture. It's designed for developers who are new to Java and Spring Boot, explaining not just *what* the code does but *why* it works that way.

## Table of Contents

1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Core Concepts Explained](#4-core-concepts-explained)
5. [Application Entry Point](#5-application-entry-point)
6. [Configuration](#6-configuration)
7. [Entity Layer (Data Models)](#7-entity-layer-data-models)
8. [Repository Layer (Data Access)](#8-repository-layer-data-access)
9. [Service Layer (Business Logic)](#9-service-layer-business-logic)
10. [Controller Layer (REST API)](#10-controller-layer-rest-api)
11. [Security Architecture](#11-security-architecture)
12. [DTOs (Data Transfer Objects)](#12-dtos-data-transfer-objects)
13. [Exception Handling](#13-exception-handling)
14. [Data Flow: Complete Request Lifecycle](#14-data-flow-complete-request-lifecycle)
15. [Common Java Syntax Explained](#15-common-java-syntax-explained)
16. [Lombok Annotations Guide](#16-lombok-annotations-guide)
17. [Spring Annotations Guide](#17-spring-annotations-guide)

---

## 1. Overview

KBase is a Knowledge Base application with a REST API backend built using **Spring Boot 3.4.1** and **Java 21**. The backend follows a layered architecture pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Frontend)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Controller Layer (REST Endpoints)               │
│    Handles HTTP requests, validates input, returns JSON      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               Service Layer (Business Logic)                 │
│    Contains all business rules and orchestrates operations   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Repository Layer (Data Access)                  │
│    Abstracts database operations using Spring Data JPA       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Database (PostgreSQL/H2)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Programming language (LTS version) |
| Spring Boot | 3.4.1 | Application framework |
| Spring Security | - | Authentication & Authorization |
| Spring Data JPA | - | Database abstraction |

### Dependencies (from `pom.xml`)

```xml
<!-- Spring Boot Starters - Bundles of related dependencies -->
spring-boot-starter-data-jpa    → Database access with JPA/Hibernate
spring-boot-starter-security    → Security framework
spring-boot-starter-web         → REST API support
spring-boot-starter-validation  → Input validation (@Valid)

<!-- JWT Authentication -->
jjwt-api, jjwt-impl, jjwt-jackson → JSON Web Token handling

<!-- API Documentation -->
springdoc-openapi-starter-webmvc-ui → Swagger/OpenAPI documentation

<!-- Database -->
postgresql  → Production database driver
h2          → In-memory database for development/testing

<!-- Developer Tools -->
lombok      → Reduces boilerplate code (getters, setters, constructors)
devtools    → Hot reload during development
```

---

## 3. Project Structure

```
backend/src/main/java/com/example/kbase_backend/
├── KBaseBackendApplication.java    # Entry point
├── config/                          # Configuration classes
│   ├── OpenApiConfig.java          # Swagger documentation config
│   └── SecurityConfig.java         # Security settings
├── controller/                      # REST endpoints
│   ├── AuthController.java         # /api/auth/*
│   ├── UserController.java         # /api/users/*
│   ├── ProjectController.java      # /api/projects/*
│   ├── DocumentController.java     # /api/documents/*
│   ├── AdminController.java        # /api/admin/*
│   └── PingController.java         # Health check
├── dto/                             # Data Transfer Objects
│   ├── auth/                        # Authentication DTOs
│   ├── common/                      # Shared DTOs (ApiResponse)
│   ├── document/                    # Document DTOs
│   ├── project/                     # Project DTOs
│   └── user/                        # User DTOs
├── entity/                          # Database entities (tables)
│   ├── User.java
│   ├── Project.java
│   ├── Document.java
│   ├── ProjectMember.java
│   ├── ProjectMemberId.java        # Composite key
│   └── enums/                       # Enum types
│       ├── UserRole.java
│       └── MemberRole.java
├── exception/                       # Custom exceptions
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── DuplicateResourceException.java
│   └── ...
├── repository/                      # Database access interfaces
│   ├── UserRepository.java
│   ├── ProjectRepository.java
│   ├── DocumentRepository.java
│   └── ProjectMemberRepository.java
├── security/                        # Security components
│   ├── JwtTokenProvider.java       # JWT generation/validation
│   ├── JwtAuthenticationFilter.java # Request filter
│   ├── JwtAuthenticationEntryPoint.java
│   └── CustomUserDetailsService.java
└── service/                         # Business logic
    ├── AuthService.java
    ├── UserService.java
    ├── ProjectService.java
    ├── DocumentService.java
    └── AdminService.java
```

---

## 4. Core Concepts Explained

### 4.1 What is Spring Boot?

Spring Boot is a framework that makes it easy to create standalone Java applications. It provides:
- **Auto-configuration**: Automatically configures your application based on dependencies
- **Embedded server**: No need to deploy to external Tomcat/Jetty
- **Dependency injection**: Objects are created and wired together automatically

### 4.2 Dependency Injection (DI)

Instead of creating objects manually with `new`, Spring creates and manages them for you:

```java
// WITHOUT Spring (manual creation)
public class AuthController {
    private AuthService authService = new AuthService(new UserRepository(), new PasswordEncoder());
}

// WITH Spring (dependency injection)
@RestController
@RequiredArgsConstructor  // Lombok creates constructor
public class AuthController {
    private final AuthService authService;  // Spring injects this automatically
}
```

### 4.3 Inversion of Control (IoC)

Spring's IoC container manages the lifecycle of objects (called "beans"). When you annotate a class with `@Service`, `@Repository`, `@Controller`, etc., Spring:
1. Creates an instance of that class at startup
2. Keeps track of it in the "application context"
3. Injects it wherever it's needed

### 4.4 Annotations

Annotations are metadata that tell Spring how to handle your code:

```java
@RestController  // This class handles HTTP requests and returns JSON
@Service         // This class contains business logic
@Repository      // This class handles database operations
@Entity          // This class maps to a database table
```

---

## 5. Application Entry Point

```java
// File: KBaseBackendApplication.java
package com.example.kbase_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // Combines @Configuration, @EnableAutoConfiguration, @ComponentScan
public class KBaseBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KBaseBackendApplication.class, args);
    }
}
```

**What happens when you run this:**
1. `main()` method is called (Java standard entry point)
2. `SpringApplication.run()` starts the Spring Boot application
3. Spring scans all packages under `com.example.kbase_backend` for annotated classes
4. Creates instances of all beans (@Service, @Controller, @Repository, etc.)
5. Starts the embedded Tomcat server on port 8080
6. Application is ready to receive HTTP requests

---

## 6. Configuration

### 6.1 Application Properties (`application.yaml`)

```yaml
spring:
  application:
    name: KBase Backend
  
  # Database configuration (H2 for development)
  datasource:
    url: jdbc:h2:mem:kbase_db       # In-memory H2 database
    username: sa
    password:
    driver-class-name: org.h2.Driver
  
  # JPA/Hibernate settings
  jpa:
    hibernate:
      ddl-auto: update  # Auto-create/update tables from entities
    show-sql: false     # Don't log SQL queries

server:
  port: 8080  # HTTP port

# Custom application settings
app:
  jwt:
    secret: [base64-encoded-secret-key]
    expiration-ms: 86400000  # 24 hours in milliseconds
```

### 6.2 Security Configuration

```java
// File: SecurityConfig.java
@Configuration                        // This is a configuration class
@EnableWebSecurity                    // Enable Spring Security
@EnableMethodSecurity(prePostEnabled = true)  // Enable @PreAuthorize annotations
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean  // Create and register a SecurityFilterChain bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF - not needed for stateless REST API
            .csrf(AbstractHttpConfigurer::disable)
            
            // Enable CORS for frontend communication
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // How to handle authentication errors
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            )
            
            // Don't create HTTP sessions (stateless)
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Define which URLs are public/protected
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/auth/**").permitAll()     // Login/register = public
                .requestMatchers("/api/ping").permitAll()         // Health check = public
                .requestMatchers("/swagger-ui/**").permitAll()    // API docs = public
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                .anyRequest().authenticated()  // Everything else needs authentication
            )
            
            // Add JWT filter before username/password filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Industry-standard password hashing
    }
}
```

---

## 7. Entity Layer (Data Models)

Entities represent database tables. Each entity class maps to a table, and each field maps to a column.

### 7.1 User Entity

```java
// File: entity/User.java
@Entity                     // This class is a JPA entity (database table)
@Table(name = "users")      // Table name in database
@Data                       // Lombok: generates getters, setters, toString, equals, hashCode
@NoArgsConstructor          // Lombok: generates no-args constructor
@AllArgsConstructor         // Lombok: generates all-args constructor
@Builder                    // Lombok: generates builder pattern
public class User {
    
    @Id                                          // This is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column(name = "user_id")                    // Column name in database
    private Long userId;
    
    @Column(unique = true, nullable = false, length = 255)
    private String email;
    
    @Column(nullable = false, length = 255)
    private String password;  // Stored as BCrypt hash, never plain text
    
    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;
    
    @Enumerated(EnumType.STRING)    // Store enum as string ("ADMIN", "USER")
    @Column(nullable = false, length = 50)
    private UserRole role;
    
    @Column(name = "is_active")
    @Builder.Default                 // Default value when using builder
    private Boolean isActive = true;
    
    @CreationTimestamp              // Automatically set when entity is created
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp                // Automatically updated when entity changes
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude               // Exclude from toString to prevent infinite loops
    @EqualsAndHashCode.Exclude      // Exclude from equals/hashCode
    @Builder.Default
    private List<Project> ownedProjects = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<ProjectMember> projectMemberships = new ArrayList<>();
}
```

**Generated Database Table:**
```sql
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 7.2 Relationships Explained

```java
// ONE-TO-MANY: One user can own many projects
@OneToMany(mappedBy = "owner")  // "owner" is the field name in Project class
private List<Project> ownedProjects;

// MANY-TO-ONE: Many projects belong to one user
@ManyToOne(fetch = FetchType.LAZY)  // Don't load until accessed
@JoinColumn(name = "owner_id", nullable = false)  // Foreign key column
private User owner;
```

**Visual Representation:**
```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      User       │       │     Project     │       │    Document     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ user_id (PK)    │──┐    │ project_id (PK) │──┐    │ document_id(PK) │
│ email           │  │    │ project_name    │  │    │ title           │
│ password        │  │    │ description     │  │    │ file_name       │
│ full_name       │  └───>│ owner_id (FK)   │  └───>│ project_id (FK) │
│ role            │       │ is_active       │       │ uploaded_by(FK) │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 7.3 Enums

```java
// File: entity/enums/UserRole.java
public enum UserRole {
    ADMIN,   // Full system access
    OWNER,   // Can create projects and invite members
    USER     // Regular user
}

// File: entity/enums/MemberRole.java
public enum MemberRole {
    OWNER,   // Project owner
    MEMBER   // Regular project member
}
```

---

## 8. Repository Layer (Data Access)

Repositories handle database operations. Spring Data JPA generates implementations automatically.

### 8.1 UserRepository

```java
// File: repository/UserRepository.java
@Repository  // Marks this as a data access component
public interface UserRepository extends JpaRepository<User, Long> {
    //                                 └───────┬───────┘
    //                          Entity type ─┘         └─ Primary key type
    
    // Spring Data JPA generates these automatically based on method names:
    
    Optional<User> findByEmail(String email);
    // Generated SQL: SELECT * FROM users WHERE email = ?
    
    boolean existsByEmail(String email);
    // Generated SQL: SELECT COUNT(*) > 0 FROM users WHERE email = ?
    
    List<User> findByRole(UserRole role);
    // Generated SQL: SELECT * FROM users WHERE role = ?
    
    List<User> findByIsActive(Boolean isActive);
    // Generated SQL: SELECT * FROM users WHERE is_active = ?
    
    // Custom query using JPQL (Java Persistence Query Language)
    @Query("SELECT u FROM User u WHERE LOWER(u.fullName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
    
    // Count methods
    long countByIsActive(Boolean isActive);
}
```

**Method Naming Convention:**
```
findBy + FieldName + Condition

Examples:
findByEmail          → WHERE email = ?
findByEmailAndRole   → WHERE email = ? AND role = ?
findByIsActiveTrue   → WHERE is_active = true
findByRoleIn         → WHERE role IN (?)
findByCreatedAtAfter → WHERE created_at > ?
```

### 8.2 JpaRepository Inherited Methods

When you extend `JpaRepository`, you get these methods for free:

```java
// CRUD Operations
save(entity)              // Insert or update
saveAll(entities)         // Batch insert/update
findById(id)              // Find by primary key → Optional<Entity>
findAll()                 // Get all records
findAllById(ids)          // Find multiple by IDs
count()                   // Count all records
deleteById(id)            // Delete by ID
delete(entity)            // Delete entity
deleteAll()               // Delete everything

// Pagination
findAll(Pageable)         // Get a page of results
findAll(Sort)             // Get sorted results
```

---

## 9. Service Layer (Business Logic)

Services contain the business logic. They coordinate between controllers and repositories.

### 9.1 AuthService

```java
// File: service/AuthService.java
@Service                   // Register as a Spring service bean
@RequiredArgsConstructor   // Lombok: constructor with all final fields
@Slf4j                     // Lombok: creates a logger called "log"
@Transactional            // All methods run in database transactions
public class AuthService {
    
    // Dependencies injected via constructor (RequiredArgsConstructor)
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    
    /**
     * Authenticate user and return JWT token.
     */
    public AuthResponse login(LoginRequest request) {
        log.info("Attempting login for user: {}", request.getEmail());
        
        try {
            // 1. Authenticate using Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
            
            // 2. Generate JWT token
            String token = jwtTokenProvider.generateToken(authentication);
            
            // 3. Find user details
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationException("User not found"));
            
            log.info("User {} logged in successfully", request.getEmail());
            
            // 4. Build and return response
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
        
        // 1. Check for duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", "email", request.getEmail());
        }
        
        // 2. Create and save user
        User user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))  // Hash password
            .fullName(request.getFullName())
            .role(request.getRole() != null ? request.getRole() : UserRole.USER)
            .isActive(true)
            .build();
        
        User savedUser = userRepository.save(user);
        log.info("Created new user with id: {}", savedUser.getUserId());
        
        // 3. Generate token for auto-login
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());
        
        // 4. Return response
        return AuthResponse.builder()
            .accessToken(token)
            .tokenType("Bearer")
            .expiresIn(jwtTokenProvider.getExpirationInSeconds())
            .user(convertToDTO(savedUser))
            .build();
    }
    
    // Helper method to convert Entity to DTO
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
```

### 9.2 Transaction Management

```java
@Transactional  // Class-level: all methods are transactional by default
public class UserService {
    
    @Transactional(readOnly = true)  // Optimization for read-only operations
    public UserDTO findById(Long id) {
        // ...
    }
    
    // No annotation needed - uses class-level @Transactional
    public UserDTO create(CreateUserRequest request) {
        // If this method throws an exception, all database changes are rolled back
    }
}
```

---

## 10. Controller Layer (REST API)

Controllers handle HTTP requests and responses.

### 10.1 AuthController

```java
// File: controller/AuthController.java
@RestController                         // Handles HTTP requests, returns JSON
@RequestMapping("/api/auth")           // Base URL for all endpoints in this class
@RequiredArgsConstructor
@Tag(name = "Authentication")          // Swagger documentation group
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * POST /api/auth/login
     * Request body: { "email": "...", "password": "..." }
     */
    @PostMapping("/login")
    @Operation(summary = "User login")  // Swagger description
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        //       └──┬──┘ └────┬────┘
        //          │         └─ Deserialize JSON body to LoginRequest object
        //          └─ Validate using annotations in LoginRequest
        
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
        //     └────────┬────────┘
        //              └─ HTTP 200 OK with JSON body
    }
    
    /**
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse authResponse = authService.register(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)  // HTTP 201 Created
            .body(ApiResponse.created("Registration successful", authResponse));
    }
    
    /**
     * GET /api/auth/me
     * Returns the currently authenticated user
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(Authentication authentication) {
        //                                                     └───────┬───────┘
        //                   Spring injects the current user's authentication object ─┘
        
        UserDTO user = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(user));
    }
}
```

### 10.2 HTTP Method Mappings

```java
@GetMapping("/{id}")        // GET    /api/users/1       → Read
@PostMapping                // POST   /api/users         → Create
@PutMapping("/{id}")        // PUT    /api/users/1       → Update (full)
@PatchMapping("/{id}")      // PATCH  /api/users/1       → Update (partial)
@DeleteMapping("/{id}")     // DELETE /api/users/1       → Delete
```

### 10.3 Path Variables and Query Parameters

```java
// Path variable: /api/users/123
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) { ... }

// Query parameter: /api/users?page=0&size=20
@GetMapping
public Page<UserDTO> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size) { ... }

// Both: /api/users/123/projects?active=true
@GetMapping("/{userId}/projects")
public List<ProjectDTO> getUserProjects(
    @PathVariable Long userId,
    @RequestParam(required = false) Boolean active) { ... }
```

---

## 11. Security Architecture

### 11.1 JWT Authentication Flow

```
┌──────────┐    1. POST /api/auth/login    ┌──────────┐
│  Client  │ ─────────────────────────────>│  Server  │
│          │    { email, password }        │          │
│          │                               │          │
│          │    2. Returns JWT token       │          │
│          │ <─────────────────────────────│          │
│          │    { accessToken: "eyJ..." }  │          │
│          │                               │          │
│          │    3. GET /api/users          │          │
│          │ ─────────────────────────────>│          │
│          │    Authorization: Bearer eyJ..│          │
│          │                               │          │
│          │    4. Returns user data       │          │
│          │ <─────────────────────────────│          │
└──────────┘                               └──────────┘
```

### 11.2 JwtTokenProvider

```java
// File: security/JwtTokenProvider.java
@Component
@Slf4j
public class JwtTokenProvider {
    
    @Value("${app.jwt.secret}")          // Inject from application.yaml
    private String jwtSecret;
    
    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;
    
    /**
     * Generate a JWT token for a user.
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        
        return Jwts.builder()
            .subject(email)              // Who the token is for
            .issuedAt(now)               // When it was issued
            .expiration(expiryDate)      // When it expires
            .signWith(getSigningKey())   // Sign with secret key
            .compact();                   // Build the token string
    }
    
    /**
     * Extract email from token.
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
        
        return claims.getSubject();
    }
    
    /**
     * Validate token (signature, expiration, etc.)
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
        }
        return false;
    }
    
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

### 11.3 JWT Authentication Filter

This filter runs on every request to check for and validate JWT tokens:

```java
// File: security/JwtAuthenticationFilter.java
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) 
                                    throws ServletException, IOException {
        try {
            // 1. Extract JWT from Authorization header
            String jwt = getJwtFromRequest(request);
            
            // 2. Validate token
            if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {
                // 3. Get user email from token
                String email = jwtTokenProvider.getEmailFromToken(jwt);
                
                // 4. Load user details from database
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
                
                // 5. Create authentication object
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );
                
                // 6. Store authentication in SecurityContext
                // (so it's available throughout the request)
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication", ex);
        }
        
        // 7. Continue with the filter chain
        filterChain.doFilter(request, response);
    }
    
    /**
     * Extract token from "Authorization: Bearer <token>" header
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);  // Remove "Bearer " prefix
        }
        return null;
    }
}
```

### 11.4 CustomUserDetailsService

```java
// File: security/CustomUserDetailsService.java
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Find user in database
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        
        // 2. Check if account is active
        if (!user.getIsActive()) {
            throw new UsernameNotFoundException("User account is disabled: " + email);
        }
        
        // 3. Return Spring Security's User object
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            user.getIsActive(),
            true,  // accountNonExpired
            true,  // credentialsNonExpired  
            true,  // accountNonLocked
            // Convert role to GrantedAuthority (ADMIN → ROLE_ADMIN)
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
```

---

## 12. DTOs (Data Transfer Objects)

DTOs are simple objects that carry data between layers. They're different from entities because:
- They don't map to database tables
- They can have different fields (e.g., exclude password)
- They define what gets sent to/from the client

### 12.1 ApiResponse (Standard Response Wrapper)

```java
// File: dto/common/ApiResponse.java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)  // Don't include null fields in JSON
public class ApiResponse<T> {
    
    private int status;           // HTTP status code (200, 404, etc.)
    private String message;       // Human-readable message
    private T result;             // The actual data (generic type)
    private Object metadata;      // Pagination info, etc.
    private LocalDateTime timestamp;
    
    // Factory methods for creating responses
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
            .status(200)
            .message("Success")
            .result(data)
            .timestamp(LocalDateTime.now())
            .build();
    }
    
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return ApiResponse.<T>builder()
            .status(status.value())
            .message(message)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
```

**Example JSON Output:**
```json
{
  "status": 200,
  "message": "Users retrieved successfully",
  "result": [
    {
      "userId": 1,
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "USER",
      "isActive": true
    }
  ],
  "metadata": {
    "page": 0,
    "size": 20,
    "totalElements": 1,
    "totalPages": 1
  },
  "timestamp": "2026-01-02T10:30:00"
}
```

### 12.2 Request DTOs with Validation

```java
// File: dto/auth/LoginRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    
    @NotBlank(message = "Email is required")        // Can't be null or empty
    @Email(message = "Invalid email format")        // Must be valid email
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
}
```

When the controller has `@Valid @RequestBody LoginRequest request`, Spring automatically validates and returns 400 Bad Request if validation fails.

### 12.3 UserDTO (Response)

```java
// File: dto/user/UserDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor  
@Builder
public class UserDTO {
    private Long userId;
    private String email;
    private String fullName;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Notice: NO password field - never expose passwords in responses!
}
```

---

## 13. Exception Handling

### 13.1 Custom Exceptions

```java
// File: exception/ResourceNotFoundException.java
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
    }
}

// File: exception/DuplicateResourceException.java
public class DuplicateResourceException extends RuntimeException {
    
    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s: '%s'", resourceName, fieldName, fieldValue));
    }
}
```

### 13.2 Global Exception Handler

```java
// File: exception/GlobalExceptionHandler.java
@RestControllerAdvice  // Applies to all @RestController classes
@Slf4j
public class GlobalExceptionHandler {
    
    /**
     * Handle 404 Not Found
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(
            ResourceNotFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(HttpStatus.NOT_FOUND, ex.getMessage()));
    }
    
    /**
     * Handle 409 Conflict (duplicate resource)
     */
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateResource(
            DuplicateResourceException ex) {
        log.warn("Duplicate resource: {}", ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ApiResponse.error(HttpStatus.CONFLICT, ex.getMessage()));
    }
    
    /**
     * Handle validation errors (400 Bad Request)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        log.warn("Validation failed: {}", errors);
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", errors));
    }
}
```

**Example Error Response:**
```json
{
  "status": 404,
  "message": "User not found with id: '999'",
  "result": null,
  "timestamp": "2026-01-02T10:30:00"
}
```

---

## 14. Data Flow: Complete Request Lifecycle

Let's trace a complete login request through the system:

### Step 1: HTTP Request Received

```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Step 2: Security Filter Chain

```
Request → CorsFilter → JwtAuthenticationFilter → SecurityFilterChain
                              │
                              └─ No JWT token in header (login endpoint)
                                 Continue without authentication
```

### Step 3: Controller

```java
// AuthController.java
@PostMapping("/login")
public ResponseEntity<ApiResponse<AuthResponse>> login(
        @Valid @RequestBody LoginRequest request) {
    //  1. Spring deserializes JSON → LoginRequest object
    //  2. @Valid triggers validation
    //  3. If valid, calls authService.login()
    
    AuthResponse authResponse = authService.login(request);
    return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
}
```

### Step 4: Service

```java
// AuthService.java
public AuthResponse login(LoginRequest request) {
    // 1. Spring Security authenticates user
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(email, password)
    );
    //    └─ This calls CustomUserDetailsService.loadUserByUsername()
    //       which queries the database for the user
    //       and verifies the password using BCryptPasswordEncoder
    
    // 2. Generate JWT token
    String token = jwtTokenProvider.generateToken(authentication);
    
    // 3. Get user from database
    User user = userRepository.findByEmail(email).orElseThrow(...);
    
    // 4. Build response
    return AuthResponse.builder()
        .accessToken(token)
        .tokenType("Bearer")
        .expiresIn(86400)
        .user(convertToDTO(user))
        .build();
}
```

### Step 5: Repository

```java
// UserRepository.java
Optional<User> findByEmail(String email);
//
// Spring Data JPA generates:
// SELECT * FROM users WHERE email = ?
```

### Step 6: Database Query

```sql
SELECT user_id, email, password, full_name, role, is_active, created_at, updated_at
FROM users
WHERE email = 'john@example.com'
```

### Step 7: Response

```json
{
  "status": 200,
  "message": "Login successful",
  "result": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "user": {
      "userId": 1,
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "USER",
      "isActive": true,
      "createdAt": "2026-01-01T00:00:00",
      "updatedAt": "2026-01-01T00:00:00"
    }
  },
  "timestamp": "2026-01-02T10:30:00"
}
```

---

## 15. Common Java Syntax Explained

### 15.1 Generics (The `<T>` Syntax)

```java
// T is a placeholder for any type
public class ApiResponse<T> {
    private T result;  // result can be any type
}

// Usage:
ApiResponse<UserDTO> response;        // T = UserDTO
ApiResponse<List<ProjectDTO>> list;   // T = List<ProjectDTO>
```

### 15.2 Optional

```java
// Optional is a container that may or may not contain a value
// Used to avoid null pointer exceptions

Optional<User> maybeUser = userRepository.findByEmail("john@example.com");

// Check if present and get value
if (maybeUser.isPresent()) {
    User user = maybeUser.get();
}

// Or use orElseThrow
User user = maybeUser.orElseThrow(() -> 
    new ResourceNotFoundException("User", "email", "john@example.com"));

// Or provide default
User user = maybeUser.orElse(new User());
```

### 15.3 Lambda Expressions

```java
// Long form
users.stream().filter(user -> {
    return user.getIsActive() == true;
}).collect(Collectors.toList());

// Short form (one expression)
users.stream()
    .filter(user -> user.getIsActive())
    .collect(Collectors.toList());

// Method reference (even shorter)
users.stream()
    .filter(User::getIsActive)
    .collect(Collectors.toList());
```

### 15.4 Streams

```java
// Convert list of entities to list of DTOs
List<UserDTO> userDTOs = userRepository.findAll()  // List<User>
    .stream()                                        // Stream<User>
    .map(this::convertToDTO)                        // Stream<UserDTO>
    .collect(Collectors.toList());                  // List<UserDTO>

// Filter and collect
List<User> activeAdmins = users.stream()
    .filter(u -> u.getIsActive())
    .filter(u -> u.getRole() == UserRole.ADMIN)
    .collect(Collectors.toList());
```

### 15.5 Builder Pattern

```java
// Without builder (hard to read with many fields)
User user = new User(null, "john@example.com", "password", "John Doe", 
                     UserRole.USER, true, null, null, null, null, null);

// With builder (much cleaner)
User user = User.builder()
    .email("john@example.com")
    .password("password")
    .fullName("John Doe")
    .role(UserRole.USER)
    .isActive(true)
    .build();
```

---

## 16. Lombok Annotations Guide

Lombok generates boilerplate code at compile time.

| Annotation | What it generates |
|------------|-------------------|
| `@Data` | `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, `@RequiredArgsConstructor` |
| `@Getter` | Getter methods for all fields |
| `@Setter` | Setter methods for all fields |
| `@NoArgsConstructor` | Constructor with no arguments |
| `@AllArgsConstructor` | Constructor with all fields as arguments |
| `@RequiredArgsConstructor` | Constructor with final and @NonNull fields |
| `@Builder` | Builder pattern |
| `@Slf4j` | Creates `log` variable for logging |
| `@ToString.Exclude` | Exclude field from toString() |
| `@EqualsAndHashCode.Exclude` | Exclude field from equals/hashCode |
| `@Builder.Default` | Set default value when using builder |

```java
// This class:
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String name;
}

// Becomes (at compile time):
public class User {
    private Long id;
    private String name;
    
    public User() {}
    public User(Long id, String name) { this.id = id; this.name = name; }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String toString() { return "User(id=" + id + ", name=" + name + ")"; }
    public boolean equals(Object o) { /* ... */ }
    public int hashCode() { /* ... */ }
    
    public static UserBuilder builder() { return new UserBuilder(); }
    // Plus the UserBuilder inner class
}
```

---

## 17. Spring Annotations Guide

### 17.1 Component Annotations (Bean Registration)

| Annotation | Purpose |
|------------|---------|
| `@Component` | Generic Spring-managed component |
| `@Service` | Business logic layer |
| `@Repository` | Data access layer |
| `@Controller` | Web controller (returns views) |
| `@RestController` | REST API controller (returns JSON) |
| `@Configuration` | Configuration class (defines @Bean methods) |

### 17.2 Dependency Injection

| Annotation | Purpose |
|------------|---------|
| `@Autowired` | Inject dependency (prefer constructor injection) |
| `@Qualifier` | Specify which bean to inject when multiple exist |
| `@Value` | Inject value from properties file |

### 17.3 Web/REST Annotations

| Annotation | Purpose |
|------------|---------|
| `@RequestMapping` | Map URL pattern to controller/method |
| `@GetMapping` | Handle GET requests |
| `@PostMapping` | Handle POST requests |
| `@PutMapping` | Handle PUT requests |
| `@DeleteMapping` | Handle DELETE requests |
| `@PathVariable` | Extract variable from URL path |
| `@RequestParam` | Extract query parameter |
| `@RequestBody` | Deserialize JSON body to object |
| `@ResponseBody` | Serialize return value to JSON |

### 17.4 JPA/Entity Annotations

| Annotation | Purpose |
|------------|---------|
| `@Entity` | Mark class as JPA entity |
| `@Table` | Specify table name |
| `@Id` | Mark primary key field |
| `@GeneratedValue` | Auto-generate ID value |
| `@Column` | Customize column mapping |
| `@OneToMany` | One-to-many relationship |
| `@ManyToOne` | Many-to-one relationship |
| `@ManyToMany` | Many-to-many relationship |
| `@JoinColumn` | Specify foreign key column |
| `@Enumerated` | How to store enums |
| `@CreationTimestamp` | Auto-set on creation |
| `@UpdateTimestamp` | Auto-set on update |

### 17.5 Validation Annotations

| Annotation | Purpose |
|------------|---------|
| `@Valid` | Trigger validation |
| `@NotNull` | Field cannot be null |
| `@NotBlank` | String cannot be null/empty/whitespace |
| `@NotEmpty` | Collection cannot be null/empty |
| `@Email` | Must be valid email format |
| `@Size` | String/collection size constraints |
| `@Min` / `@Max` | Numeric value constraints |
| `@Pattern` | Regex pattern matching |

### 17.6 Security Annotations

| Annotation | Purpose |
|------------|---------|
| `@EnableWebSecurity` | Enable Spring Security |
| `@EnableMethodSecurity` | Enable @PreAuthorize |
| `@PreAuthorize` | Check authorization before method |
| `@Secured` | Role-based security |

---

## Summary

The KBase backend follows a standard Spring Boot layered architecture:

1. **Controllers** receive HTTP requests, validate input, and return responses
2. **Services** contain business logic and coordinate operations
3. **Repositories** abstract database access using Spring Data JPA
4. **Entities** represent database tables
5. **DTOs** transfer data between layers without exposing internal structure
6. **Security** handles authentication (JWT) and authorization (roles)
7. **Exception Handlers** provide consistent error responses

The key to understanding this codebase is recognizing that Spring Boot does a lot of "magic" behind the scenes - dependency injection, auto-configuration, and code generation (via annotations) reduce boilerplate and let you focus on business logic.

---

## Quick Reference: API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | User registration | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/users` | List all users | Yes |
| GET | `/api/users/{id}` | Get user by ID | Yes |
| POST | `/api/users` | Create user | Admin only |
| PUT | `/api/users/{id}` | Update user | Yes |
| DELETE | `/api/users/{id}` | Delete user | Admin only |
| GET | `/api/projects` | List all projects | Yes |
| GET | `/api/projects/my` | Get user's projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| GET | `/api/documents` | List all documents | Yes |
| POST | `/api/documents` | Upload document | Yes |
| GET | `/api/admin/overview` | Database overview | Admin only |
