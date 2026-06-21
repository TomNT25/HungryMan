@echo off
setlocal

echo ==============================================
echo Booting up HungryMan Backend Microservices...
echo ==============================================

echo.
echo [1/2] Checking Authentication Service...
set AUTH_RUNNING=false
for /f "tokens=*" %%i in ('docker inspect -f "{{.State.Running}}" hungryman-authentication-service 2^>nul') do set AUTH_RUNNING=%%i

if "%AUTH_RUNNING%"=="true" (
    echo Authentication Service is already running. Skipping...
) else (
    echo Starting Authentication Service...
    cd Authentication-Service
    call docker-compose up --build -d
    cd ..
)

echo.
echo [2/2] Checking API Gateway...
set API_RUNNING=false
for /f "tokens=*" %%i in ('docker inspect -f "{{.State.Running}}" hungryman-api-gateway 2^>nul') do set API_RUNNING=%%i

if "%API_RUNNING%"=="true" (
    echo API Gateway is already running. Skipping...
) else (
    echo Starting API Gateway...
    cd API-GATEWAY
    call docker-compose up --build -d
    cd ..
)

echo.
echo ==============================================
echo All configured services are now running!
echo ==============================================
pause
