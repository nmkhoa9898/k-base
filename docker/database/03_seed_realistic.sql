-- Realistic seed data for KBase (uses pgcrypto for bcrypt hashing)
-- Safe for development only

-- Ensure pgcrypto is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clear some tables if desired (careful in production). For dev we will insert additional rows.

-- Insert users with bcrypt-hashed passwords
INSERT INTO users(email,password,full_name,role) VALUES
('admin@kbase.com', crypt('AdminPass123!', gen_salt('bf')), 'Admin User','ADMIN'),
('owner2@kbase.com', crypt('OwnerPass!23', gen_salt('bf')), 'Owner Two','OWNER'),
('contrib1@kbase.com', crypt('Contrib1$', gen_salt('bf')), 'Contributor One','USER'),
('contrib2@kbase.com', crypt('Contrib2$', gen_salt('bf')), 'Contributor Two','USER'),
('viewer@kbase.com', crypt('Viewer99', gen_salt('bf')), 'Viewer User','USER');

-- Insert additional projects (associate owners by user id)
INSERT INTO projects(project_name,description,owner_id) VALUES
('KBase Main','Main knowledge base project',1),
('Client Onboarding','Docs and templates for onboarding',2),
('Research Notes','Research and reference documents',2),
('Public Resources','Docs intended for public sharing',1);

-- Add project members
-- For simplicity assume user ids align with inserted order; adjust if necessary
INSERT INTO project_members(project_id,user_id,role) VALUES
(1,1,'OWNER'),
(1,3,'MEMBER'),
(1,4,'MEMBER'),
(2,2,'OWNER'),
(2,3,'MEMBER'),
(3,2,'OWNER'),
(3,5,'MEMBER'),
(4,1,'OWNER'),
(4,5,'MEMBER');

-- Add documents for projects
INSERT INTO documents(project_id,uploaded_by,title,file_name,file_type,file_size,storage_path,mime_type,description) VALUES
(1,3,'Getting Started','getting-started.md','md',2048,'/files/kbase/getting-started.md','text/markdown','Intro guide'),
(1,4,'Architecture','architecture.pdf','pdf',524288,'/files/kbase/architecture.pdf','application/pdf','System architecture'),
(2,3,'Onboarding Checklist','onboard-checklist.xlsx','xlsx',102400,'/files/onboarding/onboard-checklist.xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Checklist for onboarding'),
(3,2,'Research Summary','research-summary.docx','docx',204800,'/files/research/research-summary.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document','Summary of recent research'),
(4,1,'Public FAQ','faq.pdf','pdf',40960,'/files/public/faq.pdf','application/pdf','Public FAQ document');

SELECT 'seed_realistic_complete' AS status;
