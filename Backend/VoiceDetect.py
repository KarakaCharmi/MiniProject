from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import time
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app)

# Predefined questions
questions = [
    "Who paid for this bill?",
    "How much amount did you pay?",
    "For what purpose did you pay?"
]

def generate_speech(text, filename):
    """Convert text to speech using gTTS and save as an MP3 file."""
    tts = gTTS(text=text, lang="en")
    tts.save(filename)

# Generate audio files for all questions at startup
audio_files = []
for i, question in enumerate(questions):
    filename = f"question_{i}.mp3"
    generate_speech(question, filename)
    audio_files.append(filename)

@app.route("/speak_question/<int:index>", methods=["GET"])
def speak_question(index):
    """Serve the requested question's speech file."""
    if 0 <= index < len(audio_files):
        return send_file(audio_files[index], as_attachment=False, mimetype="audio/mpeg")
    else:
        return jsonify({"error": "Invalid question index"}), 400

@app.route("/questions", methods=["GET"])
def get_questions():
    """Return the list of questions."""
    return jsonify({"questions": questions})

if __name__ == "__main__":
    print("🚀 Server is running on http://localhost:8000 and listening for requests...")
    app.run(debug=True, port=8000)
