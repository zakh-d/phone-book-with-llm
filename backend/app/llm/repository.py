import httpx
import json

from app.settings import settings


class LLMRepository:
    ACTION_SCHEMA = {
        "type": "object",
        "properties": {
            "action": {
                "type": ["string", "null"],
                "enum": [
                    "create",
                    "get",
                    "list",
                    "update",
                    "delete",
                    None,
                ],
            },
            "payload": {
                "type": "object",
                "properties": {
                    "name": {"type": ["string", "null"]},
                    "phone_number": {"type": ["string", "null"]},
                },
                "required": ["name"],
            },
        },
        "required": ["action"],
    }

    async def parse_user_prompt_to_json(self, prompt: str) -> dict | None:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                settings.OLLAMA_URL + "/api/generate",
                timeout=None,
                json={
                    "model": settings.PROMPT_PARSING_MODEL,
                    "prompt": prompt + "\n Response using JSON",
                    "stream": False,
                    "format": self.ACTION_SCHEMA,
                },
            )
            try:
                return json.loads(response.json().get("response"))
            except json.JSONDecodeError:
                return None

    async def generate_response(self, prompt: str) -> str:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                settings.OLLAMA_URL + "/api/generate",
                timeout=None,
                json={
                    "model": settings.RESPONSE_GENERATING_MODEL,
                    "prompt": prompt,
                    "stream": False,
                },
            )
            return response.json().get("response")
