from fastapi import FastAPI, UploadFile, File
import pandas as pd
import io
from app.routes.ai_routes import router as ai_router

app = FastAPI()
app.include_router(ai_router)

@app.post("/analyze")
async def analyze_csv(file: UploadFile = File(...)):
    # Read CSV
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    # Convert CSV to text for AI
    csv_text = df.head(20).to_string()

    return {
        "message": "CSV received successfully",
        "rows": len(df),
        "columns": list(df.columns),
        "preview": csv_text
    }
