from datetime import date
from fastapi import HTTPException
from app.database import supabase  # ✅ Correct import now
import uuid
import traceback




def get_all_equipment():
    response = supabase.table("equipment").select("*").execute()
    data = response.data

    for item in data:
        for key, value in item.items():
            if isinstance(value, date):
                item[key] = value.isoformat()
    return data


def add_equipment(data: dict):
    try:
        if not data.get("id"):
            data["id"] = str(uuid.uuid4())

        for field in ['rental_date', 'return_date', 'purchase_date']:
            if field in data and data[field]:
                if isinstance(data[field], date):
                    data[field] = data[field].isoformat()

        supabase.table("equipment").insert(data).execute()
        return {
            "message": "Equipment added successfully",
            "id": data["id"]  # ✅ Return the new equipment id
        }
    except Exception as e:
        print("🔥 Error inserting:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
