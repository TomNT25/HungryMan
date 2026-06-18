-- Authentication Service: Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);

-- Seed basic roles
INSERT INTO roles (name, description) VALUES 
('Administrator', 'System administrator with full permissions'),
('User', 'Regular user account')
ON CONFLICT (name) DO NOTHING;
