-- Authentication Service: User Details View
CREATE OR REPLACE VIEW vw_user_details AS
SELECT 
    u.id AS user_id,
    u.username,
    u.email,
    u.is_active,
    u.created_at,
    COALESCE(string_agg(r.name, ', '), '') AS roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
GROUP BY u.id, u.username, u.email, u.is_active, u.created_at;
