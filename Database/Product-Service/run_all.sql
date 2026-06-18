-- Product Service: Master Compilation Script
\echo '--- Deploying Functions ---'
\i functions/fn_update_timestamp.sql

\echo '--- Deploying Tables ---'
\i tables/01_categories.sql
\i tables/02_products.sql

\echo '--- Deploying Views ---'
\i views/vw_product_catalog.sql

\echo '--- Deploying Stored Procedures ---'
\i stored_procedures/sp_create_product.sql

\echo '--- Deployment Complete ---'
