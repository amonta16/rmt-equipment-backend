from pydantic import BaseModel
from typing import Optional
from datetime import date


class Equipment(BaseModel):
    id: Optional[str] = None  # ✅ Make optional
    name: str
    type: str
    status: str
    rental_date: Optional[date] = None  # ✅ Make optional
    return_date: Optional[date] = None  # ✅ Make optional
    purchase_date: Optional[date] = None  # ✅ Already optional
    notes: Optional[str] = None  # ✅ Make optional