from fastapi import FastAPI
from app.contacts import contacts_router


app = FastAPI()
app.include_router(contacts_router, prefix="/api/contacts", tags=["contacts"])


@app.get("/")
def read_root():
    return {"status": "Everything is fine"}
