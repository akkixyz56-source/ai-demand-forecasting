from fastapi import APIRouter, UploadFile, File
import shutil
import pandas as pd

router = APIRouter()

@router.post("/upload")

async def upload_dataset(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read CSV
    df = pd.read_csv(file_path)

    return {
        "filename": file.filename,
        "columns": list(df.columns),
        "rows": len(df)
    }