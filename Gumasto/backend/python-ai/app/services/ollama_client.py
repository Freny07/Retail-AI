import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"

def generate_response(prompt: str) -> str:
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=2)
    response.raise_for_status()

    data = response.json()
    return data.get("response", "")
