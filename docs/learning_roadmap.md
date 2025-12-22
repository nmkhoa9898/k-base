# KBase Project - Learning Roadmap
## A Step-by-Step Guide to Building a Knowledge Base System

---

## 📚 Overview

This roadmap guides you through building KBase - a project knowledge base system - while learning Java, Spring Boot, React, PostgreSQL, and related technologies. Each step includes:
- **What to Learn**: Key concepts and technologies
- **Why It Matters**: How it fits into the bigger picture
- **How to Implement**: Practical steps
- **Learning Resources**: Where to learn more
- **Common Pitfalls**: What to watch out for

---

## 🎯 Learning Objectives

By completing this project, you will learn:
- **Backend Development**: Java, Spring Boot, REST APIs, JPA/Hibernate
- **Database Management**: PostgreSQL, SQL queries, database design
- **Authentication & Security**: Spring Security, JWT, password hashing
- **File Management**: File uploads, object storage (MinIO/S3)
- **Frontend Development**: React/Next.js, TypeScript, UI design
- **DevOps**: Docker, containerization, deployment
- **Optional**: AI integration, Terraform, Kubernetes

---

# PHASE 1: FOUNDATION & SETUP (Week 1-2)

## Step 1: Set Up Your Development Environment

### What to Learn
- **Java Fundamentals**: OOP concepts, classes, interfaces, collections
- **Development Tools**: IDE usage, Maven/Gradle, Git basics
- **Environment Configuration**: PATH variables, JDK setup

### Why It Matters
A properly configured environment prevents hours of debugging later. Understanding Java fundamentals is essential for Spring Boot development.

### Implementation

#### 1.1. Install Java Development Kit (JDK)
```bash
# Visit: https://adoptium.net/
# Download: OpenJDK 17 or 21 (LTS versions)
```

**Learning Points:**
- **What is JDK?** Java Development Kit - contains tools to compile and run Java programs
- **Why LTS?** Long Term Support versions get updates for years
- **OpenJDK vs Oracle JDK?** OpenJDK is free and open-source; Oracle JDK requires licensing

**After Installation:**
```bash
# Verify installation
java -version  # Should show Java 17 or 21
javac -version # Should show compiler version

# Check JAVA_HOME (Windows PowerShell)
$env:JAVA_HOME
```

#### 1.2. Choose and Install an IDE

**Primary Recommendation: VS Code (Perfect for this project!)**

**Why VSCode?**
- ✅ **Free and lightweight** - No licensing costs
- ✅ **Excellent Java support** - Through extensions
- ✅ **Multi-language support** - Java, TypeScript, Python, SQL
- ✅ **Integrated terminal** - Run commands without leaving editor
- ✅ **Docker integration** - Manage containers directly
- ✅ **Git integration** - Built-in version control
- ✅ **Extensible** - Thousands of extensions for any need

**Install VS Code:**
1. Visit: https://code.visualstudio.com/
2. Download and install for your OS
3. Open VS Code

**Essential Extensions for KBase Project:**

**Java Development:**
- **Extension Pack for Java** (Microsoft) - Complete Java development kit
- **Spring Boot Extension Pack** (Pivotal) - Spring Boot support
- **Maven for Java** (Microsoft) - Maven integration

**Frontend Development:**
- **TypeScript and JavaScript Language Features** (Built-in)
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Tailwind CSS IntelliSense** - CSS framework support

**Database & Tools:**
- **PostgreSQL** (Microsoft) - Database management
- **Docker** (Microsoft) - Container management
- **GitLens** - Enhanced Git capabilities

**Python (for AI features):**
- **Python** (Microsoft) - Python language support
- **Pylance** - Fast Python language server

**Install Extensions:**
1. Open VS Code
2. Click Extensions icon (Ctrl+Shift+X)
3. Search and install each extension above
4. Restart VS Code

**Alternative Options:**
- **IntelliJ IDEA Community** - Excellent Spring Boot support, more resource-intensive
- **Eclipse** - Free, good for learning, less modern

**Learning Points:**
- VS Code provides auto-completion, debugging, and project management
- Extensions make VS Code as powerful as any dedicated IDE
- Learn keyboard shortcuts to boost productivity (Ctrl+P for file search, Ctrl+Shift+P for commands)

**VS Code Tips for Java Development:**
- Use **Java: Create Java Project** command (Ctrl+Shift+P) to create new projects
- **Java: Reload Projects** when you add dependencies
- **Debug Java** configurations are automatically created
- **Integrated terminal** for running Maven commands

#### 1.3. Install Git and Create GitHub Account

**Why?** Version control is essential for:
- Tracking changes
- Reverting mistakes
- Collaborating with others
- Showcasing your portfolio

**Practice Commands:**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Common Pitfalls
❌ **Installing 32-bit Java on 64-bit system**
❌ **Not setting JAVA_HOME correctly**
❌ **Using Java 8 (too old for Spring Boot 3.x)**
✅ Use Java 17 or 21 for Spring Boot 3.x

### Resources to Learn
- **Java Basics**: Oracle Java Tutorials (docs.oracle.com/javase/tutorial/)
- **Git**: Git Handbook (guides.github.com/introduction/git-handbook/)

---

## Step 2: Learn Java Fundamentals (If New to Java)

### What to Learn
Before diving into Spring Boot, ensure you understand:

#### Core Java Concepts:
1. **Data Types & Variables**: int, String, boolean, etc.
2. **Control Flow**: if/else, switch, for, while loops
3. **Methods**: Creating and calling functions
4. **OOP Basics**:
   - Classes and Objects
   - Inheritance
   - Polymorphism
   - Encapsulation
   - Abstraction
5. **Collections**: List, Set, Map, ArrayList, HashMap
6. **Exception Handling**: try-catch, custom exceptions
7. **Java Streams**: filter(), map(), collect() (important for modern Java)
8. **Lambda Expressions**: Arrow functions for functional programming

### Practice Projects
Before KBase, build these mini-projects:
1. **Todo List** (Console app) - Practice classes, lists, CRUD operations
2. **Student Management System** - Practice OOP, collections
3. **Simple File Reader** - Practice file I/O, exception handling

### Time Investment
- **If you know Java**: Skip to Step 3
- **If new to Java**: Spend 1-2 weeks on fundamentals
- **If familiar with another language**: Focus on Java-specific features (1 week)

### Resources
- **Book**: "Head First Java" by Kathy Sierra
- **Online**: Java Programming MOOC (mooc.fi)
- **Practice**: HackerRank Java exercises

---

## Step 3: Understand Databases and PostgreSQL

### What to Learn
- **Database Concepts**: Tables, rows, columns, primary keys, foreign keys
- **SQL Basics**: SELECT, INSERT, UPDATE, DELETE
- **Relationships**: One-to-many, many-to-many
- **Database Design**: Normalization, ER diagrams
- **PostgreSQL Specifics**: SERIAL, TIMESTAMP, array types

### Why It Matters
Your application needs persistent storage. Understanding database design prevents data inconsistencies and performance issues later.

### Implementation

#### 3.1. Install PostgreSQL

**Option 1: Docker (Recommended for Learning)**
```bash
# Install Docker Desktop first
docker run --name kbase-postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres:15
```

**Why Docker?**
- ✅ Easy to reset and start fresh
- ✅ No system-wide installation
- ✅ Learn Docker simultaneously
- ✅ Same environment as production

**Option 2: Direct Installation**
```
# Visit: https://www.postgresql.org/download/
# Install PostgreSQL 15 or 16
# Remember the postgres user password
```

#### 3.2. Install Database Client

**Options:**
- **pgAdmin** (comes with PostgreSQL) - Comprehensive GUI
- **DBeaver** (dbeaver.io) - Free, multi-database support
- **TablePlus** - Beautiful UI (free tier available)

**Learning Point:** Learn both GUI and command-line interaction

#### 3.3. Create Your First Database

**Using psql (command line):**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE kbase_db;

-- Connect to database
\c kbase_db

-- List databases
\l

-- List tables
\dt
```

**Using GUI:** Create database through pgAdmin/DBeaver interface

#### 3.4. Create KBase Tables

**Learning Exercise:** Before running the provided SQL, try designing tables yourself:

**Think through:**
1. What information does a User need?
2. How do we connect Projects to Users?
3. How do we represent "a user joins a project"?
4. What metadata do we need for uploaded files?

**Then, run the provided schema:**
```sql
-- 1. USERS Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'OWNER', 'USER')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROJECTS Table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PROJECT_MEMBERS Table (Many-to-Many relationship)
CREATE TABLE project_members (
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'MEMBER')),
    is_active BOOLEAN DEFAULT true,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id)  -- Composite primary key
);

-- 4. DOCUMENTS Table
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    uploaded_by INTEGER NOT NULL REFERENCES users(user_id),
    title VARCHAR(255),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Deep Dive - Understanding the Schema:**

**SERIAL:**
- Auto-incrementing integer
- PostgreSQL-specific (MySQL uses AUTO_INCREMENT)
- Perfect for primary keys

**REFERENCES (Foreign Key):**
- `owner_id REFERENCES users(user_id)` = "owner_id must exist in users table"
- Enforces data integrity
- Prevents orphaned records

**ON DELETE CASCADE:**
- When a user is deleted, their projects are also deleted
- Alternative: `ON DELETE SET NULL` - set foreign key to null instead

**CHECK Constraint:**
- `CHECK (role IN ('ADMIN', 'OWNER', 'USER'))` - Only allow these values
- Database-level validation (backup to application validation)

**Composite Primary Key:**
- `PRIMARY KEY (project_id, user_id)` - Both columns together form unique identifier
- Prevents duplicate memberships
- Common in many-to-many relationship tables

#### 3.5. Practice SQL Queries

**Insert Sample Data:**
```sql
-- Insert users
INSERT INTO users (email, password, full_name, role) 
VALUES 
    ('admin@kbase.com', 'hashed_password', 'Admin User', 'ADMIN'),
    ('john@kbase.com', 'hashed_password', 'John Doe', 'OWNER'),
    ('jane@kbase.com', 'hashed_password', 'Jane Smith', 'USER');

-- Insert project
INSERT INTO projects (project_name, description, owner_id)
VALUES ('My First Project', 'Learning KBase system', 2);

-- Add project member
INSERT INTO project_members (project_id, user_id, role)
VALUES (1, 3, 'MEMBER');
```

**Practice Queries:**
```sql
-- 1. Find all users
SELECT * FROM users;

-- 2. Find all active projects
SELECT * FROM projects WHERE is_active = true;

-- 3. Find all members of a project (JOIN)
SELECT u.full_name, pm.role
FROM project_members pm
JOIN users u ON pm.user_id = u.user_id
WHERE pm.project_id = 1;

-- 4. Find all projects owned by a user
SELECT p.project_name, p.description
FROM projects p
WHERE p.owner_id = 2;

-- 5. Count documents per project
SELECT p.project_name, COUNT(d.document_id) as doc_count
FROM projects p
LEFT JOIN documents d ON p.project_id = d.project_id
GROUP BY p.project_id, p.project_name;
```

**Learning Exercise - Write These Queries:**
1. Find all users who haven't joined any projects
2. List projects with more than 3 members
3. Find the user who uploaded the most documents
4. Calculate total storage used per project (SUM of file_size)
5. Find documents uploaded in the last 7 days

### Common Pitfalls
❌ **Forgetting foreign key constraints** - Leads to orphaned data
❌ **Not using indexes** - Slow queries on large datasets
❌ **Using SELECT *** - Bad practice, specify columns
❌ **Storing passwords in plain text** - NEVER do this!

### Resources
- **SQL Tutorial**: sqlzoo.net, mode.com/sql-tutorial
- **Database Design**: Database Design for Mere Mortals (book)
- **PostgreSQL Docs**: postgresql.org/docs/

---

# PHASE 2: BACKEND DEVELOPMENT (Week 3-6)

## Step 4: Create Your First Spring Boot Project

### What to Learn
- **Spring Boot Basics**: Auto-configuration, starter dependencies, application properties
- **Dependency Injection**: @Autowired, @Component, @Service
- **MVC Pattern**: Model-View-Controller architecture
- **REST APIs**: HTTP methods (GET, POST, PUT, DELETE), status codes

### Why It Matters
Spring Boot simplifies Java web development. Understanding its conventions and patterns is crucial for building professional applications.

### Implementation

#### 4.1. Create Project Using Spring Initializr

**Visit:** https://start.spring.io/

**Configuration:**
- **Project:** Maven (or Gradle - Maven is more common for beginners)
- **Language:** Java
- **Spring Boot:** 3.2.x (or latest stable)
- **Java:** 17 or 21
- **Packaging:** Jar
- **Group:** com.kbase (your organization)
- **Artifact:** kbase-backend
- **Name:** KBase Backend
- **Package name:** com.kbase.backend

**Dependencies to Add:**
1. **Spring Web** - For REST APIs
2. **Spring Data JPA** - Database ORM
3. **PostgreSQL Driver** - Database connection
4. **Lombok** - Reduce boilerplate code
5. **Spring Boot DevTools** - Auto-reload during development
6. **Validation** - Input validation

**Click Generate → Download ZIP → Extract → Open in VS Code**

**VS Code Development Workflow:**

**Essential Keyboard Shortcuts:**
- `Ctrl+P` - Quick file search
- `Ctrl+Shift+P` - Command palette
- `Ctrl+`` - Toggle integrated terminal
- `F5` - Start debugging
- `Ctrl+Shift+D` - Debug panel
- `Ctrl+Shift+X` - Extensions panel

**Running and Debugging:**
1. **Run Application:** Open terminal (`Ctrl+``) → `./mvnw spring-boot:run`
2. **Debug Application:** Press `F5` → Select "Java" → VS Code creates debug configuration
3. **Set Breakpoints:** Click left margin next to line numbers
4. **Debug Console:** View variables, call stack, and output

**Maven Commands in VS Code:**
- **Clean & Compile:** `./mvnw clean compile`
- **Run Tests:** `./mvnw test`
- **Package:** `./mvnw package`
- **Hot Reload:** With DevTools, changes auto-reload

**VS Code Java Features:**
- **Auto-completion** for Spring annotations
- **Go to Definition** (F12) for classes and methods
- **Find References** (Shift+F12) to see usage
- **Refactoring** support (rename, extract method)
- **Integrated Git** - commit, push, pull from UI

#### 4.3. Create Your First REST API

**Create PingController.java:**
```java
package com.kbase.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PingController {
    
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
```

**Understanding Annotations:**

**@RestController:**
- Marks class as REST API controller
- Combines @Controller + @ResponseBody
- Returns data (JSON, String) directly to client

**@RequestMapping("/api"):**
- Base path for all endpoints in this controller
- All methods will start with /api

**@GetMapping("/ping"):**
- Handles HTTP GET requests
- Full path: http://localhost:8080/api/ping
- Alternative: @PostMapping, @PutMapping, @DeleteMapping

**Run the Application:**
```bash
# Using Maven
./mvnw spring-boot:run

# Or run KbaseBackendApplication.java from IDE
```

**Test:**
```bash
# Visit in browser or use curl
curl http://localhost:8080/api/ping
# Should return: pong
```

**🎉 Congratulations!** You've created your first REST API!

### Learning Exercise: Enhance Ping Endpoint
```java
@GetMapping("/ping")
public Map<String, Object> ping() {
    Map<String, Object> response = new HashMap<>();
    response.put("status", "success");
    response.put("message", "pong");
    response.put("timestamp", LocalDateTime.now());
    return response;
}
```

**What changed?**
- Returns JSON object instead of plain string
- Spring Boot automatically converts Map to JSON
- Learn about Jackson (JSON library Spring Boot uses)

### Common Pitfalls
❌ **Port 8080 already in use** - Change port in application.properties: `server.port=8081`
❌ **Package structure wrong** - Controllers must be in same package or sub-package of main class
❌ **Lombok not working** - Enable annotation processing in IDE settings

### Resources
- **Spring Boot Docs**: spring.io/guides/gs/spring-boot/
- **Baeldung**: baeldung.com/spring-boot (excellent tutorials)
- **YouTube**: Amigoscode, Java Brains (Spring Boot playlists)

---

## Step 5: Connect Spring Boot to PostgreSQL

### What to Learn
- **JPA (Java Persistence API)**: Object-relational mapping standard
- **Hibernate**: JPA implementation (Spring Boot uses this)
- **Entities**: Java classes that map to database tables
- **Repositories**: Interfaces for database operations

### Why It Matters
Instead of writing SQL queries manually, JPA lets you work with Java objects. Hibernate converts them to SQL automatically.

### Implementation

#### 5.1. Configure Database Connection

**Edit src/main/resources/application.properties:**
```properties
# Database Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/kbase_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**Understanding Configuration:**

**spring.datasource.url:**
- `jdbc:postgresql://` - Driver protocol
- `localhost:5432` - Database server location
- `/kbase_db` - Database name

**spring.jpa.hibernate.ddl-auto=update:**
- **create**: Drop and create tables on startup (lose data!)
- **update**: Update schema without losing data (good for development)
- **validate**: Only check if schema matches (safe for production)
- **none**: Do nothing (manual schema management)

**spring.jpa.show-sql=true:**
- Prints SQL queries to console
- Great for learning and debugging
- Disable in production

#### 5.2. Create Entity Classes

**What are Entities?**
- Java classes that represent database tables
- Each instance = one row in the table
- Fields = columns

**Create User Entity (src/main/java/com/kbase/backend/entity/User.java):**
```java
package com.kbase.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String fullName;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

**Create UserRole Enum:**
```java
package com.kbase.backend.entity;

public enum UserRole {
    ADMIN,
    OWNER,
    USER
}
```

**Understanding Entity Annotations:**

**@Entity:**
- Marks class as JPA entity
- Hibernate will manage this class

**@Table(name = "users"):**
- Maps to "users" table in database
- Optional if class name matches table name

**@Data (Lombok):**
- Auto-generates: getters, setters, toString, equals, hashCode
- Saves hundreds of lines of code!

**@NoArgsConstructor, @AllArgsConstructor (Lombok):**
- No-argument constructor (required by JPA)
- All-argument constructor (convenience)

**@Id:**
- Marks primary key field
- Every entity must have one @Id

**@GeneratedValue(strategy = GenerationType.IDENTITY):**
- Auto-increment primary key
- Database generates value automatically
- IDENTITY strategy uses SERIAL in PostgreSQL

**@Column:**
- Maps field to database column
- Options: unique, nullable, length, name
- Optional if field name matches column name

**@Enumerated(EnumType.STRING):**
- Stores enum as String in database
- Alternative: EnumType.ORDINAL (stores as integer, not recommended)
- STRING is safer if you reorder enum values

**@CreationTimestamp, @UpdateTimestamp:**
- Automatically set timestamps
- CreationTimestamp: Set once on insert
- UpdateTimestamp: Updated on every save

**Why use LocalDateTime instead of Date?**
- Modern Java 8+ time API
- More intuitive and immutable
- Better timezone handling

#### 5.3. Create Project Entity

**src/main/java/com/kbase/backend/entity/Project.java:**
```java
package com.kbase.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;
    
    @Column(nullable = false)
    private String projectName;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

**Understanding Relationships:**

**@ManyToOne:**
- Many projects belong to one owner
- Creates foreign key in projects table
- Fetches related User object automatically

**@JoinColumn(name = "owner_id"):**
- Specifies foreign key column name
- Must match database schema

**FetchType.LAZY vs EAGER:**
- **LAZY**: Don't load owner until accessed (saves memory)
- **EAGER**: Load owner immediately with project
- Recommendation: Use LAZY by default, fetch explicitly when needed

**Learning Point - N+1 Problem:**
If you load 10 projects with LAZY loading and access owner of each:
- 1 query to get 10 projects
- 10 queries to get each owner
- Total: 11 queries (inefficient!)

**Solution:** Use JOIN FETCH in queries (you'll learn this later)

#### 5.4. Create Document Entity

**src/main/java/com/kbase/backend/entity/Document.java:**
```java
package com.kbase.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;
    
    private String title;
    
    @Column(nullable = false)
    private String fileName;
    
    @Column(nullable = false)
    private String fileType;
    
    @Column(nullable = false)
    private Long fileSize;
    
    @Column(nullable = false, length = 500)
    private String storagePath;
    
    private String mimeType;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

#### 5.5. Create ProjectMember Entity (Many-to-Many)

**src/main/java/com/kbase/backend/entity/ProjectMember.java:**
```java
package com.kbase.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMember {
    
    @EmbeddedId
    private ProjectMemberId id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    
    @Enumerated(EnumType.STRING)
    private ProjectMemberRole role = ProjectMemberRole.MEMBER;
    
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime joinedAt;
}
```

**Create Composite Key Class:**
```java
package com.kbase.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberId implements Serializable {
    private Long projectId;
    private Long userId;
}
```

**Create Enum:**
```java
package com.kbase.backend.entity;

public enum ProjectMemberRole {
    OWNER,
    MEMBER
}
```

**Understanding Composite Keys:**

**@EmbeddedId:**
- Use a separate class for composite primary key
- Must implement Serializable
- Must have equals() and hashCode() (Lombok provides this)

**@MapsId:**
- Maps embedded id field to relationship
- Tells JPA that projectId in the composite key comes from the project relationship

**Why is this complex?**
- Many-to-many with extra attributes (role, isActive, joinedAt)
- Can't use simple @ManyToMany annotation
- Need explicit join table entity

**Simpler Alternative (no extra fields):**
```java
// In User.java
@ManyToMany
@JoinTable(
    name = "project_members",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "project_id")
)
private Set<Project> projects;
```

But we need role and joinedAt, so we use the more complex approach.

#### 5.6. Run Application and Verify Tables

**Start your application:**
- Run KbaseBackendApplication.java
- Check console output
- Look for "Hibernate: create table..." messages

**Check PostgreSQL:**
```sql
-- In psql or database client
\dt  -- List tables

-- Verify schema
\d users
\d projects
\d project_members
\d documents
```

**If tables didn't auto-create:**
- Check application.properties (spring.jpa.hibernate.ddl-auto=update)
- Check database connection (look for connection errors in logs)
- Verify PostgreSQL is running

### Learning Exercise: Add Indexes

**Why Indexes?**
- Speed up queries on frequently searched columns
- Trade-off: Slower writes, more storage

**Add to Entity:**
```java
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_role", columnList = "role")
})
public class User {
    // ... fields
}
```

### Common Pitfalls
❌ **Circular dependencies in toString()** - Use @ToString(exclude = "owner") in Lombok
❌ **LazyInitializationException** - Accessing lazy field outside transaction
❌ **Wrong column names** - Use @Column(name = "exact_db_column")
❌ **Missing @JoinColumn** - Hibernate creates weird column names

### Resources
- **JPA Tutorial**: thoughts-on-java.org/jpa-getting-started/
- **Hibernate Guide**: hibernate.org/orm/documentation/
- **Baeldung JPA**: baeldung.com/learn-jpa-hibernate

---

## Step 6: Create Repository Interfaces

### What to Learn
- **Spring Data JPA**: Repository abstraction
- **CRUD Operations**: findById, findAll, save, deleteById
- **Query Methods**: Derive queries from method names
- **Custom Queries**: @Query annotation, JPQL

### Why It Matters
Repositories eliminate boilerplate database code. Spring Data JPA generates implementations automatically based on method names.

### Implementation

#### 6.1. Create UserRepository

**src/main/java/com/kbase/backend/repository/UserRepository.java:**
```java
package com.kbase.backend.repository;

import com.kbase.backend.entity.User;
import com.kbase.backend.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Spring Data JPA auto-implements these methods from method names
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(UserRole role);
    
    List<User> findByIsActive(Boolean isActive);
    
    List<User> findByFullNameContainingIgnoreCase(String name);
    
    boolean existsByEmail(String email);
}
```

**Understanding Repositories:**

**JpaRepository<User, Long>:**
- User: Entity type
- Long: Primary key type
- Provides built-in methods: findById, findAll, save, delete, count, etc.

**Method Name Query Derivation:**
Spring parses method names to generate queries automatically!

**Pattern:**
```
findBy + Field + Operation
```

**Examples:**
- `findByEmail` → `SELECT * FROM users WHERE email = ?`
- `findByRole` → `SELECT * FROM users WHERE role = ?`
- `findByFullNameContainingIgnoreCase` → `SELECT * FROM users WHERE LOWER(full_name) LIKE LOWER(?)`
- `existsByEmail` → `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)`

**Supported Keywords:**
- `findBy`, `readBy`, `getBy` - Retrieve data
- `deleteBy`, `removeBy` - Delete data
- `countBy` - Count results
- `Containing`, `Like` - Pattern matching
- `IgnoreCase` - Case-insensitive
- `OrderBy` - Sorting
- `And`, `Or` - Combine conditions
- `LessThan`, `GreaterThan`, `Between` - Comparisons

**Examples:**
```java
List<User> findByRoleAndIsActive(UserRole role, Boolean isActive);
// SELECT * FROM users WHERE role = ? AND is_active = ?

List<User> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
// SELECT * FROM users WHERE created_at BETWEEN ? AND ?

List<User> findTop10ByOrderByCreatedAtDesc();
// SELECT * FROM users ORDER BY created_at DESC LIMIT 10
```

**Optional<User>:**
- Container that may or may not contain a value
- Prevents NullPointerException
- Use `.isPresent()`, `.orElse()`, `.orElseThrow()`

#### 6.2. Create ProjectRepository

**src/main/java/com/kbase/backend/repository/ProjectRepository.java:**
```java
package com.kbase.backend.repository;

import com.kbase.backend.entity.Project;
import com.kbase.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    // Method name queries
    List<Project> findByOwner(User owner);
    
    List<Project> findByOwnerId(Long ownerId);
    
    List<Project> findByIsActive(Boolean isActive);
    
    List<Project> findByProjectNameContainingIgnoreCase(String name);
    
    // Custom JPQL query
    @Query("SELECT p FROM Project p WHERE p.owner.userId = :ownerId AND p.isActive = true")
    List<Project> findActiveProjectsByOwner(@Param("ownerId") Long ownerId);
    
    // Native SQL query
    @Query(value = "SELECT * FROM projects WHERE owner_id = :ownerId ORDER BY created_at DESC LIMIT :limit", 
           nativeQuery = true)
    List<Project> findRecentProjectsByOwner(@Param("ownerId") Long ownerId, @Param("limit") int limit);
}
```

**Understanding Custom Queries:**

**@Query - JPQL:**
- JPQL = Java Persistence Query Language
- Query entities and fields (not tables and columns)
- `FROM Project p` - Project is entity name, not table name
- `p.owner.userId` - Navigate relationships with dot notation

**@Query - Native SQL:**
- Use actual SQL
- `nativeQuery = true`
- Useful for complex queries or database-specific features
- Less portable across databases

**@Param:**
- Bind method parameters to query placeholders
- More readable than `?1, ?2` positional parameters

**When to use each:**
- **Method names**: Simple queries (equality, basic operations)
- **JPQL**: Medium complexity, relationship navigation
- **Native SQL**: Complex joins, database-specific functions, performance tuning

#### 6.3. Create DocumentRepository

**src/main/java/com/kbase/backend/repository/DocumentRepository.java:**
```java
package com.kbase.backend.repository;

import com.kbase.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    List<Document> findByProjectId(Long projectId);
    
    List<Document> findByUploadedById(Long userId);
    
    List<Document> findByFileType(String fileType);
    
    List<Document> findByProjectIdAndIsActive(Long projectId, Boolean isActive);
    
    List<Document> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(d.fileSize) FROM Document d WHERE d.project.projectId = :projectId")
    Long getTotalFileSizeByProject(Long projectId);
    
    @Query("SELECT d.fileType, COUNT(d) FROM Document d WHERE d.project.projectId = :projectId GROUP BY d.fileType")
    List<Object[]> getFileTypeDistribution(Long projectId);
}
```

#### 6.4. Create ProjectMemberRepository

**src/main/java/com/kbase/backend/repository/ProjectMemberRepository.java:**
```java
package com.kbase.backend.repository;

import com.kbase.backend.entity.ProjectMember;
import com.kbase.backend.entity.ProjectMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, ProjectMemberId> {
    
    List<ProjectMember> findByProjectId(Long projectId);
    
    List<ProjectMember> findByUserId(Long userId);
    
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.user.userId = :userId AND pm.isActive = true")
    List<ProjectMember> findActiveProjectsByUser(Long userId);
    
    @Query("SELECT COUNT(pm) FROM ProjectMember pm WHERE pm.project.projectId = :projectId AND pm.isActive = true")
    Long countActiveMembersByProject(Long projectId);
}
```

### Testing Repositories

**Create a simple test (optional but recommended):**

**src/test/java/com/kbase/backend/repository/UserRepositoryTest.java:**
```java
package com.kbase.backend.repository;

import com.kbase.backend.entity.User;
import com.kbase.backend.entity.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    public void testSaveAndFindUser() {
        // Create user
        User user = new User();
        user.setEmail("test@kbase.com");
        user.setPassword("password123");
        user.setFullName("Test User");
        user.setRole(UserRole.USER);
        
        // Save
        User saved = userRepository.save(user);
        
        // Find
        User found = userRepository.findByEmail("test@kbase.com").orElse(null);
        
        // Assert
        assertThat(found).isNotNull();
        assertThat(found.getFullName()).isEqualTo("Test User");
    }
}
```

**@DataJpaTest:**
- Configures in-memory database (H2) for testing
- Rolls back after each test
- Fast and isolated

### Learning Exercise: Write Complex Queries

**Challenge:**
```java
// Find users who are members of more than 3 projects
@Query("SELECT pm.user FROM ProjectMember pm GROUP BY pm.user HAVING COUNT(pm.project) > 3")
List<User> findUsersWithManyProjects();

// Find projects with total file size > 1GB
@Query("SELECT d.project FROM Document d GROUP BY d.project HAVING SUM(d.fileSize) > :sizeLimit")
List<Project> findProjectsExceedingSize(@Param("sizeLimit") Long sizeLimit);
```

### Common Pitfalls
❌ **Returning entities in DTOs** - Causes lazy loading issues
❌ **N+1 queries** - Use JOIN FETCH
❌ **Not using Optional** - Check isEmpty() before get()
❌ **Complex queries in method names** - Use @Query instead

### Resources
- **Spring Data JPA Docs**: spring.io/projects/spring-data-jpa
- **Baeldung**: baeldung.com/spring-data-jpa-query
- **Query Methods**: docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods

---

## Step 7: Create Service Layer and DTOs

### What to Learn
- **Service Layer**: Business logic separation
- **DTOs**: Data Transfer Objects for API layer
- **Dependency Injection**: @Autowired, constructor injection
- **Model Mapping**: Entity ↔ DTO conversion
- **Transaction Management**: @Transactional

### Why It Matters
Services encapsulate business logic and keep controllers thin. DTOs prevent exposing sensitive data and decouple API from database schema.

### Implementation

#### 7.1. Create DTO Classes

**Why DTOs?**
- ✅ Hide sensitive fields (password)
- ✅ Decouple API from database
- ✅ Prevent circular references in JSON
- ✅ Customize response structure
- ✅ Validate input separately from entities

**src/main/java/com/kbase/backend/dto/UserDTO.java:**
```java
package com.kbase.backend.dto;

import com.kbase.backend.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String email;
    private String fullName;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    // Note: No password field! Never expose passwords in responses
}
```

**Create Request DTOs for input:**
```java
package com.kbase.backend.dto;

import com.kbase.backend.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateUserRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotNull(message = "Role is required")
    private UserRole role;
}
```

**Understanding Validation Annotations:**
- `@NotBlank`: Not null, not empty, not only whitespace (for Strings)
- `@NotNull`: Not null (for any type)
- `@Email`: Valid email format
- `@Size(min, max)`: Length constraints
- `@Min`, `@Max`: Number constraints
- `@Pattern`: Regex validation

**src/main/java/com/kbase/backend/dto/ProjectDTO.java:**
```java
package com.kbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Long projectId;
    private String projectName;
    private String description;
    private Long ownerId;
    private String ownerName;    // Denormalized for convenience
    private Boolean isActive;
    private LocalDateTime createdAt;
}
```

**src/main/java/com/kbase/backend/dto/DocumentDTO.java:**
```java
package com.kbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {
    private Long documentId;
    private String title;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String storagePath;
    private String mimeType;
    private String description;
    private Long projectId;
    private String projectName;
    private Long uploadedBy;
    private String uploaderName;
    private LocalDateTime createdAt;
}
```

#### 7.2. Create Response Template

**Why Response Template?**
- Consistent API response format
- Easier to handle on frontend
- Include metadata (pagination, status)

**src/main/java/com/kbase/backend/dto/ResponseTemplate.java:**
```java
package com.kbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTemplate<T> {
    private int status;           // HTTP status code
    private String message;       // Success/error message
    private T data;               // Actual response data
    private Object metadata;      // Pagination, extra info
    
    // Static factory methods for convenience
    public static <T> ResponseTemplate<T> success(T data) {
        return new ResponseTemplate<>(200, "Success", data, null);
    }
    
    public static <T> ResponseTemplate<T> success(String message, T data) {
        return new ResponseTemplate<>(200, message, data, null);
    }
    
    public static <T> ResponseTemplate<T> error(int status, String message) {
        return new ResponseTemplate<>(status, message, null, null);
    }
}
```

**Example Usage:**
```json
{
  "status": 200,
  "message": "User created successfully",
  "data": {
    "userId": 1,
    "email": "user@kbase.com",
    "fullName": "John Doe",
    "role": "USER"
  },
  "metadata": null
}
```

#### 7.3. Create UserService

**src/main/java/com/kbase/backend/service/UserService.java:**
```java
package com.kbase.backend.service;

import com.kbase.backend.dto.CreateUserRequest;
import com.kbase.backend.dto.UserDTO;
import com.kbase.backend.entity.User;
import com.kbase.backend.entity.UserRole;
import com.kbase.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor  // Lombok: Creates constructor for final fields
@Transactional            // All methods run in transaction
public class UserService {
    
    private final UserRepository userRepository;
    // If needed: private final PasswordEncoder passwordEncoder;
    
    /**
     * Get all users
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    /**
     * Get user by ID
     */
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return convertToDTO(user);
    }
    
    /**
     * Get user by email
     */
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return convertToDTO(user);
    }
    
    /**
     * Create new user
     */
    public UserDTO createUser(CreateUserRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }
        
        // Create entity
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());  // TODO: Hash password
        user.setFullName(request.getFullName());
        user.setRole(request.getRole());
        user.setIsActive(true);
        
        // Save
        User saved = userRepository.save(user);
        
        return convertToDTO(saved);
    }
    
    /**
     * Update user
     */
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        
        // Update fields (only non-null values)
        if (userDTO.getFullName() != null) {
            user.setFullName(userDTO.getFullName());
        }
        if (userDTO.getRole() != null) {
            user.setRole(userDTO.getRole());
        }
        if (userDTO.getIsActive() != null) {
            user.setIsActive(userDTO.getIsActive());
        }
        
        User updated = userRepository.save(user);
        return convertToDTO(updated);
    }
    
    /**
     * Delete user (soft delete)
     */
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        
        // Soft delete: mark as inactive
        user.setIsActive(false);
        userRepository.save(user);
        
        // Hard delete: userRepository.deleteById(id);
    }
    
    /**
     * Get users by role
     */
    public List<UserDTO> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    // ===================
    // Helper Methods
    // ===================
    
    /**
     * Convert Entity to DTO
     */
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole());
        dto.setIsActive(user.getIsActive());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
```

**Understanding Service Annotations:**

**@Service:**
- Marks class as Spring service component
- Auto-detected by component scanning
- Registered as Spring bean

**@RequiredArgsConstructor (Lombok):**
- Creates constructor with all `final` fields
- Recommended for dependency injection (immutable)
- Better than @Autowired on fields

**@Transactional:**
- Wraps methods in database transaction
- Auto-commit on success, rollback on exception
- Can be at class or method level

**Understanding Transactions:**
```java
// Without @Transactional:
user.setFullName("New Name");
userRepository.save(user);
project.setOwner(user);
projectRepository.save(project);
// If second save fails, first change is already committed!

// With @Transactional:
// Both succeed or both rollback together
```

#### 7.4. Create Custom Exceptions

**src/main/java/com/kbase/backend/exception/ResourceNotFoundException.java:**
```java
package com.kbase.backend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

**src/main/java/com/kbase/backend/exception/DuplicateResourceException.java:**
```java
package com.kbase.backend.exception;

public class DuplicateResourceException extends RuntimeException {
    public class DuplicateResourceException(String message) {
        super(message);
    }
}
```

#### 7.5. Create ProjectService

**src/main/java/com/kbase/backend/service/ProjectService.java:**
```java
package com.kbase.backend.service;

import com.kbase.backend.dto.ProjectDTO;
import com.kbase.backend.entity.Project;
import com.kbase.backend.entity.User;
import com.kbase.backend.repository.ProjectRepository;
import com.kbase.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return convertToDTO(project);
    }
    
    public ProjectDTO createProject(Long ownerId, String name, String description) {
        User owner = userRepository.findById(ownerId)
            .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id: " + ownerId));
        
        Project project = new Project();
        project.setProjectName(name);
        project.setDescription(description);
        project.setOwner(owner);
        project.setIsActive(true);
        
        Project saved = projectRepository.save(project);
        return convertToDTO(saved);
    }
    
    public List<ProjectDTO> getProjectsByOwner(Long ownerId) {
        return projectRepository.findByOwnerId(ownerId)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setProjectId(project.getProjectId());
        dto.setProjectName(project.getProjectName());
        dto.setDescription(project.getDescription());
        dto.setOwnerId(project.getOwner().getUserId());
        dto.setOwnerName(project.getOwner().getFullName());
        dto.setIsActive(project.getIsActive());
        dto.setCreatedAt(project.getCreatedAt());
        return dto;
    }
}
```

### Learning Exercise: Use ModelMapper

**Manual mapping is tedious. Use ModelMapper library:**

**Add dependency to pom.xml:**
```xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.2.0</version>
</dependency>
```

**Create configuration:**
```java
package com.kbase.backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
```

**Use in Service:**
```java
@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    private UserDTO convertToDTO(User user) {
        return modelMapper.map(user, UserDTO.java);
    }
    
    private User convertToEntity(CreateUserRequest request) {
        return modelMapper.map(request, User.class);
    }
}
```

**Pros:**
- Less boilerplate code
- Automatic field mapping

**Cons:**
- Less control over mapping
- Can map unintended fields
- Harder to debug

**Recommendation:** Use ModelMapper for simple cases, manual mapping for complex transformations.

### Common Pitfalls
❌ **Returning entities from services** - Always return DTOs
❌ **Not validating input** - Use @Valid in controllers
❌ **Forgetting @Transactional** - Database changes may not persist
❌ **Circular references in DTOs** - Use @JsonIgnore or break relationship

### Resources
- **Service Layer Pattern**: baeldung.com/spring-service-layer
- **DTO Pattern**: baeldung.com/java-dto-pattern
- **ModelMapper**: modelmapper.org/getting-started

---

# PHASE 3: REST APIs AND CONTROLLERS (Week 7-8)

## Step 8: Create REST Controllers

### What to Learn
- **REST Principles**: HTTP methods, status codes, resource naming
- **Spring MVC**: @RestController, @RequestMapping, path variables
- **Request/Response Handling**: @RequestBody, @ResponseBody, @PathVariable
- **HTTP Status Codes**: 200 OK, 201 Created, 400 Bad Request, 404 Not Found
- **Exception Handling**: Global exception handler

### Why It Matters
Controllers are the entry point for your API. They handle HTTP requests and return responses. Well-designed APIs are crucial for frontend integration.

### Implementation

#### 8.1. Create UserController

**src/main/java/com/kbase/backend/controller/UserController.java:**
```java
package com.kbase.backend.controller;

import com.kbase.backend.dto.CreateUserRequest;
import com.kbase.backend.dto.ResponseTemplate;
import com.kbase.backend.dto.UserDTO;
import com.kbase.backend.entity.UserRole;
import com.kbase.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    /**
     * GET /api/users - Get all users
     */
    @GetMapping
    public ResponseTemplate<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseTemplate.success(users);
    }
    
    /**
     * GET /api/users/{id} - Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseTemplate<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseTemplate.success(user);
    }
    
    /**
     * GET /api/users/email/{email} - Get user by email
     */
    @GetMapping("/email/{email}")
    public ResponseTemplate<UserDTO> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.getUserByEmail(email);
        return ResponseTemplate.success(user);
    }
    
    /**
     * GET /api/users/role/{role} - Get users by role
     */
    @GetMapping("/role/{role}")
    public ResponseTemplate<List<UserDTO>> getUsersByRole(@PathVariable UserRole role) {
        List<UserDTO> users = userService.getUsersByRole(role);
        return ResponseTemplate.success(users);
    }
    
    /**
     * POST /api/users - Create new user
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseTemplate<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseTemplate.success("User created successfully", user);
    }
    
    /**
     * PUT /api/users/{id} - Update user
     */
    @PutMapping("/{id}")
    public ResponseTemplate<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        UserDTO updated = userService.updateUser(id, userDTO);
        return ResponseTemplate.success("User updated successfully", updated);
    }
    
    /**
     * DELETE /api/users/{id} - Delete user
     */
    @DeleteMapping("/{id}")
    public ResponseTemplate<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseTemplate.success("User deleted successfully", null);
    }
}
```

**Understanding Controller Annotations:**

**@RestController:**
- Combines @Controller + @ResponseBody
- All methods return JSON by default
- No need for @ResponseBody on each method

**@RequestMapping("/api/users"):**
- Base path for all endpoints in this controller
- All methods inherit this path

**@GetMapping("/{id}"):**
- HTTP GET method
- Path: /api/users/{id}
- @PathVariable extracts {id} from URL

**@PostMapping:**
- HTTP POST method
- Used for creating resources
- @RequestBody reads JSON from request body

**@Valid:**
- Triggers validation on @RequestBody
- Throws MethodArgumentNotValidException if validation fails

**@ResponseStatus(HttpStatus.CREATED):**
- Sets HTTP status code to 201
- Default is 200 OK

**Learning Point - REST Conventions:**

**Resource Naming:**
- Use nouns, not verbs: `/users` not `/getUsers`
- Use plural: `/users` not `/user`
- Hierarchical: `/projects/{id}/documents`

**HTTP Methods:**
- **GET**: Retrieve data (safe, idempotent)
- **POST**: Create new resource (not idempotent)
- **PUT**: Update entire resource (idempotent)
- **PATCH**: Partial update (not idempotent)
- **DELETE**: Remove resource (idempotent)

**Status Codes:**
- **200 OK**: Success
- **201 Created**: Resource created
- **204 No Content**: Success, no response body
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource already exists
- **500 Internal Server Error**: Server error

#### 8.2. Create ProjectController

**src/main/java/com/kbase/backend/controller/ProjectController.java:**
```java
package com.kbase.backend.controller;

import com.kbase.backend.dto.ProjectDTO;
import com.kbase.backend.dto.ResponseTemplate;
import com.kbase.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    
    private final ProjectService projectService;
    
    @GetMapping
    public ResponseTemplate<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseTemplate.success(projects);
    }
    
    @GetMapping("/{id}")
    public ResponseTemplate<ProjectDTO> getProjectById(@PathVariable Long id) {
        ProjectDTO project = projectService.getProjectById(id);
        return ResponseTemplate.success(project);
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseTemplate<List<ProjectDTO>> getProjectsByOwner(@PathVariable Long ownerId) {
        List<ProjectDTO> projects = projectService.getProjectsByOwner(ownerId);
        return ResponseTemplate.success(projects);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseTemplate<ProjectDTO> createProject(
            @RequestParam Long ownerId,
            @RequestParam String name,
            @RequestParam(required = false) String description) {
        
        ProjectDTO project = projectService.createProject(ownerId, name, description);
        return ResponseTemplate.success("Project created successfully", project);
    }
    
    @PutMapping("/{id}")
    public ResponseTemplate<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updated = projectService.updateProject(id, projectDTO);
        return ResponseTemplate.success("Project updated successfully", updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseTemplate<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseTemplate.success("Project deleted successfully", null);
    }
}
```

**Understanding @RequestParam:**
- Extracts query parameters: `/api/projects?ownerId=1&name=MyProject`
- `required = false`: Parameter is optional
- Alternative to @RequestBody for simple forms

#### 8.3. Create DocumentController

**src/main/java/com/kbase/backend/controller/DocumentController.java:**
```java
package com.kbase.backend.controller;

import com.kbase.backend.dto.DocumentDTO;
import com.kbase.backend.dto.ResponseTemplate;
import com.kbase.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    
    private final DocumentService documentService;
    
    @GetMapping
    public ResponseTemplate<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseTemplate.success(documents);
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseTemplate<List<DocumentDTO>> getDocumentsByProject(@PathVariable Long projectId) {
        List<DocumentDTO> documents = documentService.getDocumentsByProject(projectId);
        return ResponseTemplate.success(documents);
    }
    
    @GetMapping("/{id}")
    public ResponseTemplate<DocumentDTO> getDocumentById(@PathVariable Long id) {
        DocumentDTO document = documentService.getDocumentById(id);
        return ResponseTemplate.success(document);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseTemplate<DocumentDTO> createDocument(@RequestBody DocumentDTO documentDTO) {
        DocumentDTO document = documentService.createDocument(documentDTO);
        return ResponseTemplate.success("Document created successfully", document);
    }
    
    @DeleteMapping("/{id}")
    public ResponseTemplate<String> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseTemplate.success("Document deleted successfully", null);
    }
}
```

#### 8.4. Create Global Exception Handler

**src/main/java/com/kbase/backend/exception/GlobalExceptionHandler.java:**
```java
package com.kbase.backend.exception;

import com.kbase.backend.dto.ResponseTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * Handle resource not found exceptions
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseTemplate<String>> handleNotFound(ResourceNotFoundException ex) {
        ResponseTemplate<String> response = ResponseTemplate.error(
            HttpStatus.NOT_FOUND.value(), 
            ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    /**
     * Handle duplicate resource exceptions
     */
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ResponseTemplate<String>> handleDuplicate(DuplicateResourceException ex) {
        ResponseTemplate<String> response = ResponseTemplate.error(
            HttpStatus.CONFLICT.value(), 
            ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }
    
    /**
     * Handle validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseTemplate<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        ResponseTemplate<Map<String, String>> response = ResponseTemplate.error(
            HttpStatus.BAD_REQUEST.value(), 
            "Validation failed"
        );
        response.setData(errors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    /**
     * Handle all other exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseTemplate<String>> handleGeneral(Exception ex) {
        ResponseTemplate<String> response = ResponseTemplate.error(
            HttpStatus.INTERNAL_SERVER_ERROR.value(), 
            "An unexpected error occurred"
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**Understanding @RestControllerAdvice:**

**@RestControllerAdvice:**
- Global exception handler for all controllers
- Catches exceptions thrown by any controller method
- Returns consistent error responses

**Exception Handling Flow:**
1. Controller method throws exception
2. Spring looks for @ExceptionHandler matching exception type
3. Handler method executes and returns ResponseEntity
4. Client receives error response

**Learning Point - Error Response Structure:**
```json
{
  "status": 404,
  "message": "User not found with id: 123",
  "data": null,
  "metadata": null
}
```

### Testing Your APIs

**Use Postman or curl:**

**Create User:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@kbase.com",
    "password": "password123",
    "fullName": "John Doe",
    "role": "OWNER"
  }'
```

**Get All Users:**
```bash
curl http://localhost:8080/api/users
```

**Create Project:**
```bash
curl -X POST "http://localhost:8080/api/projects?ownerId=1&name=My%20Project&description=First%20project"
```

### Learning Exercise: Add Pagination

**Modify UserController:**
```java
@GetMapping
public ResponseTemplate<Page<UserDTO>> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String sortDir) {
    
    Pageable pageable = PageRequest.of(page, size, 
        Sort.by(sortDir.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy));
    
    Page<UserDTO> users = userService.getAllUsers(pageable);
    return ResponseTemplate.success(users);
}
```

**Modify UserService:**
```java
public Page<UserDTO> getAllUsers(Pageable pageable) {
    return userRepository.findAll(pageable)
        .map(this::convertToDTO);
}
```

**Response includes pagination metadata:**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "content": [...],
    "pageable": {...},
    "totalElements": 25,
    "totalPages": 3,
    "size": 10,
    "number": 0
  }
}
```

### Common Pitfalls
❌ **Returning ResponseEntity everywhere** - Use ResponseTemplate for consistency
❌ **Not handling exceptions** - Clients get 500 errors instead of meaningful messages
❌ **Using wrong HTTP methods** - POST for updates, GET for modifications
❌ **Not validating input** - Invalid data reaches database

### Resources
- **REST API Design**: restfulapi.net
- **Spring MVC**: docs.spring.io/spring-framework/docs/current/reference/html/web.html
- **HTTP Status Codes**: developer.mozilla.org/en-US/docs/Web/HTTP/Status

---

# PHASE 4: AUTHENTICATION AND SECURITY (Week 9-10)

## Step 9: Implement Authentication

### What to Learn
- **Spring Security**: Framework for authentication and authorization
- **JWT (JSON Web Tokens)**: Stateless authentication tokens
- **Password Hashing**: BCrypt for secure password storage
- **Security Configuration**: Protecting endpoints, CORS, CSRF

### Why It Matters
Without authentication, anyone can access your API. Security is fundamental for any real application.

### Implementation

#### 9.1. Add Security Dependencies

**pom.xml:**
```xml
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Password Encoding -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
</dependency>
```

#### 9.2. Create JWT Utility Class

**src/main/java/com/kbase/backend/security/JwtUtil.java:**
```java
package com.kbase.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    /**
     * Generate JWT token for user
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    /**
     * Create token with claims
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    /**
     * Extract username from token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    /**
     * Extract expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    /**
     * Extract specific claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    /**
     * Extract all claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Check if token is expired
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    /**
     * Validate token
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
```

#### 9.3. Create UserDetailsService

**src/main/java/com/kbase/backend/security/UserDetailsServiceImpl.java:**
```java
package com.kbase.backend.security;

import com.kbase.backend.entity.User;
import com.kbase.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.getIsActive())
                .build();
    }
}
```

#### 9.4. Create Authentication Controller

**src/main/java/com/kbase/backend/controller/AuthController.java:**
```java
package com.kbase.backend.controller;

import com.kbase.backend.dto.AuthRequest;
import com.kbase.backend.dto.AuthResponse;
import com.kbase.backend.dto.CreateUserRequest;
import com.kbase.backend.dto.ResponseTemplate;
import com.kbase.backend.dto.UserDTO;
import com.kbase.backend.security.JwtUtil;
import com.kbase.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * POST /api/auth/register - Register new user
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseTemplate<UserDTO> register(@Valid @RequestBody CreateUserRequest request) {
        // Hash password before saving
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        
        UserDTO user = userService.createUser(request);
        return ResponseTemplate.success("User registered successfully", user);
    }
    
    /**
     * POST /api/auth/login - Login user
     */
    @PostMapping("/login")
    public ResponseTemplate<AuthResponse> login(@RequestBody AuthRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        // Generate JWT token
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        
        // Get user info
        UserDTO user = userService.getUserByEmail(request.getEmail());
        
        AuthResponse response = new AuthResponse(token, user);
        return ResponseTemplate.success("Login successful", response);
    }
}
```

**Create DTOs:**

**AuthRequest.java:**
```java
package com.kbase.backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
```

**AuthResponse.java:**
```java
package com.kbase.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDTO user;
}
```

#### 9.5. Create JWT Authentication Filter

**src/main/java/com/kbase/backend/security/JwtAuthenticationFilter.java:**
```java
package com.kbase.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        jwt = authHeader.substring(7); // Remove "Bearer " prefix
        userEmail = jwtUtil.extractUsername(jwt);
        
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
```

#### 9.6. Configure Security

**src/main/java/com/kbase/backend/config/SecurityConfig.java:**
```java
package com.kbase.backend.config;

import com.kbase.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Disable CSRF for stateless API
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()  // Public auth endpoints
                .requestMatchers("/api/ping").permitAll()     // Public ping
                .anyRequest().authenticated()                 // All others require auth
            )
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // JWT is stateless
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

#### 9.7. Update Application Properties

**application.properties:**
```properties
# JWT Configuration
jwt.secret=mySecretKeyThatIsAtLeast256BitsLongForHS256Algorithm
jwt.expiration=86400000  # 24 hours in milliseconds
```

**Learning Point - JWT Security:**
- **Secret Key**: Must be at least 256 bits (32 characters) for HS256
- **Expiration**: Short-lived tokens (24 hours) for security
- **HTTPS**: Always use HTTPS in production
- **Refresh Tokens**: For longer sessions (advanced)

### Testing Authentication

**Register User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@kbase.com",
    "password": "password123",
    "fullName": "John Doe",
    "role": "OWNER"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@kbase.com",
    "password": "password123"
  }'
```

**Use Token:**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/users
```

### Learning Exercise: Add Role-Based Access

**Protect endpoints by role:**
```java
// In SecurityConfig
.requestMatchers("/api/admin/**").hasRole("ADMIN")
.requestMatchers("/api/projects").hasAnyRole("OWNER", "ADMIN")

// In controllers
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/stats")
public ResponseTemplate<StatsDTO> getAdminStats() {
    // Only admins can access
}
```

**Add @PreAuthorize dependency:**
```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-config</artifactId>
</dependency>
```

**Enable method security:**
```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    // ...
}
```

### Common Pitfalls
❌ **Storing plain text passwords** - Always hash with BCrypt
❌ **No token expiration** - Tokens should expire
❌ **Weak secret keys** - Use strong, random keys
❌ **Not validating tokens** - Check expiration and signature

### Resources
- **Spring Security**: spring.io/projects/spring-security
- **JWT**: jwt.io/introduction
- **BCrypt**: docs.spring.io/spring-security/reference/features/authentication/password-storage.html

---

# PHASE 5: FILE UPLOAD AND STORAGE (Week 11-12)

## Step 10: Implement File Upload

### What to Learn
- **Multipart File Upload**: Handling file uploads in Spring
- **File Storage**: Local storage vs cloud storage (MinIO/S3)
- **File Validation**: Size limits, type checking, security
- **File Metadata**: Storing file information in database

### Why It Matters
File upload is core to KBase. Users need to upload documents, images, and videos.

### Implementation

#### 10.1. Configure File Upload

**application.properties:**
```properties
# File Upload Configuration
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
spring.servlet.multipart.file-size-threshold=1KB

# File Storage
app.upload.dir=uploads/
app.upload.max-size=52428800  # 50MB in bytes
```

#### 10.2. Create File Storage Service

**src/main/java/com/kbase/backend/service/FileStorageService.java:**
```java
package com.kbase.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    
    @Value("${app.upload.dir}")
    private String uploadDir;
    
    @Value("${app.upload.max-size}")
    private long maxFileSize;
    
    /**
     * Store uploaded file
     */
    public String storeFile(MultipartFile file) throws IOException {
        // Validate file
        validateFile(file);
        
        // Create unique filename
        String fileName = generateUniqueFileName(file.getOriginalFilename());
        
        // Create directory if not exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Copy file to destination
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        return fileName;
    }
    
    /**
     * Delete file
     */
    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        Files.deleteIfExists(filePath);
    }
    
    /**
     * Get file path
     */
    public Path getFilePath(String fileName) {
        return Paths.get(uploadDir).resolve(fileName);
    }
    
    /**
     * Validate file
     */
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        
        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds maximum limit");
        }
        
        // Check file type (basic validation)
        String contentType = file.getContentType();
        if (contentType == null || 
            (!contentType.startsWith("image/") && 
             !contentType.startsWith("application/") && 
             !contentType.equals("text/plain"))) {
            throw new IllegalArgumentException("Invalid file type");
        }
    }
    
    /**
     * Generate unique filename
     */
    private String generateUniqueFileName(String originalFilename) {
        String extension = getFileExtension(originalFilename);
        return UUID.randomUUID().toString() + "." + extension;
    }
    
    /**
     * Get file extension
     */
    private String getFileExtension(String filename) {
        if (filename == null) return "";
        int lastDotIndex = filename.lastIndexOf(".");
        return lastDotIndex == -1 ? "" : filename.substring(lastDotIndex + 1);
    }
}
```

#### 10.3. Update DocumentService for File Upload

**src/main/java/com/kbase/backend/service/DocumentService.java:**
```java
package com.kbase.backend.service;

import com.kbase.backend.dto.DocumentDTO;
import com.kbase.backend.entity.Document;
import com.kbase.backend.entity.Project;
import com.kbase.backend.entity.User;
import com.kbase.backend.repository.DocumentRepository;
import com.kbase.backend.repository.ProjectRepository;
import com.kbase.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DocumentService {
    
    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    
    public List<DocumentDTO> getAllDocuments() {
        return documentRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public DocumentDTO getDocumentById(Long id) {
        Document document = documentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        return convertToDTO(document);
    }
    
    public List<DocumentDTO> getDocumentsByProject(Long projectId) {
        return documentRepository.findByProjectIdAndIsActive(projectId, true)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public DocumentDTO uploadDocument(Long projectId, Long userId, MultipartFile file, String title, String description) throws IOException {
        // Validate project and user
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // Store file
        String storedFileName = fileStorageService.storeFile(file);
        
        // Create document record
        Document document = new Document();
        document.setProject(project);
        document.setUploadedBy(user);
        document.setTitle(title != null ? title : file.getOriginalFilename());
        document.setFileName(file.getOriginalFilename());
        document.setFileType(getFileType(file.getOriginalFilename()));
        document.setFileSize(file.getSize());
        document.setStoragePath(storedFileName);
        document.setMimeType(file.getContentType());
        document.setDescription(description);
        document.setIsActive(true);
        
        Document saved = documentRepository.save(document);
        return convertToDTO(saved);
    }
    
    public void deleteDocument(Long id) throws IOException {
        Document document = documentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        
        // Delete file from storage
        fileStorageService.deleteFile(document.getStoragePath());
        
        // Soft delete record
        document.setIsActive(false);
        documentRepository.save(document);
    }
    
    private String getFileType(String filename) {
        if (filename == null) return "unknown";
        
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        
        switch (extension) {
            case "pdf": return "PDF";
            case "doc": case "docx": return "WORD";
            case "xls": case "xlsx": return "EXCEL";
            case "ppt": case "pptx": return "POWERPOINT";
            case "jpg": case "jpeg": case "png": case "gif": return "IMAGE";
            case "mp4": case "mov": case "avi": return "VIDEO";
            case "md": case "txt": return "TEXT";
            default: return "OTHER";
        }
    }
    
    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setDocumentId(document.getDocumentId());
        dto.setTitle(document.getTitle());
        dto.setFileName(document.getFileName());
        dto.setFileType(document.getFileType());
        dto.setFileSize(document.getFileSize());
        dto.setStoragePath(document.getStoragePath());
        dto.setMimeType(document.getMimeType());
        dto.setDescription(document.getDescription());
        dto.setProjectId(document.getProject().getProjectId());
        dto.setProjectName(document.getProject().getProjectName());
        dto.setUploadedBy(document.getUploadedBy().getUserId());
        dto.setUploaderName(document.getUploadedBy().getFullName());
        dto.setCreatedAt(document.getCreatedAt());
        return dto;
    }
}
```

#### 10.4. Update DocumentController for Upload

**src/main/java/com/kbase/backend/controller/DocumentController.java:**
```java
package com.kbase.backend.controller;

import com.kbase.backend.dto.DocumentDTO;
import com.kbase.backend.dto.ResponseTemplate;
import com.kbase.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    
    private final DocumentService documentService;
    private final FileStorageService fileStorageService;
    
    @GetMapping
    public ResponseTemplate<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseTemplate.success(documents);
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseTemplate<List<DocumentDTO>> getDocumentsByProject(@PathVariable Long projectId) {
        List<DocumentDTO> documents = documentService.getDocumentsByProject(projectId);
        return ResponseTemplate.success(documents);
    }
    
    @GetMapping("/{id}")
    public ResponseTemplate<DocumentDTO> getDocumentById(@PathVariable Long id) {
        DocumentDTO document = documentService.getDocumentById(id);
        return ResponseTemplate.success(document);
    }
    
    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseTemplate<DocumentDTO> uploadDocument(
            @RequestParam Long projectId,
            @RequestParam Long userId,
            @RequestParam MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description) throws IOException {
        
        DocumentDTO document = documentService.uploadDocument(projectId, userId, file, title, description);
        return ResponseTemplate.success("Document uploaded successfully", document);
    }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) throws IOException {
        DocumentDTO document = documentService.getDocumentById(id);
        
        Path filePath = fileStorageService.getFilePath(document.getStoragePath());
        byte[] fileContent = Files.readAllBytes(filePath);
        
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(document.getMimeType()))
            .header("Content-Disposition", "attachment; filename=\"" + document.getFileName() + "\"")
            .body(fileContent);
    }
    
    @DeleteMapping("/{id}")
    public ResponseTemplate<String> deleteDocument(@PathVariable Long id) throws IOException {
        documentService.deleteDocument(id);
        return ResponseTemplate.success("Document deleted successfully", null);
    }
}
```

### Testing File Upload

**Upload File:**
```bash
curl -X POST http://localhost:8080/api/documents/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "projectId=1" \
  -F "userId=1" \
  -F "file=@/path/to/your/file.pdf" \
  -F "title=My Document" \
  -F "description=Sample document"
```

**Download File:**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -o downloaded_file.pdf \
  http://localhost:8080/api/documents/download/1
```

### Learning Exercise: Add File Preview

**For images and PDFs, add preview endpoint:**
```java
@GetMapping("/preview/{id}")
public ResponseEntity<byte[]> previewDocument(@PathVariable Long id) throws IOException {
    DocumentDTO document = documentService.getDocumentById(id);
    
    // Only allow preview for certain file types
    if (!document.getFileType().equals("IMAGE") && !document.getFileType().equals("PDF")) {
        throw new IllegalArgumentException("Preview not available for this file type");
    }
    
    Path filePath = fileStorageService.getFilePath(document.getStoragePath());
    byte[] fileContent = Files.readAllBytes(filePath);
    
    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(document.getMimeType()))
        .header("Content-Disposition", "inline; filename=\"" + document.getFileName() + "\"")
        .body(fileContent);
}
```

**inline vs attachment:**
- **inline**: Display in browser (images, PDFs)
- **attachment**: Force download

### Common Pitfalls
❌ **No file size limits** - Can cause memory issues
❌ **Storing files in database** - Use file system or cloud storage
❌ **No file type validation** - Security risk
❌ **Hardcoded file paths** - Use configuration

### Resources
- **File Upload**: docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-multipart
- **File Storage**: cloud.google.com/storage/docs/best-practices
- **Security**: owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload

---

# PHASE 6: FRONTEND DEVELOPMENT (Week 13-16)

## Step 11: Create React Frontend

### What to Learn
- **React Fundamentals**: Components, props, state, hooks
- **Modern React**: Hooks, functional components, JSX
- **HTTP Client**: Axios for API calls
- **Routing**: React Router for navigation
- **UI Framework**: Tailwind CSS for styling
- **State Management**: Context API or Redux

### Why It Matters
Users need a web interface to interact with your backend. A good frontend makes your application usable.

### Implementation

#### 11.1. Set Up React Project

**Create new project:**
```bash
npx create-react-app kbase-frontend --template typescript
cd kbase-frontend
```

**Install dependencies:**
```bash
npm install axios react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind CSS (tailwind.config.js):**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Update src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**VS Code React Development Setup:**

**Essential Extensions (already mentioned in IDE setup):**
- **TypeScript and JavaScript Language Features** (Built-in)
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Tailwind CSS IntelliSense** - CSS framework support
- **Auto Rename Tag** - Auto-rename paired HTML/JSX tags
- **Bracket Pair Colorizer 2** - Colorize matching brackets

**VS Code React Features:**
- **IntelliSense** for React components and props
- **Auto-import** suggestions
- **JSX syntax highlighting** and formatting
- **Built-in TypeScript support** for type checking
- **Live Server** extension for quick HTML preview

**Running React in VS Code:**
1. Open integrated terminal (`Ctrl+``)
2. Run `npm start` - starts development server on http://localhost:3000
3. VS Code will auto-open browser
4. Hot reload works automatically - changes reflect instantly

**Debugging React in VS Code:**
1. Press `F5` → Select "Chrome" or "Edge"
2. VS Code launches browser with debugger attached
3. Set breakpoints in React code
4. Debug console shows component state and props

**src/services/api.ts:**
```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

#### 11.3. Create Auth Context

**src/contexts/AuthContext.tsx:**
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  userId: number;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

#### 11.4. Create Login/Register Components

**src/components/Auth/Login.tsx:**
```typescript
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to KBase
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

#### 11.5. Create Dashboard Component

**src/components/Dashboard.tsx:**
```typescript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface Project {
  projectId: number;
  projectName: string;
  description: string;
  ownerName: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">KBase Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.fullName}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Create Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.projectId} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {project.projectName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Owner: {project.ownerName}</span>
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3">
                    <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                      View Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
```

#### 11.6. Set Up Routing

**src/App.tsx:**
```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
```

### Running the Frontend

**Start development server:**
```bash
npm start
```

**The app will run on http://localhost:3000**

### Learning Exercise: Add File Upload Component

**src/components/FileUpload.tsx:**
```typescript
import React, { useState, useRef } from 'react';
import api from '../services/api';

interface FileUploadProps {
  projectId: number;
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ projectId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId.toString());
      formData.append('userId', '1'); // Get from auth context
      formData.append('title', file.name);
      
      await api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="text-gray-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            Uploading...
          </div>
        ) : (
          <div className="text-gray-600">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500">PDF, Word, Excel, images up to 50MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
```

### Common Pitfalls
❌ **Not handling loading states** - Users don't know what's happening
❌ **No error handling** - Silent failures confuse users
❌ **Storing JWT in localStorage** - Vulnerable to XSS (use httpOnly cookies in production)
❌ **No protected routes** - Users can access pages without authentication

### Resources
- **React Docs**: react.dev/learn
- **React Router**: reactrouter.com/en/main
- **Tailwind CSS**: tailwindcss.com/docs
- **Axios**: axios-http.com/docs/intro

---

# PHASE 7: AI INTEGRATION (OPTIONAL) (Week 17-18)

## Step 12: Add AI Chatbot

### What to Learn
- **Python Fundamentals**: If new to Python
- **Document Processing**: Extract text from PDFs, images
- **Vector Databases**: Store and search document embeddings
- **LLM Integration**: Use OpenAI or Hugging Face models
- **API Integration**: Connect Python backend to Java

### Why It Matters
AI chatbot makes KBase smart - users can ask questions about their documents instead of searching manually.

### Implementation

#### 12.1. Set Up Python Environment

**Create Python project:**
```bash
mkdir kbase-ai
cd kbase-ai
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**Install dependencies:**
```bash
pip install fastapi uvicorn
pip install openai langchain
pip install pypdf2 python-docx openpyxl
pip install chromadb sentence-transformers
pip install requests python-multipart
```

#### 12.2. Create Document Processor

**document_processor.py:**
```python
import PyPDF2
import docx
import openpyxl
from PIL import Image
import pytesseract
import os

class DocumentProcessor:
    
    def extract_text(self, file_path: str, file_type: str) -> str:
        """Extract text from various file types"""
        
        if file_type == 'PDF':
            return self._extract_pdf_text(file_path)
        elif file_type in ['WORD', 'DOCX']:
            return self._extract_docx_text(file_path)
        elif file_type == 'EXCEL':
            return self._extract_excel_text(file_path)
        elif file_type == 'IMAGE':
            return self._extract_image_text(file_path)
        elif file_type == 'TEXT':
            return self._extract_text_file(file_path)
        else:
            return "Unsupported file type"
    
    def _extract_pdf_text(self, file_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text
    
    def _extract_docx_text(self, file_path: str) -> str:
        """Extract text from Word document"""
        doc = docx.Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    
    def _extract_excel_text(self, file_path: str) -> str:
        """Extract text from Excel file"""
        workbook = openpyxl.load_workbook(file_path)
        text = ""
        for sheet_name in workbook.sheetnames:
            sheet = workbook[sheet_name]
            for row in sheet.iter_rows(values_only=True):
                text += " ".join([str(cell) for cell in row if cell]) + "\n"
        return text
    
    def _extract_image_text(self, file_path: str) -> str:
        """Extract text from image using OCR"""
        try:
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            return f"Error extracting text from image: {str(e)}"
    
    def _extract_text_file(self, file_path: str) -> str:
        """Extract text from plain text file"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
```

#### 12.3. Create Vector Database Service

**vector_store.py:**
```python
from langchain.vectorstores import Chroma
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import List, Dict
import os

class VectorStore:
    
    def __init__(self):
        self.embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.persist_directory = "./chroma_db"
        
        # Create persist directory if it doesn't exist
        os.makedirs(self.persist_directory, exist_ok=True)
        
        # Initialize vector store
        self.vectorstore = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings
        )
    
    def add_document(self, document_id: str, content: str, metadata: Dict):
        """Add document to vector store"""
        
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_text(content)
        
        # Add metadata to each chunk
        metadatas = [metadata] * len(texts)
        
        # Add unique IDs for each chunk
        ids = [f"{document_id}_{i}" for i in range(len(texts))]
        
        self.vectorstore.add_texts(texts=texts, metadatas=metadatas, ids=ids)
        self.vectorstore.persist()
    
    def search_documents(self, query: str, k: int = 5) -> List[Dict]:
        """Search for relevant documents"""
        
        docs = self.vectorstore.similarity_search(query, k=k)
        
        results = []
        for doc in docs:
            results.append({
                'content': doc.page_content,
                'metadata': doc.metadata,
                'score': doc.metadata.get('score', 0)  # Chroma doesn't return scores by default
            })
        
        return results
    
    def delete_document(self, document_id: str):
        """Delete document from vector store"""
        
        # Find all chunks for this document
        all_docs = self.vectorstore.get()
        ids_to_delete = [doc_id for doc_id in all_docs['ids'] if doc_id.startswith(f"{document_id}_")]
        
        if ids_to_delete:
            self.vectorstore.delete(ids_to_delete)
            self.vectorstore.persist()
```

#### 12.4. Create AI Chat Service

**chat_service.py:**
```python
import openai
from vector_store import VectorStore
from typing import List, Dict

class ChatService:
    
    def __init__(self, openai_api_key: str):
        openai.api_key = openai_api_key
        self.vector_store = VectorStore()
    
    def ask_question(self, question: str, project_id: str = None) -> str:
        """Answer question using relevant documents"""
        
        # Search for relevant documents
        relevant_docs = self.vector_store.search_documents(question, k=3)
        
        if not relevant_docs:
            return "I couldn't find any relevant information in your documents."
        
        # Build context from relevant documents
        context = self._build_context(relevant_docs)
        
        # Create prompt
        prompt = f"""
        Based on the following documents, please answer the question: {question}
        
        Context:
        {context}
        
        Answer the question based only on the provided context. If the context doesn't contain enough information to answer the question, say so.
        """
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that answers questions based on provided documents."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        return response.choices[0].message.content.strip()
    
    def _build_context(self, documents: List[Dict]) -> str:
        """Build context string from relevant documents"""
        context_parts = []
        
        for i, doc in enumerate(documents, 1):
            metadata = doc['metadata']
            context_parts.append(f"""
            Document {i}:
            Title: {metadata.get('title', 'Unknown')}
            Content: {doc['content']}
            """)
        
        return "\n".join(context_parts)
```

#### 12.5. Create FastAPI Backend

**main.py:**
```python
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from document_processor import DocumentProcessor
from vector_store import VectorStore
from chat_service import ChatService

app = FastAPI(title="KBase AI Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
doc_processor = DocumentProcessor()
vector_store = VectorStore()
chat_service = ChatService(os.getenv("OPENAI_API_KEY", "your-openai-key"))

JAVA_BACKEND_URL = "http://localhost:8080/api"

@app.post("/documents/process")
async def process_document(
    file: UploadFile = File(...),
    document_id: str = Form(...),
    project_id: str = Form(...),
    title: str = Form(...)
):
    """Process uploaded document and add to vector store"""
    
    try:
        # Save file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Determine file type
        file_extension = file.filename.split('.')[-1].upper()
        file_type_map = {
            'PDF': 'PDF',
            'DOCX': 'WORD',
            'DOC': 'WORD',
            'XLSX': 'EXCEL',
            'XLS': 'EXCEL',
            'JPG': 'IMAGE',
            'JPEG': 'IMAGE',
            'PNG': 'IMAGE',
            'TXT': 'TEXT',
            'MD': 'TEXT'
        }
        file_type = file_type_map.get(file_extension, 'OTHER')
        
        # Extract text
        extracted_text = doc_processor.extract_text(temp_path, file_type)
        
        # Add to vector store
        metadata = {
            'document_id': document_id,
            'project_id': project_id,
            'title': title,
            'file_type': file_type,
            'file_name': file.filename
        }
        
        vector_store.add_document(document_id, extracted_text, metadata)
        
        # Clean up temp file
        os.remove(temp_path)
        
        return {"message": "Document processed successfully", "text_length": len(extracted_text)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/chat/ask")
async def ask_question(question: str = Form(...), project_id: str = Form(None)):
    """Answer question using document knowledge"""
    
    try:
        answer = chat_service.ask_question(question, project_id)
        return {"answer": answer}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@app.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    """Remove document from vector store"""
    
    try:
        vector_store.delete_document(document_id)
        return {"message": "Document removed from knowledge base"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Integrating with Java Backend

**Update DocumentService.java to call AI service:**
```java
@Service
@RequiredArgsConstructor
@Transactional
public class DocumentService {
    
    // ... existing code ...
    
    @Value("${ai.service.url:http://localhost:8000}")
    private String aiServiceUrl;
    
    private final RestTemplate restTemplate;
    
    public DocumentDTO uploadDocument(...) throws IOException {
        // ... existing upload logic ...
        
        Document saved = documentRepository.save(document);
        
        // Send to AI service for processing
        try {
            processDocumentWithAI(saved, file);
        } catch (Exception e) {
            // Log error but don't fail upload
            logger.warn("Failed to process document with AI: {}", e.getMessage());
        }
        
        return convertToDTO(saved);
    }
    
    private void processDocumentWithAI(Document document, MultipartFile file) throws IOException {
        // Create multipart request
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });
        body.add("document_id", document.getDocumentId().toString());
        body.add("project_id", document.getProject().getProjectId().toString());
        body.add("title", document.getTitle());
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        
        restTemplate.postForEntity(aiServiceUrl + "/documents/process", requestEntity, String.class);
    }
    
    // ... rest of existing code ...
}
```

**Add RestTemplate configuration:**
```java
@Configuration
public class AppConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### Testing AI Features

**Process a document:**
```bash
curl -X POST http://localhost:8000/documents/process \
  -F "file=@document.pdf" \
  -F "document_id=1" \
  -F "project_id=1" \
  -F "title=My Document"
```

**Ask a question:**
```bash
curl -X POST http://localhost:8000/chat/ask \
  -F "question=What is the main topic of the document?" \
  -F "project_id=1"
```

### Learning Exercise: Add Video Processing

**Install video processing libraries:**
```bash
pip install moviepy speechrecognition
```

**Add video processing to DocumentProcessor:**
```python
def _extract_video_text(self, file_path: str) -> str:
    """Extract audio from video and convert to text"""
    try:
        # Extract audio
        video = VideoFileClip(file_path)
        audio_path = file_path + ".wav"
        video.audio.write_audiofile(audio_path)
        
        # Convert speech to text
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_path) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
        
        # Clean up
        os.remove(audio_path)
        
        return text
    except Exception as e:
        return f"Error processing video: {str(e)}"
```

### Common Pitfalls
❌ **No error handling** - AI failures shouldn't break document upload
❌ **Large documents** - Chunk text to avoid token limits
❌ **No context filtering** - Search within specific projects
❌ **API key exposure** - Never commit API keys to git

### Resources
- **LangChain**: python.langchain.com/docs/get_started/introduction
- **OpenAI API**: platform.openai.com/docs/introduction
- **FastAPI**: fastapi.tiangolo.com/
- **Chroma**: docs.trychroma.com/

---

# PHASE 8: TESTING (Week 19-20)

## Step 13: Write Tests

### What to Learn
- **Unit Testing**: Test individual components
- **Integration Testing**: Test component interactions
- **Test-Driven Development**: Write tests before code
- **Mocking**: Isolate components for testing

### Why It Matters
Tests ensure your code works and prevent regressions. Good tests give confidence when refactoring.

### Implementation

#### 13.1. Unit Tests for Services

**src/test/java/com/kbase/backend/service/UserServiceTest.java:**
```java
package com.kbase.backend.service;

import com.kbase.backend.dto.CreateUserRequest;
import com.kbase.backend.dto.UserDTO;
import com.kbase.backend.entity.User;
import com.kbase.backend.entity.UserRole;
import com.kbase.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    public void testCreateUser_Success() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("test@kbase.com");
        request.setPassword("password123");
        request.setFullName("Test User");
        request.setRole(UserRole.USER);
        
        User savedUser = new User();
        savedUser.setUserId(1L);
        savedUser.setEmail("test@kbase.com");
        savedUser.setFullName("Test User");
        savedUser.setRole(UserRole.USER);
        
        when(userRepository.existsByEmail("test@kbase.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        // Act
        UserDTO result = userService.createUser(request);
        
        // Assert
        assertThat(result.getEmail()).isEqualTo("test@kbase.com");
        assertThat(result.getFullName()).isEqualTo("Test User");
    }
    
    @Test
    public void testCreateUser_EmailAlreadyExists() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("existing@kbase.com");
        
        when(userRepository.existsByEmail("existing@kbase.com")).thenReturn(true);
        
        // Act & Assert
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(DuplicateResourceException.class)
            .hasMessage("Email already registered: existing@kbase.com");
    }
    
    @Test
    public void testGetUserById_Success() {
        // Arrange
        User user = new User();
        user.setUserId(1L);
        user.setEmail("test@kbase.com");
        user.setFullName("Test User");
        
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        // Act
        UserDTO result = userService.getUserById(1L);
        
        // Assert
        assertThat(result.getUserId()).isEqualTo(1L);
        assertThat(result.getEmail()).isEqualTo("test@kbase.com");
    }
    
    @Test
    public void testGetUserById_NotFound() {
        // Arrange
        when(userRepository.findById(999L)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThatThrownBy(() -> userService.getUserById(999L))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessage("User not found with id: 999");
    }
    
    @Test
    public void testGetAllUsers() {
        // Arrange
        User user1 = new User();
        user1.setUserId(1L);
        user1.setEmail("user1@kbase.com");
        
        User user2 = new User();
        user2.setUserId(2L);
        user2.setEmail("user2@kbase.com");
        
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
        
        // Act
        List<UserDTO> result = userService.getAllUsers();
        
        // Assert
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getEmail()).isEqualTo("user1@kbase.com");
        assertThat(result.get(1).getEmail()).isEqualTo("user2@kbase.com");
    }
}
```

#### 13.2. Integration Tests

**src/test/java/com/kbase/backend/controller/UserControllerIntegrationTest.java:**
```java
package com.kbase.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kbase.backend.dto.CreateUserRequest;
import com.kbase.backend.entity.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest
@AutoConfigureWebMvc
@Transactional
public class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    public void testCreateUser() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("integration@test.com");
        request.setPassword("password123");
        request.setFullName("Integration Test");
        request.setRole(UserRole.USER);
        
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.email").value("integration@test.com"))
                .andExpect(jsonPath("$.data.fullName").value("Integration Test"));
    }
    
    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray());
    }
    
    @Test
    public void testGetUserById() throws Exception {
        // First create a user
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("getbyid@test.com");
        request.setPassword("password123");
        request.setFullName("Get By Id Test");
        request.setRole(UserRole.USER);
        
        String response = mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andReturn().getResponse().getContentAsString();
        
        // Extract user ID from response
        int userId = JsonPath.parse(response).read("$.data.userId", Integer.class);
        
        // Now get the user by ID
        mockMvc.perform(get("/api/users/" + userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.userId").value(userId))
                .andExpect(jsonPath("$.data.email").value("getbyid@test.com"));
    }
}
```

#### 13.3. Frontend Tests

**src/components/Auth/__tests__/Login.test.tsx:**
```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '../../../contexts/AuthContext';

// Mock the auth context
const mockLogin = jest.fn();
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  test('renders login form', () => {
    renderLogin();
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  test('calls login function with correct credentials', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('shows error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    renderLogin();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });
});
```

### Running Tests

**Backend tests:**
```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserServiceTest

# Run with coverage
./mvnw test jacoco:report
```

**Frontend tests:**
```bash
# Run all tests
npm test

# Run specific test
npm test Login.test.tsx

# Run with coverage
npm test -- --coverage
```

### Learning Exercise: Add API Tests

**Create API test with TestContainers:**
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public class UserApiTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    public void testCreateAndGetUser() {
        // Create user
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("api@test.com");
        request.setPassword("password");
        request.setFullName("API Test");
        request.setRole(UserRole.USER);
        
        ResponseEntity<ResponseTemplate> createResponse = restTemplate.postForEntity(
            "/api/users", request, ResponseTemplate.class);
        
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        
        // Get user
        ResponseEntity<ResponseTemplate> getResponse = restTemplate.getForEntity(
            "/api/users/1", ResponseTemplate.class);
        
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
```

### Common Pitfalls
❌ **Testing implementation details** - Test behavior, not internal code
❌ **Not mocking external dependencies** - Tests should be fast and isolated
❌ **No integration tests** - Unit tests alone aren't enough
❌ **Flaky tests** - Tests should be deterministic

### Resources
- **JUnit 5**: junit.org/junit5/docs/current/user-guide/
- **Mockito**: javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html
- **Testing Library**: testing-library.com/docs/react-testing-library/intro/
- **TestContainers**: testcontainers.org/

---

# PHASE 9: DEPLOYMENT (Week 21-22)

## Step 14: Deploy to Production

### What to Learn
- **Containerization**: Docker for packaging applications
- **Orchestration**: Docker Compose for multi-container apps
- **Cloud Deployment**: AWS, Heroku, or other platforms
- **CI/CD**: Automated deployment pipelines

### Why It Matters
Your application needs to run reliably in production. Containerization makes deployment consistent.

### Implementation

#### 14.1. Dockerize Applications

**Backend Dockerfile:**
```dockerfile
# Use OpenJDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build application
RUN ./mvnw package -DskipTests

# Expose port
EXPOSE 8080

# Run application
CMD ["java", "-jar", "target/kbase-backend-0.0.1-SNAPSHOT.jar"]
```

**Frontend Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Frontend nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 14.2. Create Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: kbase_db
      POSTGRES_USER: kbase_user
      POSTGRES_PASSWORD: kbase_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kbase_user -d kbase_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./kbase-backend
    environment:
      SPRING_PROFILES_ACTIVE: prod
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/kbase_db
      SPRING_DATASOURCE_USERNAME: kbase_user
      SPRING_DATASOURCE_PASSWORD: kbase_password
      JWT_SECRET: ${JWT_SECRET}
      APP_UPLOAD_DIR: /app/uploads
    volumes:
      - uploads:/app/uploads
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/api/ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./kbase-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  ai-service:
    build: ./kbase-ai
    environment:
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    ports:
      - "8000:8000"
    volumes:
      - chroma_data:/app/chroma_db

volumes:
  postgres_data:
  uploads:
  chroma_data:
```

**init.sql (Database initialization):**
```sql
-- Create database and user
CREATE DATABASE kbase_db;
CREATE USER kbase_user WITH PASSWORD 'kbase_password';
GRANT ALL PRIVILEGES ON DATABASE kbase_db TO kbase_user;

-- Connect to database
\c kbase_db;

-- Run your schema creation scripts here
-- (Copy from project_database.md)
```

#### 14.3. Production Configuration

**src/main/resources/application-prod.properties:**
```properties
# Production Database
spring.datasource.url=jdbc:postgresql://postgres:5432/kbase_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Production Security
jwt.secret=${JWT_SECRET}
jwt.expiration=3600000  # 1 hour

# File Upload
app.upload.dir=/app/uploads
app.upload.max-size=104857600  # 100MB

# Logging
logging.level.root=INFO
logging.level.org.springframework.security=DEBUG

# Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
```

#### 14.4. Environment Variables

**.env file:**
```bash
# Database
DB_USERNAME=kbase_user
DB_PASSWORD=kbase_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-at-least-256-bits-long

# AI Service
OPENAI_API_KEY=your-openai-api-key
```

### Deploying to Cloud

#### Option 1: Heroku (Simple)

**Create Heroku apps:**
```bash
# Backend
heroku create kbase-backend
heroku addons:create heroku-postgresql:hobby-dev -a kbase-backend

# Frontend
heroku create kbase-frontend
```

**Deploy:**
```bash
# Backend
cd kbase-backend
heroku git:remote -a kbase-backend
git push heroku main

# Frontend
cd kbase-frontend
heroku git:remote -a kbase-frontend
git push heroku main
```

#### Option 2: AWS (Production-Ready)

**1. Create ECR repositories:**
```bash
aws ecr create-repository --repository-name kbase-backend
aws ecr create-repository --repository-name kbase-frontend
aws ecr create-repository --repository-name kbase-ai
```

**2. Build and push images:**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

# Build and push backend
docker build -t kbase-backend ./kbase-backend
docker tag kbase-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/kbase-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/kbase-backend:latest
```

**3. Create ECS cluster and services using AWS Console or Terraform**

### CI/CD Pipeline

**GitHub Actions (.github/workflows/deploy.yml):**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Test Backend
        run: ./mvnw test
      - name: Test Frontend
        run: |
          cd kbase-frontend
          npm install
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Heroku
        run: |
          heroku container:push web -a kbase-backend
          heroku container:release web -a kbase-backend
```

### Monitoring and Logging

**Add health check endpoint:**
```java
@RestController
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        
        // Check database connection
        try {
            userRepository.count();
            health.put("database", "UP");
        } catch (Exception e) {
            health.put("database", "DOWN");
            health.put("status", "DOWN");
        }
        
        HttpStatus status = "UP".equals(health.get("status")) ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;
        return new ResponseEntity<>(health, status);
    }
}
```

### Learning Exercise: Add SSL/TLS

**For HTTPS in production:**
```yaml
# docker-compose.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
```

### Common Pitfalls
❌ **Hardcoded secrets** - Use environment variables
❌ **No health checks** - Services fail silently
❌ **Single point of failure** - No redundancy
❌ **No backups** - Data loss on failures

### Resources
- **Docker**: docs.docker.com/get-started/
- **Docker Compose**: docs.docker.com/compose/
- **AWS ECS**: docs.aws.amazon.com/ecs/
- **Heroku**: devcenter.heroku.com/

---

# PHASE 10: ADVANCED TOPICS (Week 23-24)

## Step 15: Advanced Features

### What to Learn
- **Caching**: Redis for performance
- **Message Queues**: Asynchronous processing
- **Microservices**: Service decomposition
- **API Gateway**: Request routing and authentication
- **Monitoring**: Application metrics and alerts

### Implementation

#### 15.1. Add Caching

**Add Redis dependency:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**Configure Redis:**
```java
@Configuration
public class CacheConfig {
    
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10)))
            .build();
    }
}
```

**Use caching in service:**
```java
@Service
public class UserService {
    
    @Cacheable("users")
    public UserDTO getUserById(Long id) {
        // This result will be cached
        return userRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        // Clear cache when user is deleted
        userRepository.deleteById(id);
    }
}
```

#### 15.2. Add Message Queue

**For asynchronous document processing:**

**Add RabbitMQ:**
```yaml
# docker-compose.yml
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

**Send message after document upload:**
```java
@Service
public class DocumentService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public DocumentDTO uploadDocument(...) {
        // ... upload logic ...
        
        // Send to queue for AI processing
        rabbitTemplate.convertAndSend("document-processing", document.getDocumentId());
        
        return convertToDTO(saved);
    }
}
```

**Process messages asynchronously:**
```java
@Component
public class DocumentProcessingConsumer {
    
    @RabbitListener(queues = "document-processing")
    public void processDocument(Long documentId) {
        // Process document with AI service
        // This runs asynchronously
    }
}
```

#### 15.3. API Versioning

**URL-based versioning:**
```java
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    // Version 1 endpoints
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    // Version 2 endpoints with new features
}
```

**Header-based versioning:**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<?> getUsers(@RequestHeader(value = "API-Version", defaultValue = "1") String version) {
        if ("2".equals(version)) {
            // Return v2 response
        } else {
            // Return v1 response
        }
    }
}
```

#### 15.4. Add Metrics and Monitoring

**Add Actuator:**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**Configure endpoints:**
```properties
# application.properties
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=when-authorized
```

**Access metrics:**
- `GET /actuator/health` - Application health
- `GET /actuator/metrics` - Available metrics
- `GET /actuator/metrics/http.server.requests` - HTTP request metrics

### Learning Exercise: Add Rate Limiting

**Implement rate limiting:**
```java
@Configuration
public class RateLimitConfig {
    
    @Bean
    public Bucket bucket() {
        return Bucket.builder()
            .addLimit(Bandwidth.simple(10, Duration.ofMinutes(1))) // 10 requests per minute
            .build();
    }
}

@RestController
public class RateLimitedController {
    
    @Autowired
    private Bucket bucket;
    
    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (bucket.tryConsume(1)) {
            // Process login
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(429).body("Too many requests");
        }
    }
}
```

### Final Project Structure

```
kbase-project/
├── kbase-backend/          # Spring Boot API
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── kbase-frontend/         # React SPA
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── kbase-ai/              # Python AI service (optional)
│   ├── main.py
│   └── Dockerfile
├── docker-compose.yml     # Local development
├── .env                   # Environment variables
├── .github/workflows/     # CI/CD
└── README.md              # Project documentation
```

### Congratulations! 🎉

You've successfully built a complete full-stack application! Here's what you've accomplished:

**Backend Skills:**
- REST API design and implementation
- Database design and ORM
- Authentication and security
- File upload and storage
- Error handling and validation

**Frontend Skills:**
- React application development
- State management
- API integration
- User interface design

**DevOps Skills:**
- Containerization with Docker
- Multi-container orchestration
- Deployment strategies
- CI/CD pipelines

**Optional AI Skills:**
- Document processing
- Vector databases
- LLM integration
- Natural language processing

### Next Steps

1. **Deploy to production** - Choose a cloud platform and deploy your application
2. **Add more features** - User profiles, notifications, search, analytics
3. **Scale the application** - Add load balancing, database optimization
4. **Learn new technologies** - GraphQL, WebSockets, Kubernetes
5. **Contribute to open source** - Share your knowledge with the community

### Resources for Continued Learning

- **Spring Boot**: spring.io/projects/spring-boot
- **React**: react.dev
- **PostgreSQL**: postgresql.org/docs/
- **Docker**: docs.docker.com
- **AWS/Azure/GCP**: Cloud platform documentation
- **Clean Code**: Book by Robert C. Martin
- **System Design**: grokking-the-system-design-interview

Remember: The best way to learn is by building. Keep coding, keep learning, and most importantly, have fun! 🚀

---

*This roadmap is comprehensive but not exhaustive. Adjust based on your learning pace and interests. The key is consistent progress and practical application.*
