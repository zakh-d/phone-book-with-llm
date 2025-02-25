from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db_session
from app.contacts.service import ContactService


def get_contact_service(session: Annotated[AsyncSession, Depends(get_db_session)]) -> ContactService:
    return ContactService(session)
