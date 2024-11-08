# CS631Project

# Run the DDL.sql script in the sql_scripts folder on a MySQL database
cd sql_scripts

# Locate the database.py file and update db_config to your MySQL workbench credentials

db_config = {
    'host': 'localhost',    
    'user': 'root',
    'passwd': 'password',
    'db': 'CS631_Project',
}

# Activate virtual environment 
cd backend/env
source bin/activate

# Run frontend 

cd frontend
npm run start