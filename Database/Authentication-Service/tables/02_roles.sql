-- Authentication Service: Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_system_role BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT
);
