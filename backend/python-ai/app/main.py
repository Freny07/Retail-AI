from fastapi import FastAPI
from .routes.ai_routes import ai_routes
from pydantic import BaseModel

app = FastAPI(title="Python AI Service")

class InsightRequest(BaseModel):
    store_id: str
    product_ids: list
    start_date: str
    end_date: str
    metrics: list

@app.post("/ai/insight")
def generate_insight(data: InsightRequest):
    return {
        "insight": {
            "message": "Sales expected to rise by 12%",
            "confidence": 0.87,
            "explanation": "Based on historical demand patterns"
        }
    }

# Include AI routes
app.include_router(ai_routes.router, prefix="/ai")

# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}