from typing import Sequence
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .model import Contact


class ContactRepository:

    def __init__(self, session: AsyncSession):
        self._session = session

    async def save(self, contact: Contact) -> Contact:
        self._session.add(contact)
        await self._session.commit()
        return contact

    async def get(self, contact_id: UUID) -> Contact | None:
        return await self._session.get(Contact, contact_id)

    async def get_all(self) -> Sequence[Contact]:
        results = await self._session.execute(select(Contact))
        return results.scalars().all()

    async def delete(self, contact: Contact) -> None:
        await self._session.delete(contact)
        await self._session.commit()
