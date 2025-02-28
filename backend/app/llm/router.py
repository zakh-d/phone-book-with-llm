from typing import Annotated
from fastapi import APIRouter, Depends

from app.deps import get_llm_service
from app.llm.schemas import UserPrompt
from app.llm.service import LLMService

router = APIRouter()

@router.post("/process")
async def process_user_prompt(user_prompt: UserPrompt, llm_service: Annotated[LLMService, Depends(get_llm_service)]):
    message = await llm_service.process_user_prompt(user_prompt.prompt)

    return {"message": message}
