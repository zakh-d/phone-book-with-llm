from typing import List
from fastapi import APIRouter

from .schemas import ContactIn, ContactOut

router = APIRouter()


@router.get("/")
async def get_list_of_contacts() -> List[ContactOut]:
    pass


@router.get("/{contact_id}")
async def get_contact_details(contact_id: int) -> ContactOut:
    pass


@router.post("/")
async def create_contact(contact: ContactIn) -> ContactOut:
    pass


@router.put("/{contact_id}")
async def update_contact(contact_id: int, contact: ContactIn) -> ContactOut:
    pass


@router.delete("/{contact_id}")
async def delete_contact(contact_id: int):
    pass
