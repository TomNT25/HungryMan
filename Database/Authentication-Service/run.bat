@echo off
REM Authentication Service PostgreSQL Schema Runner
SET DB_NAME=${DB_NAME}
SET DB_USER=${DB_USER}
SET CONTAINER_NAME=${CONTAINER_NAME}
SET PGPASSWORD=${PGPASSWORD}

echo ----------------------------------------------------
echo Deploying database schema to %DB_NAME% inside container %CONTAINER_NAME%
echo ----------------------------------------------------

echo [1/3] Copying schema files to container...
docker exec -i %CONTAINER_NAME% mkdir -p /database
docker cp . %CONTAINER_NAME%:/database/

echo [2/3] Executing SQL schema compilation...
docker exec -i -e PGPASSWORD=%PGPASSWORD% -w /database %CONTAINER_NAME% psql -U %DB_USER% -d %DB_NAME% -f run_all.sql

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Database deployment failed!
) else (
    echo [SUCCESS] Database deployment finished successfully.
)

echo [3/3] Cleaning up temporary files...
docker exec -i %CONTAINER_NAME% rm -rf /database

pause
