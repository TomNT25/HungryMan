-- Authentication Service: Create User Stored Procedure
CREATE OR REPLACE PROCEDURE sp_create_user(
    p_username VARCHAR(50),
    p_email VARCHAR(100),
    p_password_hash VARCHAR(255),
    p_role_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INT;
    v_role_id INT;
BEGIN
    -- Insert user
    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash)
    RETURNING id INTO v_user_id;

    -- Get role ID
    SELECT id INTO v_role_id FROM roles WHERE name = p_role_name;

    -- Assign role if found
    IF v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id)
        VALUES (v_user_id, v_role_id);
    END IF;
END;
$$;
