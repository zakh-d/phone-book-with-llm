FROM ollama/ollama:0.5.12


COPY . .
RUN chmod +x run_model.sh

ENTRYPOINT ["sh", "/run_model.sh"]
