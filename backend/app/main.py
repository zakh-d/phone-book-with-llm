from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.contacts import contacts_router

app = FastAPI()
app.include_router(contacts_router, prefix="/api/contacts", tags=["contacts"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "Everything is fine"}
