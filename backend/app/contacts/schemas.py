from pydantic import BaseModel, Field
from uuid import UUID


class ContactIn(BaseModel):
    name: str = Field(max_length=100, examples=["John Doe"])
    phone_number: str = Field(pattern=r"^\+?[0-9 ()-]+$", examples=["+12 (34) 56-78-90"])


class ContactOut(ContactIn):
    id: UUID
