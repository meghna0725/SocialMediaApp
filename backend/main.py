from fastapi import FastAPI
import mysql.connector as mysql 
from database import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# change for your database config 
db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'password',
    'db': 'CS631_Project',
}


try:
    # Attempt to establish a connection to the database
    db_connection = mysql.connect(**db_config)
    
    if db_connection.is_connected():
        print("Connected to MySQL database")
        cursor = db_connection.cursor()
        select_query = "SELECT * FROM users;"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        
except mysql.Error as e:
    print(f"Error connecting to MySQL database: {e}")
    
finally:
    try:
        if 'cursor' in locals() and cursor:
            cursor.close()
            print("Cursor closed")
        if 'db_connection' in locals() and db_connection.is_connected():
            db_connection.close()
            print("Database connection closed")
    except mysql.Error as e:
        print(f"Error closing database connection: {e}") 

    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)