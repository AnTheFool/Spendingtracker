from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from models.expense import Expense
from models.account import Account
from config import SessionLocal

router = APIRouter()

@router.get("/")
def get_expenses():
    db = SessionLocal()
    expenses = db.query(Expense).all()
    db.close()
    return expenses

@router.post("/")
def create_expense(expense_data: dict):
    db = SessionLocal()
    new_expense = Expense(**expense_data)
    account = db.query(Account).filter(Account.id == new_expense.account_id).first()

    if not account:
        db.close()
        raise HTTPException(status_code=404, detail="Account not found")

    account.balance -= new_expense.amount
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    db.close()
    return new_expense

@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    db = SessionLocal()
    expense = db.query(Expense).get(expense_id)
    if not expense:
        db.close()
        raise HTTPException(status_code=404, detail="Expense not found")

    account = db.query(Account).get(expense.account_id)
    if account:
        account.balance += expense.amount

    db.delete(expense)
    db.commit()
    db.close()
    return {"message": "Deleted"}

@router.delete("/")
def delete_all_expenses():
    db = SessionLocal()
    all_expenses = db.query(Expense).all()
    for exp in all_expenses:
        account = db.query(Account).get(exp.account_id)
        if account:
            account.balance += exp.amount
        db.delete(exp)
    db.commit()
    db.close()
    return {"message": "All expenses deleted."}