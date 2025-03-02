import json
from typing import Sequence

from app.contacts.converters import contact_to_contact_in
from app.contacts.model import Contact
from app.contacts.schemas import ContactIn
from app.contacts.service import ContactService

from .repository import LLMRepository

CREATE_ACTION_RESPONSE_PROMTP_TEMPLATE = """
Generate a textual response for the following user prompt: {}

The system has created this contact
"""

GET_ACTION_RESPONSE_PROMTP_TEMPLATE = """
Generate a textual response for the following user prompt: {}

The system found following contacts in the database: 
{}

Use json data from database that would match user prompt.

Return response only, no explanation needed.
"""

ACTION_NOT_SUPPORTED_RESPONSE_PROMPT = """
Generate a textual response for the following user prompt: {}

This action is not supported by the system.
Ask user to try again with a different action create contact, find contact, list contacts, update contact, delete contact.
"""

CONTACT_NOT_FOUND_RESPONSE_PROMPT = """
Generate a textual response for the following user prompt: {}

The system could not find any contacts with the given name inform user to try again with a different name.
"""

CONTACT_UPDATED_RESPONSE_PROMPT = """
Generate a textual response for the following user prompt: {}

The system has updated the contact.
"""

CONTACT_DELETED_RESPONSE_PROMPT = """
Generate a textual response for the following user prompt: {}

The system has deleted the contact.
"""


class LLMService:
    def __init__(self, contact_service: ContactService):
        self._contact_service = contact_service
        self._llm_repository = LLMRepository()

    async def generate_response_for_found_contacts(
        self, prompt: str, contacts: Sequence[Contact]
    ) -> str:
        contacts_json = json.dumps(
            [contact_to_contact_in(contact).model_dump() for contact in contacts]
        )

        return await self._llm_repository.generate_response(
            GET_ACTION_RESPONSE_PROMTP_TEMPLATE.format(prompt, contacts_json)
        )

    async def process_user_prompt(self, prompt: str) -> str:
        response = await self._llm_repository.parse_user_prompt_to_json(prompt)
        if response is None:
            return "No response from LLM"

        action = response.get("action")
        payload = response.get("payload")

        if action is None:
            return await self._llm_repository.generate_response(
                ACTION_NOT_SUPPORTED_RESPONSE_PROMPT.format(prompt)
            )

        if action == "create":
            await self._contact_service.create(ContactIn.model_validate(payload))
            return await self._llm_repository.generate_response(
                CREATE_ACTION_RESPONSE_PROMTP_TEMPLATE.format(prompt)
            )

        if action == "get":
            if payload and payload.get("name"):
                contacts = await self._contact_service.get_by_name(payload.get("name"))
                return await self.generate_response_for_found_contacts(prompt, contacts)

        if action == "list":
            contacts = await self._contact_service.get_all()
            return await self.generate_response_for_found_contacts(prompt, contacts)

        if action == "update":
            if payload and payload.get("name"):
                contacts_with_matching_name = await self._contact_service.get_by_name(
                    payload.get("name")
                )
                if len(contacts_with_matching_name) == 0:
                    return await self._llm_repository.generate_response(
                        CONTACT_NOT_FOUND_RESPONSE_PROMPT.format(prompt)
                    )
                for contact in contacts_with_matching_name:
                    await self._contact_service.update(
                        contact.id, ContactIn.model_validate(payload)
                    )
                return await self._llm_repository.generate_response( 
                    CONTACT_UPDATED_RESPONSE_PROMPT.format(prompt)
                )

        if action == "delete":
            if payload and payload.get("name"):
                contacts_with_matching_name = await self._contact_service.get_by_name(
                    payload.get("name")
                )
                if len(contacts_with_matching_name) == 0:
                    return await self._llm_repository.generate_response(
                        CONTACT_NOT_FOUND_RESPONSE_PROMPT.format(prompt)
                    )
                for contact in contacts_with_matching_name:
                    await self._contact_service.delete(contact.id)
                return await self._llm_repository.generate_response(
                    CONTACT_DELETED_RESPONSE_PROMPT.format(prompt)
                )

        return await self._llm_repository.generate_response(
            ACTION_NOT_SUPPORTED_RESPONSE_PROMPT.format(prompt)
        )
