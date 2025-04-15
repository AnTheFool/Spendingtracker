from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import expense, user, account
from routes import expenses, users, accounts

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Spending Tracker API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

expense.Base.metadata.create_all(bind=expense.engine)
user.Base.metadata.create_all(bind=user.engine)
account.Base.metadata.create_all(bind=account.engine)

app.include_router(expenses.router, prefix="/expenses")
app.include_router(users.router, prefix="/users")
app.include_router(accounts.router, prefix="/accounts")