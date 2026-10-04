import os
import sys
import uvicorn

if __name__ == "__main__":
    # Ensure current directory is on python path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)

    print("=" * 60)
    print("[AIWardrobe] Starting Backend & AI Agent Service...")
    print("[Docs] Swagger UI: http://localhost:8000/docs")
    print("[Docs] ReDoc:      http://localhost:8000/redoc")
    print("[API]  Health:     http://localhost:8000/api/health")
    print("=" * 60)

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )
