ollama serve &

pid=$!

sleep 5

ollama create phonebook-llm -f ./modelfile

wait $pid
