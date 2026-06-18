-- Authentication Service: Master Compilation Script
\echo '--- Deploying Functions ---'
\i functions/fn_update_timestamp.sql

\echo '--- Deploying Tables ---'
\i tables/01_users.sql
\i tables/02_roles.sql
\i tables/03_user_roles.sql

\echo '--- Deploying Views ---'
\i views/vw_user_details.sql

\echo '--- Deploying Stored Procedures ---'
\i stored_procedures/sp_create_user.sql

\echo '--- Deployment Complete ---'
