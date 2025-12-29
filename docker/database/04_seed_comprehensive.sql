-- ============================================================
-- KBase Comprehensive Mock Data
-- ============================================================
-- This script creates realistic mock data for development/testing
-- All passwords are: Password123!
-- ============================================================

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- USERS (20 users with various roles)
-- ============================================================
-- Password for ALL users: Password123!
-- BCrypt hash is generated using gen_salt('bf', 10)

INSERT INTO users (email, password, full_name, role, is_active, created_at) VALUES
-- ADMIN users (2)
('admin@kbase.dev', crypt('Password123!', gen_salt('bf', 10)), 'System Administrator', 'ADMIN', true, NOW() - INTERVAL '180 days'),
('sarah.admin@kbase.dev', crypt('Password123!', gen_salt('bf', 10)), 'Sarah Mitchell', 'ADMIN', true, NOW() - INTERVAL '150 days'),

-- OWNER users (5) - Project/Team leads
('john.smith@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'John Smith', 'OWNER', true, NOW() - INTERVAL '120 days'),
('emily.johnson@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Emily Johnson', 'OWNER', true, NOW() - INTERVAL '110 days'),
('michael.chen@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Michael Chen', 'OWNER', true, NOW() - INTERVAL '100 days'),
('lisa.williams@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Lisa Williams', 'OWNER', true, NOW() - INTERVAL '90 days'),
('david.brown@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'David Brown', 'OWNER', true, NOW() - INTERVAL '85 days'),

-- USER users (13) - Regular team members
('alice.taylor@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Alice Taylor', 'USER', true, NOW() - INTERVAL '80 days'),
('bob.anderson@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Bob Anderson', 'USER', true, NOW() - INTERVAL '75 days'),
('carol.martinez@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Carol Martinez', 'USER', true, NOW() - INTERVAL '70 days'),
('daniel.garcia@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Daniel Garcia', 'USER', true, NOW() - INTERVAL '65 days'),
('eva.rodriguez@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Eva Rodriguez', 'USER', true, NOW() - INTERVAL '60 days'),
('frank.wilson@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Frank Wilson', 'USER', true, NOW() - INTERVAL '55 days'),
('grace.lee@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Grace Lee', 'USER', true, NOW() - INTERVAL '50 days'),
('henry.moore@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Henry Moore', 'USER', true, NOW() - INTERVAL '45 days'),
('iris.jackson@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Iris Jackson', 'USER', true, NOW() - INTERVAL '40 days'),
('jack.white@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Jack White', 'USER', true, NOW() - INTERVAL '35 days'),
('karen.harris@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Karen Harris', 'USER', true, NOW() - INTERVAL '30 days'),
('leo.martin@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Leo Martin', 'USER', true, NOW() - INTERVAL '25 days'),
('mia.thompson@techcorp.com', crypt('Password123!', gen_salt('bf', 10)), 'Mia Thompson', 'USER', false, NOW() - INTERVAL '20 days'); -- Inactive user

-- ============================================================
-- PROJECTS (12 projects across different domains)
-- ============================================================

INSERT INTO projects (project_name, description, owner_id, is_active, created_at) VALUES
-- Engineering projects
('Platform Architecture', 'Core platform architecture documentation, system design decisions, and technical specifications for the main product.', 3, true, NOW() - INTERVAL '115 days'),
('API Documentation', 'REST API documentation, endpoints reference, authentication guides, and integration examples.', 3, true, NOW() - INTERVAL '110 days'),
('DevOps Infrastructure', 'Infrastructure as code, CI/CD pipelines, deployment guides, and monitoring setup documentation.', 5, true, NOW() - INTERVAL '100 days'),
('Mobile App Development', 'iOS and Android application development documentation, design patterns, and release processes.', 4, true, NOW() - INTERVAL '95 days'),

-- Product projects
('Product Roadmap 2025', 'Product strategy, feature planning, market research, and competitive analysis documents.', 4, true, NOW() - INTERVAL '90 days'),
('User Research', 'User interviews, surveys, persona documents, and usability testing results.', 6, true, NOW() - INTERVAL '85 days'),
('Design System', 'UI/UX design system documentation, component library, brand guidelines, and accessibility standards.', 6, true, NOW() - INTERVAL '80 days'),

-- Operations projects
('Employee Onboarding', 'New employee onboarding materials, training guides, company policies, and IT setup instructions.', 7, true, NOW() - INTERVAL '75 days'),
('Security Compliance', 'Security policies, compliance documentation, audit reports, and incident response procedures.', 1, true, NOW() - INTERVAL '70 days'),
('Vendor Management', 'Vendor contracts, evaluation criteria, procurement processes, and partnership agreements.', 7, true, NOW() - INTERVAL '65 days'),

-- Archived/Inactive project
('Legacy System Migration', 'Documentation for migrating from legacy systems - project completed.', 5, false, NOW() - INTERVAL '200 days'),
('Q3 2024 Planning', 'Q3 planning documents - archived after quarter end.', 4, false, NOW() - INTERVAL '180 days');

-- ============================================================
-- PROJECT MEMBERS (Realistic team compositions)
-- ============================================================

-- Project 1: Platform Architecture (Engineering team)
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(1, 3, 'OWNER', true, NOW() - INTERVAL '115 days'),
(1, 8, 'MEMBER', true, NOW() - INTERVAL '110 days'),
(1, 9, 'MEMBER', true, NOW() - INTERVAL '105 days'),
(1, 13, 'MEMBER', true, NOW() - INTERVAL '100 days'),
(1, 14, 'MEMBER', true, NOW() - INTERVAL '95 days');

-- Project 2: API Documentation (Engineering team)
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(2, 3, 'OWNER', true, NOW() - INTERVAL '110 days'),
(2, 10, 'MEMBER', true, NOW() - INTERVAL '105 days'),
(2, 11, 'MEMBER', true, NOW() - INTERVAL '100 days'),
(2, 8, 'MEMBER', true, NOW() - INTERVAL '95 days');

-- Project 3: DevOps Infrastructure
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(3, 5, 'OWNER', true, NOW() - INTERVAL '100 days'),
(3, 9, 'MEMBER', true, NOW() - INTERVAL '95 days'),
(3, 13, 'MEMBER', true, NOW() - INTERVAL '90 days'),
(3, 1, 'MEMBER', true, NOW() - INTERVAL '85 days');

-- Project 4: Mobile App Development
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(4, 4, 'OWNER', true, NOW() - INTERVAL '95 days'),
(4, 12, 'MEMBER', true, NOW() - INTERVAL '90 days'),
(4, 15, 'MEMBER', true, NOW() - INTERVAL '85 days'),
(4, 16, 'MEMBER', true, NOW() - INTERVAL '80 days'),
(4, 17, 'MEMBER', true, NOW() - INTERVAL '75 days');

-- Project 5: Product Roadmap 2025
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(5, 4, 'OWNER', true, NOW() - INTERVAL '90 days'),
(5, 6, 'MEMBER', true, NOW() - INTERVAL '85 days'),
(5, 2, 'MEMBER', true, NOW() - INTERVAL '80 days'),
(5, 18, 'MEMBER', true, NOW() - INTERVAL '75 days');

-- Project 6: User Research
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(6, 6, 'OWNER', true, NOW() - INTERVAL '85 days'),
(6, 15, 'MEMBER', true, NOW() - INTERVAL '80 days'),
(6, 19, 'MEMBER', true, NOW() - INTERVAL '75 days');

-- Project 7: Design System
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(7, 6, 'OWNER', true, NOW() - INTERVAL '80 days'),
(7, 12, 'MEMBER', true, NOW() - INTERVAL '75 days'),
(7, 15, 'MEMBER', true, NOW() - INTERVAL '70 days'),
(7, 4, 'MEMBER', true, NOW() - INTERVAL '65 days');

-- Project 8: Employee Onboarding
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(8, 7, 'OWNER', true, NOW() - INTERVAL '75 days'),
(8, 2, 'MEMBER', true, NOW() - INTERVAL '70 days'),
(8, 1, 'MEMBER', true, NOW() - INTERVAL '65 days');

-- Project 9: Security Compliance
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(9, 1, 'OWNER', true, NOW() - INTERVAL '70 days'),
(9, 2, 'MEMBER', true, NOW() - INTERVAL '65 days'),
(9, 5, 'MEMBER', true, NOW() - INTERVAL '60 days'),
(9, 7, 'MEMBER', true, NOW() - INTERVAL '55 days');

-- Project 10: Vendor Management
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(10, 7, 'OWNER', true, NOW() - INTERVAL '65 days'),
(10, 18, 'MEMBER', true, NOW() - INTERVAL '60 days'),
(10, 19, 'MEMBER', true, NOW() - INTERVAL '55 days');

-- Project 11: Legacy System Migration (archived)
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(11, 5, 'OWNER', false, NOW() - INTERVAL '200 days'),
(11, 3, 'MEMBER', false, NOW() - INTERVAL '195 days');

-- Project 12: Q3 2024 Planning (archived)
INSERT INTO project_members (project_id, user_id, role, is_active, joined_at) VALUES
(12, 4, 'OWNER', false, NOW() - INTERVAL '180 days'),
(12, 6, 'MEMBER', false, NOW() - INTERVAL '175 days');

-- ============================================================
-- DOCUMENTS (50+ documents across projects)
-- ============================================================

-- Project 1: Platform Architecture (8 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(1, 3, 'System Architecture Overview', 'system-architecture-v2.pdf', 'pdf', 2458624, '/storage/projects/1/system-architecture-v2.pdf', 'application/pdf', 'High-level system architecture diagram and component descriptions', true, NOW() - INTERVAL '110 days'),
(1, 8, 'Database Schema Design', 'database-schema.sql', 'sql', 45056, '/storage/projects/1/database-schema.sql', 'text/plain', 'Complete database schema with relationships and indexes', true, NOW() - INTERVAL '105 days'),
(1, 9, 'Microservices Communication', 'microservices-patterns.md', 'md', 28672, '/storage/projects/1/microservices-patterns.md', 'text/markdown', 'Service-to-service communication patterns and protocols', true, NOW() - INTERVAL '100 days'),
(1, 13, 'Caching Strategy', 'caching-strategy.docx', 'docx', 156672, '/storage/projects/1/caching-strategy.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Redis caching implementation guidelines', true, NOW() - INTERVAL '95 days'),
(1, 3, 'Performance Benchmarks Q4', 'performance-benchmarks-q4.xlsx', 'xlsx', 89088, '/storage/projects/1/performance-benchmarks-q4.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Q4 2024 performance testing results', true, NOW() - INTERVAL '30 days'),
(1, 14, 'Security Architecture', 'security-architecture.pdf', 'pdf', 1843200, '/storage/projects/1/security-architecture.pdf', 'application/pdf', 'Security layers and authentication flow', true, NOW() - INTERVAL '85 days'),
(1, 8, 'Scalability Plan', 'scalability-roadmap.pptx', 'pptx', 3145728, '/storage/projects/1/scalability-roadmap.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'Scaling strategy presentation for stakeholders', true, NOW() - INTERVAL '60 days'),
(1, 9, 'Tech Debt Assessment', 'tech-debt-2024.md', 'md', 18432, '/storage/projects/1/tech-debt-2024.md', 'text/markdown', 'Technical debt inventory and remediation plan', true, NOW() - INTERVAL '45 days');

-- Project 2: API Documentation (10 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(2, 3, 'API Reference v3.0', 'api-reference-v3.pdf', 'pdf', 4194304, '/storage/projects/2/api-reference-v3.pdf', 'application/pdf', 'Complete REST API reference documentation', true, NOW() - INTERVAL '105 days'),
(2, 10, 'Authentication Guide', 'authentication-guide.md', 'md', 32768, '/storage/projects/2/authentication-guide.md', 'text/markdown', 'OAuth 2.0 and JWT implementation guide', true, NOW() - INTERVAL '100 days'),
(2, 11, 'Rate Limiting Policies', 'rate-limiting.md', 'md', 12288, '/storage/projects/2/rate-limiting.md', 'text/markdown', 'API rate limiting rules and best practices', true, NOW() - INTERVAL '95 days'),
(2, 8, 'Webhook Integration', 'webhooks-setup.docx', 'docx', 98304, '/storage/projects/2/webhooks-setup.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Setting up and configuring webhooks', true, NOW() - INTERVAL '90 days'),
(2, 3, 'Error Codes Reference', 'error-codes.xlsx', 'xlsx', 45056, '/storage/projects/2/error-codes.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Complete list of API error codes and meanings', true, NOW() - INTERVAL '85 days'),
(2, 10, 'SDK Installation Guide', 'sdk-installation.md', 'md', 24576, '/storage/projects/2/sdk-installation.md', 'text/markdown', 'Client SDK installation for various platforms', true, NOW() - INTERVAL '75 days'),
(2, 11, 'GraphQL Schema', 'graphql-schema.graphql', 'graphql', 65536, '/storage/projects/2/graphql-schema.graphql', 'text/plain', 'GraphQL type definitions and queries', true, NOW() - INTERVAL '65 days'),
(2, 8, 'Postman Collection', 'kbase-api.postman_collection.json', 'json', 524288, '/storage/projects/2/kbase-api.postman_collection.json', 'application/json', 'Postman collection with all API endpoints', true, NOW() - INTERVAL '55 days'),
(2, 3, 'API Changelog', 'api-changelog.md', 'md', 16384, '/storage/projects/2/api-changelog.md', 'text/markdown', 'Version history and breaking changes', true, NOW() - INTERVAL '20 days'),
(2, 10, 'OpenAPI Specification', 'openapi-spec.yaml', 'yaml', 131072, '/storage/projects/2/openapi-spec.yaml', 'text/yaml', 'OpenAPI 3.0 specification file', true, NOW() - INTERVAL '15 days');

-- Project 3: DevOps Infrastructure (7 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(3, 5, 'Kubernetes Deployment Guide', 'k8s-deployment.pdf', 'pdf', 1572864, '/storage/projects/3/k8s-deployment.pdf', 'application/pdf', 'Kubernetes cluster setup and deployment procedures', true, NOW() - INTERVAL '95 days'),
(3, 9, 'Terraform Modules', 'terraform-modules.zip', 'zip', 262144, '/storage/projects/3/terraform-modules.zip', 'application/zip', 'Infrastructure as Code Terraform modules', true, NOW() - INTERVAL '90 days'),
(3, 13, 'CI/CD Pipeline Configuration', 'ci-cd-config.yaml', 'yaml', 20480, '/storage/projects/3/ci-cd-config.yaml', 'text/yaml', 'GitHub Actions workflow configurations', true, NOW() - INTERVAL '85 days'),
(3, 1, 'Monitoring Setup Guide', 'monitoring-setup.docx', 'docx', 204800, '/storage/projects/3/monitoring-setup.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Prometheus and Grafana monitoring setup', true, NOW() - INTERVAL '75 days'),
(3, 5, 'Disaster Recovery Plan', 'dr-plan-2024.pdf', 'pdf', 892928, '/storage/projects/3/dr-plan-2024.pdf', 'application/pdf', 'Business continuity and disaster recovery procedures', true, NOW() - INTERVAL '50 days'),
(3, 9, 'Docker Compose Files', 'docker-compose-all.zip', 'zip', 40960, '/storage/projects/3/docker-compose-all.zip', 'application/zip', 'All environment Docker Compose configurations', true, NOW() - INTERVAL '40 days'),
(3, 13, 'AWS Cost Optimization', 'aws-cost-report.xlsx', 'xlsx', 156672, '/storage/projects/3/aws-cost-report.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Monthly AWS cost analysis and optimization recommendations', true, NOW() - INTERVAL '10 days');

-- Project 4: Mobile App Development (6 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(4, 4, 'Mobile App Architecture', 'mobile-architecture.pdf', 'pdf', 2097152, '/storage/projects/4/mobile-architecture.pdf', 'application/pdf', 'iOS and Android app architecture documentation', true, NOW() - INTERVAL '90 days'),
(4, 12, 'React Native Setup Guide', 'rn-setup-guide.md', 'md', 28672, '/storage/projects/4/rn-setup-guide.md', 'text/markdown', 'Development environment setup for React Native', true, NOW() - INTERVAL '85 days'),
(4, 15, 'App Store Submission Guide', 'app-store-guide.docx', 'docx', 180224, '/storage/projects/4/app-store-guide.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'iOS App Store and Google Play submission checklist', true, NOW() - INTERVAL '70 days'),
(4, 16, 'Push Notification Setup', 'push-notifications.md', 'md', 16384, '/storage/projects/4/push-notifications.md', 'text/markdown', 'Firebase and APNs push notification configuration', true, NOW() - INTERVAL '60 days'),
(4, 17, 'Mobile Testing Strategy', 'mobile-testing.pdf', 'pdf', 524288, '/storage/projects/4/mobile-testing.pdf', 'application/pdf', 'QA testing procedures for mobile applications', true, NOW() - INTERVAL '45 days'),
(4, 4, 'Release Notes Template', 'release-notes-template.md', 'md', 8192, '/storage/projects/4/release-notes-template.md', 'text/markdown', 'Template for mobile app release notes', true, NOW() - INTERVAL '25 days');

-- Project 5: Product Roadmap 2025 (5 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(5, 4, '2025 Product Roadmap', 'roadmap-2025.pptx', 'pptx', 5242880, '/storage/projects/5/roadmap-2025.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'Annual product roadmap presentation', true, NOW() - INTERVAL '85 days'),
(5, 6, 'Competitive Analysis', 'competitive-analysis.xlsx', 'xlsx', 409600, '/storage/projects/5/competitive-analysis.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Market competitor feature comparison', true, NOW() - INTERVAL '75 days'),
(5, 2, 'Feature Prioritization Matrix', 'feature-priority.xlsx', 'xlsx', 98304, '/storage/projects/5/feature-priority.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'RICE scoring for feature prioritization', true, NOW() - INTERVAL '60 days'),
(5, 18, 'Customer Feedback Summary', 'customer-feedback-q4.pdf', 'pdf', 786432, '/storage/projects/5/customer-feedback-q4.pdf', 'application/pdf', 'Q4 customer feedback analysis report', true, NOW() - INTERVAL '35 days'),
(5, 4, 'OKRs Q1 2025', 'okrs-q1-2025.docx', 'docx', 65536, '/storage/projects/5/okrs-q1-2025.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Objectives and Key Results for Q1', true, NOW() - INTERVAL '15 days');

-- Project 6: User Research (5 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(6, 6, 'User Personas 2024', 'user-personas.pdf', 'pdf', 3145728, '/storage/projects/6/user-personas.pdf', 'application/pdf', 'Detailed user persona documentation', true, NOW() - INTERVAL '80 days'),
(6, 15, 'Usability Test Results', 'usability-test-nov.xlsx', 'xlsx', 262144, '/storage/projects/6/usability-test-nov.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'November usability testing session results', true, NOW() - INTERVAL '55 days'),
(6, 19, 'Interview Transcripts', 'user-interviews-batch3.zip', 'zip', 1048576, '/storage/projects/6/user-interviews-batch3.zip', 'application/zip', 'User interview recordings and transcripts', true, NOW() - INTERVAL '40 days'),
(6, 6, 'Journey Map - Onboarding', 'journey-map-onboarding.pdf', 'pdf', 1572864, '/storage/projects/6/journey-map-onboarding.pdf', 'application/pdf', 'User journey map for onboarding flow', true, NOW() - INTERVAL '30 days'),
(6, 15, 'Survey Results Q4', 'survey-results-q4.xlsx', 'xlsx', 180224, '/storage/projects/6/survey-results-q4.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'NPS and satisfaction survey results', true, NOW() - INTERVAL '12 days');

-- Project 7: Design System (6 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(7, 6, 'Design System Guidelines', 'design-system-v2.pdf', 'pdf', 8388608, '/storage/projects/7/design-system-v2.pdf', 'application/pdf', 'Complete design system documentation with examples', true, NOW() - INTERVAL '75 days'),
(7, 12, 'Component Library', 'component-library.zip', 'zip', 15728640, '/storage/projects/7/component-library.zip', 'application/zip', 'Figma component library export', true, NOW() - INTERVAL '65 days'),
(7, 15, 'Brand Guidelines', 'brand-guidelines.pdf', 'pdf', 4194304, '/storage/projects/7/brand-guidelines.pdf', 'application/pdf', 'Logo usage, colors, and typography guidelines', true, NOW() - INTERVAL '55 days'),
(7, 4, 'Accessibility Checklist', 'a11y-checklist.xlsx', 'xlsx', 45056, '/storage/projects/7/a11y-checklist.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'WCAG 2.1 AA compliance checklist', true, NOW() - INTERVAL '40 days'),
(7, 6, 'Icon Set', 'icons-v3.zip', 'zip', 2097152, '/storage/projects/7/icons-v3.zip', 'application/zip', 'SVG icon library for all platforms', true, NOW() - INTERVAL '25 days'),
(7, 12, 'Dark Mode Specifications', 'dark-mode-specs.pdf', 'pdf', 1048576, '/storage/projects/7/dark-mode-specs.pdf', 'application/pdf', 'Dark theme color specifications and implementation guide', true, NOW() - INTERVAL '8 days');

-- Project 8: Employee Onboarding (4 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(8, 7, 'New Hire Onboarding Guide', 'onboarding-guide.pdf', 'pdf', 2621440, '/storage/projects/8/onboarding-guide.pdf', 'application/pdf', 'Complete onboarding checklist and resources', true, NOW() - INTERVAL '70 days'),
(8, 2, 'IT Setup Instructions', 'it-setup.docx', 'docx', 131072, '/storage/projects/8/it-setup.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Laptop setup and software installation guide', true, NOW() - INTERVAL '60 days'),
(8, 1, 'Company Policies Handbook', 'policies-handbook-2024.pdf', 'pdf', 1835008, '/storage/projects/8/policies-handbook-2024.pdf', 'application/pdf', 'HR policies, code of conduct, and benefits guide', true, NOW() - INTERVAL '45 days'),
(8, 7, 'Training Schedule Template', 'training-schedule.xlsx', 'xlsx', 32768, '/storage/projects/8/training-schedule.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'First 90 days training schedule template', true, NOW() - INTERVAL '20 days');

-- Project 9: Security Compliance (5 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(9, 1, 'Security Policy Document', 'security-policy-v3.pdf', 'pdf', 1048576, '/storage/projects/9/security-policy-v3.pdf', 'application/pdf', 'Information security policy and procedures', true, NOW() - INTERVAL '65 days'),
(9, 2, 'SOC 2 Compliance Checklist', 'soc2-checklist.xlsx', 'xlsx', 98304, '/storage/projects/9/soc2-checklist.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'SOC 2 Type II compliance requirements tracker', true, NOW() - INTERVAL '55 days'),
(9, 5, 'Incident Response Plan', 'incident-response.pdf', 'pdf', 524288, '/storage/projects/9/incident-response.pdf', 'application/pdf', 'Security incident response procedures', true, NOW() - INTERVAL '40 days'),
(9, 7, 'Vendor Security Assessment', 'vendor-security-template.docx', 'docx', 81920, '/storage/projects/9/vendor-security-template.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Third-party vendor security questionnaire', true, NOW() - INTERVAL '25 days'),
(9, 1, 'Penetration Test Report', 'pentest-report-dec2024.pdf', 'pdf', 2097152, '/storage/projects/9/pentest-report-dec2024.pdf', 'application/pdf', 'December 2024 penetration testing results', true, NOW() - INTERVAL '5 days');

-- Project 10: Vendor Management (3 documents)
INSERT INTO documents (project_id, uploaded_by, title, file_name, file_type, file_size, storage_path, mime_type, description, is_active, created_at) VALUES
(10, 7, 'Vendor Evaluation Template', 'vendor-eval-template.xlsx', 'xlsx', 65536, '/storage/projects/10/vendor-eval-template.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Scoring matrix for vendor evaluation', true, NOW() - INTERVAL '60 days'),
(10, 18, 'Contract Templates', 'contract-templates.zip', 'zip', 409600, '/storage/projects/10/contract-templates.zip', 'application/zip', 'Standard vendor contract templates', true, NOW() - INTERVAL '45 days'),
(10, 19, 'Approved Vendors List', 'approved-vendors-2024.xlsx', 'xlsx', 49152, '/storage/projects/10/approved-vendors-2024.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'List of pre-approved vendors by category', true, NOW() - INTERVAL '18 days');

-- ============================================================
-- Summary Statistics
-- ============================================================
SELECT 'Mock data seeding completed!' AS status;
SELECT 
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM projects) AS total_projects,
    (SELECT COUNT(*) FROM project_members) AS total_memberships,
    (SELECT COUNT(*) FROM documents) AS total_documents;
