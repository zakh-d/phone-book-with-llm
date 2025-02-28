import json
from typing import Sequence

from app.contacts.converters import contact_to_contact_in
from app.contacts.model import Contact
from app.contacts.schemas import ContactIn
from app.contacts.service import ContactService

from .repository import LLMRepository

CREATE_ACTION_RESPONSE_PROMTP_TEMPLATE = """
Generate a response for the following user prompt: {}
"""


GET_ACTION_RESPONSE_PROMTP_TEMPLATE = """
Generate a response for the following user prompt: {}

The system found following contacts in the database: 
{}

Generate textual response using json data from database that would match user prompt.

Return response only, no explanation needed.
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

        print(contacts_json)

        return await self._llm_repository.generate_response(
            GET_ACTION_RESPONSE_PROMTP_TEMPLATE.format(prompt, contacts_json)
        )

    async def process_user_prompt(self, prompt: str) -> str:
        response = await self._llm_repository.parse_user_prompt_to_json(prompt)
        print(response)
        if response is None:
            return "No response from LLM"

        action = response.get("action")
        payload = response.get("payload")

        if action is None:
            return "No action specified"

        if action == "create":
            await self._contact_service.create(ContactIn.model_validate(payload))
            return "Contact created"

        if action == "get":
            if payload and payload.get("name"):
                contacts = await self._contact_service.get_by_name(payload.get("name"))
                return await self.generate_response_for_found_contacts(prompt, contacts)

        if action == "list":
            contacts = await self._contact_service.get_all()
            return await self.generate_response_for_found_contacts(prompt, contacts)

        return "Action not supported"
