from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.crud import get_all_equipment, add_equipment
from app.models import Equipment
from app.database import supabase  # ✅ (needed to delete directly)
from fastapi.responses import JSONResponse

app = FastAPI()

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes

@app.get("/equipment")
def read_equipment():
    return get_all_equipment()

@app.api_route("/equipment", methods=["POST", "OPTIONS"])
async def create_equipment(request: Request):
    if request.method == "OPTIONS":
        return JSONResponse(status_code=200, content={"message": "CORS Preflight OK"})

    data = await request.json()  # ✅ manually read body
    return add_equipment(data)

@app.delete("/equipment/{equipment_id}")
async def delete_equipment(equipment_id: str, request: Request):
    if request.method == "OPTIONS":
        return JSONResponse(status_code=200, content={"message": "CORS Preflight OK"})

    try:
        response = supabase.table("equipment").delete().eq("id", equipment_id).execute()

        if response.data is None or len(response.data) == 0:
            return JSONResponse(status_code=404, content={"message": "Equipment not found"})
        
        return {"message": "Equipment deleted successfully"}

    except Exception as e:
        print("🔥 Delete error:", e)
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@app.get("/")
def root():
    return {"message": "RMT Equipment Backend is running 🚜"}
