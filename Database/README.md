# PostgreSQL Database Scripts

This folder contains PostgreSQL initialization and schema deployment scripts for the microservices database layer.

## Directory Structure

```
Database/
├── Authentication-Service/             # Auth Database Schema
│   ├── tables/                         # DDL Table Scripts
│   ├── views/                          # Database Views
│   ├── stored_procedures/              # Stored Procedures
│   ├── functions/                      # Stored Functions
│   ├── run_all.sql                     # Master migration runner
│   └── run.bat                         # Batch command helper
└── Product-Service/                    # Product Catalog Database Schema
    ├── tables/
    ├── views/
    ├── stored_procedures/
    ├── functions/
    ├── run_all.sql
    └── run.bat
```

## Running Scripts

1. Ensure you have **PostgreSQL** installed and running.
2. The batch (`.bat`) files assume the `psql` command line tool is in your system's PATH.
3. Open a terminal/command prompt or double-click the `run.bat` file within the respective database folder.
4. Modify the DB name, user, host, or port configuration inside the `run.bat` file if needed.
5. Execute `run.bat`.
