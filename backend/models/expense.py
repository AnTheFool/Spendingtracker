from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from config import Base, engine

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String)
    account_id = Column(Integer, ForeignKey("accounts.id"))

    account = relationship("Account", back_populates="expenses")

Base.metadata.create_all(bind=engine)