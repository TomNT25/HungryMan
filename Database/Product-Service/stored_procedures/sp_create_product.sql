-- Product Service: Create Product Stored Procedure
CREATE OR REPLACE PROCEDURE sp_create_product(
    p_name VARCHAR(150),
    p_description TEXT,
    p_price DECIMAL(10,2),
    p_stock_quantity INT,
    p_category_name VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_category_id INT;
BEGIN
    -- Ensure category exists
    SELECT id INTO v_category_id FROM categories WHERE name = p_category_name;
    
    IF v_category_id IS NULL THEN
        INSERT INTO categories (name)
        VALUES (p_category_name)
        RETURNING id INTO v_category_id;
    END IF;

    -- Insert product
    INSERT INTO products (name, description, price, stock_quantity, category_id)
    VALUES (p_name, p_description, p_price, p_stock_quantity, v_category_id);
END;
$$;
