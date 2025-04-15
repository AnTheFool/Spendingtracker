from sqlalchemy import Column, Integer, Float, String
from sqlalchemy.orm import relationship
from config import Base, engine

class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    balance = Column(Float, default=0.0)

    expenses = relationship("Expense", back_populates="account")

Base.metadata.create_all(bind=engine)