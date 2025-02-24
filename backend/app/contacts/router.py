from typing import Annotated, List
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db

from .schemas import ContactIn, ContactOut

router = APIRouter()


@router.get("/")
async def get_list_of_contacts() -> List[ContactOut]:
    pass


@router.get("/{contact_id}")
async def get_contact_details(contact_id: int) -> ContactOut:
    pass


@router.post("/")
async def create_contact(
    contact: ContactIn, db: Annotated[AsyncSession, Depends(get_db)]
) -> ContactOut:
    return ContactOut(
        id=uuid.uuid4(), phone_number=contact.phone_number, name=contact.name
    )


@router.put("/{contact_id}")
async def update_contact(contact_id: int, contact: ContactIn) -> ContactOut:
    pass


@router.delete("/{contact_id}")
async def delete_contact(contact_id: int):
    pass
