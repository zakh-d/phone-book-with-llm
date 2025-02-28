import httpx
import json

from app.settings import settings


class LLMRepository:
    async def get_llm_response(self, prompt: str) -> dict | None:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                settings.OLLAMA_URL + "/api/generate",
                timeout=None,
                json={
                    "model": settings.LLM_MODEL,
                    "prompt": prompt + "\n Response using JSON",
                    "stream": False,
                    "format": {
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
                    },
                },
            )
            try:
                return json.loads(response.json().get("response"))
            except json.JSONDecodeError:
                return None
