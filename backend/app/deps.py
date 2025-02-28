from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.contacts.service import ContactService
from app.db import get_db_session
from app.llm.service import LLMService


def get_contact_service(
    session: Annotated[AsyncSession, Depends(get_db_session)],
) -> ContactService:
    return ContactService(session)


def get_llm_service(
    contact_service: Annotated[ContactService, Depends(get_contact_service)],
) -> LLMService:
    return LLMService(contact_service)
