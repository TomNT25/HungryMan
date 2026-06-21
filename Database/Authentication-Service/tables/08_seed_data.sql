-- Authentication Service: Centralized Seed Data

-- 1. Insert Core Roles
INSERT INTO roles (name, description, is_system_role, is_active) VALUES 
('System Administrator', 'Has complete and unrestricted access to the entire platform.', TRUE, TRUE),
('Organization', 'B2B Client managing cafeterias and workforce meal plans.', TRUE, TRUE),
('User', 'Standard consumer account with standard privileges.', TRUE, TRUE)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Default Administrator Account
-- Default Password: Admin@123 (Standard BCrypt Hash)
INSERT INTO users (
    username, 
    email, 
    password_hash, 
    first_name, 
    last_name, 
    provider, 
    is_active, 
    is_email_verified
) VALUES (
    'admin', 
    'admin@hungryman.com', 
    '$2y$10$rnDmsO.t64mfdQIYn/uTEOiLRqgiYC83Yq.SRqBkF8FcvykczeS/i', 
    'Super', 
    'Admin', 
    'system', 
    TRUE, 
    TRUE
) ON CONFLICT (username) DO NOTHING;

-- 3. Assign System Administrator Role to the Default Admin
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.username = 'admin' AND r.name = 'System Administrator'
AND NOT EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = u.id AND ur.role_id = r.id
);
