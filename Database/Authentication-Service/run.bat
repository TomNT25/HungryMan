@echo off
REM Authentication Service PostgreSQL Schema Runner
SET DB_NAME=auth
SET DB_USER=postgres
SET DB_HOST=localhost
SET DB_PORT=5432

echo ----------------------------------------------------
echo Deploying database schema to %DB_NAME% at %DB_HOST%:%DB_PORT%
echo ----------------------------------------------------

psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f run_all.sql

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Database deployment failed!
) else (
    echo [SUCCESS] Database deployment finished successfully.
)
pause
