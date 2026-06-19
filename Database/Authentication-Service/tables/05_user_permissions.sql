-- Authentication Service: User Permissions Junction Table
CREATE TABLE IF NOT EXISTS user_permissions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT,
    is_active BOOLEAN DEFAULT TRUE
);
