from fastapi import APIRouter, HTTPException
from config import SessionLocal
from models.account import Account

router = APIRouter()

@router.get("/")
def get_accounts():
    db = SessionLocal()
    accounts = db.query(Account).all()
    db.close()
    return accounts

@router.post("/")
def create_account(account_data: dict):
    db = SessionLocal()
    account = Account(**account_data)
    db.add(account)
    db.commit()
    db.refresh(account)
    db.close()
    return account