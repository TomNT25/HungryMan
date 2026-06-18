-- Product Service: Product Catalog View
CREATE OR REPLACE VIEW vw_product_catalog AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.description AS product_description,
    p.price,
    p.stock_quantity,
    p.is_available,
    c.id AS category_id,
    c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
