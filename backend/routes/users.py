from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_users():
    return {"message": "User endpoint placeholder"}