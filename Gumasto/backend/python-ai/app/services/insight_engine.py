from app.services.ollama_client import generate_response
from app.utils.prompt_builder import build_insight_prompt

def generate_insight(request):
    metrics = request.metrics

    # Rule-based fallback message
    total_revenue = metrics.get("totalRevenue", 0)
    total_transactions = metrics.get("totalTransactions", 0)

    base_message = (
        f"Revenue is {total_revenue} across {total_transactions} transactions."
    )

    try:
        prompt = build_insight_prompt(request)
        explanation = generate_response(prompt)

        confidence = 0.9  # slightly lower for AI-generated text

    except Exception as e:
        # Fallback if Ollama is down
        explanation = (
            f"Revenue of {total_revenue} across {total_transactions} transactions "
            f"indicates {'high' if total_revenue > 10000 else 'moderate'} sales performance."
        )
        confidence = 0.95

    return {
        "message": base_message,
        "confidence": confidence,
        "explanation": explanation
    }
