from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncAttrs, AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.pool import NullPool

from app.settings import settings

# Create the async engine
engine = create_async_engine(
    settings.postgres_dsn, echo=settings.ENVIRONMENT == "dev", poolclass=NullPool
)

# Create the async session
async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Get a database session"""
    async with async_session() as session:
        yield session


class Base(AsyncAttrs, DeclarativeBase):
    pass
