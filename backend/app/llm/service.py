from app.contacts.schemas import ContactIn
from app.contacts.service import ContactService

from .repository import LLMRepository


class LLMService:
    
    def __init__(self, contact_service: ContactService):
        self._contact_service = contact_service
        self._llm_repository = LLMRepository()

    async def process_user_prompt(self, prompt: str) -> str:

        response = await self._llm_repository.get_llm_response(prompt)
        
        if response is None:
            return "No response from LLM"

        action = response.get("action")
        payload = response.get("payload")

        if action is None:
            return "No action specified"

        if action == "create":
            await self._contact_service.create(ContactIn.model_validate(payload)) 
            return "Contact created"
        
        return "Action not supported"
