from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.contacts.router import router as contacts_router
from app.llm.router import router as llm_router

app = FastAPI()
app.include_router(contacts_router, prefix="/api/contacts", tags=["contacts"])
app.include_router(llm_router, prefix="/api/llm", tags=["llm"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
