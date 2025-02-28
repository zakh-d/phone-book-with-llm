from typing import Sequence
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from .converters import contact_in_to_contact
from .model import Contact
from .repository import ContactRepository
from .schemas import ContactIn


class ContactService:
    def __init__(self, session: AsyncSession):
        self._repository = ContactRepository(session)

    async def create(self, contact_data: ContactIn) -> Contact:
        contact = contact_in_to_contact(contact_data)
        return await self._repository.save(contact)

    async def get(self, contact_id: UUID) -> Contact | None:
        return await self._repository.get(contact_id)
    
    async def get_by_name(self, name: str) -> Sequence[Contact]:
        return await self._repository.get_by_name(name)

    async def get_all(self) -> Sequence[Contact]:
        return await self._repository.get_all()

    async def delete(self, contact_id: UUID) -> None:
        contact = await self._repository.get(contact_id)
        if contact:
            await self._repository.delete(contact)

    async def update(self, contact_id: UUID, contact_data: ContactIn) -> Contact | None:
        contact = await self._repository.get(contact_id)
        if contact:
            contact.name = contact_data.name
            contact.phone_number = contact_data.phone_number
            return await self._repository.save(contact)
        return None
