from dotenv import load_dotenv
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    CONTACTS_DB: str
    CONTACTS_DB_USER: str
    CONTACTS_DB_PASSWORD: str
    CONTACTS_DB_HOST: str = "localhost"
    CONTACTS_DB_PORT: int = 5432

    ENVIRONMENT: str = "dev"

    OLLAMA_URL: str = "http://localhost:11434"
    LLM_MODEL: str = "phonebook-llm"

    @property
    def postgres_dsn(self: "Settings") -> str:
        return (
            f"postgresql+asyncpg://{self.CONTACTS_DB_USER}"
            f":{self.CONTACTS_DB_PASSWORD}@{self.CONTACTS_DB_HOST}"
            f":{self.CONTACTS_DB_PORT}/{self.CONTACTS_DB}"
        )


load_dotenv()

settings = Settings()
