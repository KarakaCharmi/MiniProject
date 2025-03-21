from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Configure Google Gemini AI
genai.configure(api_key="AIzaSyBLN1UJ2Wy2lEKcX8YIoVTS5nYqguKJCGM")
model = genai.GenerativeModel("gemini-2.0-pro-exp")

SYSTEM_INSTRUCTION = (
    "You are an AI travel assistant providing **short and structured** travel recommendations. "
    "Respond in a **WhatsApp-style chat format** with concise and engaging details. "
    "Break responses into short messages for readability, using line breaks where needed. "
    "Include key details such as:\n\n"
    "📍 *Place*: [City/Country]\n"
    "📌 *Location*: [Specific spot or landmark]\n"
    "⭐ *Top Attraction*: [Must-visit place]\n"
    "🍽️ *Must-Try Food*: [Local delicacy]\n"
    "🕒 *Best Time to Visit*: [Specific time of day or season]\n\n"
    "Keep responses **clear, interactive, and engaging**. "
    "Use emojis where appropriate and retain conversation context for follow-up questions."
)


chat_history = []

@app.route("/get_travel_info", methods=["POST"])
def get_travel_info():
    data = request.json
    user_input = data.get("user_query", "")

    chat_history.append(f"User: {user_input}")
    conversation_context = "\n".join(chat_history[-5:])  # Keep last 5 messages
    prompt = f"{SYSTEM_INSTRUCTION}\n\n{conversation_context}\nAI:"

    try:
        response = model.generate_content(prompt)
        if response.text:
            chat_history.append(f"AI: {response.text.strip()}")
            return jsonify({"response": response.text.strip()})
        else:
            return jsonify({"response": "I'm not sure, could you clarify your request?"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
