# Phonebook with LLM integration

This project offers traditional crud operations for contacts as well 
as natural language processing capabilities. Check [youtube video](https://youtu.be/fceY1n-L0Ds?si=At07O2vmqb4Hi_6y)
where I show its functionality.

The project is built using 
- Python with FastAPI for backend 
- Postgres as a database
- sqlalchemy as ORM and alembic for migrations(will be run automatically on container start)
- llama3.2:1b model inside ollama container
- React for frontend.
- nginx for reverse proxy and serving build frontend files

Docker composition is used to run the project. 

Note that LLM is run in docker container as well hence 
its performance depends greatly on your machine's performance. I recommend at least 6GB of RAM to run the project.

## Project architecture
```mermaid
flowchart TB
    frontend["nginx
        react build files
        reverse proxy to backend
    "] 

    backend["Python
        FastAPI
    "]

    postgres[("Postgres")]

    llama["ollama
        llama3.2:1b
    "]

    frontend --> backend
    backend --> postgres
    backend --> llama

    
```
## How to run the project
1. Clone the repository
2. Create .env file based on `.env.example`
3. Run `docker compose up -d --build`
4. Open [http://localhost:8888](http://localhost:8888) in your browser
5. OpenAPI documentation is available at [http://localhost:8888/docs](http://localhost:8888/docs)

## Walkthrough video
[![Youtube Video](https://img.youtube.com/vi/fceY1n-L0Ds/0.jpg)](https://youtu.be/fceY1n-L0Ds?si=At07O2vmqb4Hi_6y)
