from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.contacts.service import ContactService
from app.deps import get_contact_service

from .schemas import ContactIn, ContactOut
from .converters import contact_in_to_contact, contact_to_contact_out

router = APIRouter()


@router.get("/")
async def get_list_of_contacts(
    contact_service: Annotated[ContactService, Depends(get_contact_service)],
) -> List[ContactOut]:
    return [contact_to_contact_out(contact) for contact in await contact_service.get_all()]


@router.get("/{contact_id}")
async def get_contact_details(
    contact_id: UUID,
    contact_service: Annotated[ContactService, Depends(get_contact_service)],
) -> ContactOut:
    contact = await contact_service.get(contact_id)
    if contact is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found"
        )
    return contact_to_contact_out(contact)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contact(contact_data: ContactIn, contact_service: Annotated[ContactService, Depends(get_contact_service)]) -> ContactOut:
    contact = await contact_service.create(contact_data)
    return contact_to_contact_out(contact)
    


@router.put("/{contact_id}")
async def update_contact(contact_id: UUID, contact_data: ContactIn, contact_service: Annotated[ContactService, Depends(get_contact_service)]) -> ContactOut:
    contact = await contact_service.update(contact_id, contact_data)
    if contact is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found"
        )
    return contact_to_contact_out(contact)



@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(contact_id: UUID, contact_service: Annotated[ContactService, Depends(get_contact_service)]):
    await contact_service.delete(contact_id)
    
