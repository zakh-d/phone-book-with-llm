#!/bin/bash

# Run the database migrations
alembic upgrade head

# Start the FastAPI application
fastapi run app/main.py
