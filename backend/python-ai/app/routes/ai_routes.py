from fastapi import APIRouter
from app.schemas.request_models import InsightRequest

router = APIRouter(prefix="/ai")

@router.post("/insight")
async def insight_endpoint(request: InsightRequest):
    return {
        "insight": {
            "message": "Test insight",
            "confidence": 0.99,
            "explanation": "Pipeline working"
        }
    }
