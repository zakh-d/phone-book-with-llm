ollama serve &

pid=$!

sleep 5

ollama create phonebook-llm -f ./modelfile
touch /tmp/ollama_ready

wait $pid
