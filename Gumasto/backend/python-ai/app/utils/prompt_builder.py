def build_insight_prompt(request) -> str:
    return f"""
You are a retail business analyst AI.

Given the following metrics, generate a short business insight.
You are a retail analytics AI.

Store ID: {request.store_id}
Total Revenue: {request.metrics.get('totalRevenue', 0) if request.metrics else 0}
Total Transactions: {request.metrics.get('totalTransactions', 0) if request.metrics else 0}

Respond ONLY in valid JSON:
{{
  "insight": {{
    "message": "...",
    "confidence": 0.0,
    "explanation": "..."
  }}
}}

Rules:
- Be concise
- Use plain English
- No bullet points
- No emojis
- Maximum 3 sentences
"""
