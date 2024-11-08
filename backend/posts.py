import pydantic
from fastapi import APIRouter

router = APIRouter()

db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'password',
    'db': 'CS631_Project',
}

class Post():
    def __init__(self) -> None:
        pass

def create_post():
    pass 

def delete_post():
    pass 

