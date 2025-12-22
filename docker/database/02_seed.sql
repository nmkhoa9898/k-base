-- Seed data for KBase (safe for development)

-- Users
INSERT INTO users(email,password,full_name,role) VALUES
('owner1@kbase.com','changeme','Owner One','OWNER'),
('user1@kbase.com','changeme','User One','USER');

-- Projects (owner_id references first user)
INSERT INTO projects(project_name,description,owner_id) VALUES
('Example Project','Seed project for testing',1);

-- Project members (add user1 as MEMBER)
INSERT INTO project_members(project_id,user_id,role) VALUES
(1,1,'OWNER'),
(1,2,'MEMBER');

-- Documents (uploaded_by user1)
INSERT INTO documents(project_id,uploaded_by,title,file_name,file_type,file_size,storage_path,mime_type,description) VALUES
(1,2,'Welcome','welcome.pdf','pdf',1024,'/files/welcome.pdf','application/pdf','Welcome document for project');

-- Show counts
SELECT 'seed_complete' AS status;
