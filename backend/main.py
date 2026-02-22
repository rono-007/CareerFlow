from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uuid
from services.resume_service import analyze_resume

app = FastAPI(title="CareerFlow API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "CareerFlow API is running"}

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Analyze resume against job description using Groq AI agents.
    """
    print(f"[API] Received: {file.filename}")
    
    # Validate file type
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".pdf", ".docx", ".txt"]:
        raise HTTPException(400, "Only PDF, DOCX, or TXT files allowed")
    
    # Save file temporarily
    file_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}{ext}")
    try:
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Run analysis
        result = analyze_resume(file_path, job_description)
        return result
    
    except Exception as e:
        print(f"[API] Error: {e}")
        raise HTTPException(500, str(e))
    
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
