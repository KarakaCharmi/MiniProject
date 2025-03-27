import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ListeningLoader from "../../ui/ListeningLoader";
import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useBillContext } from "../../contextapi/BillContextApi";

const PayBillVoice = () => {
  const { setPurpose, whoPaidBill, totalAmount } = useBillContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    "Loading question...",
    "Loading question...",
    "Loading question...",
  ]); // Default placeholders
  const [answers, setAnswers] = useState(["", "", ""]); // Ensure text areas are visible from the start
  const [isListening, setIsListening] = useState(false);
  const [activeListeningIndex, setActiveListeningIndex] = useState(null);
  const [hasStarted, setHasStarted] = useState(false); // Track if playback started
  const recognitionRef = useRef(null);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Function to play questions and start answering automatically
  const playQuestions = async () => {
    setHasStarted(true); // Mark as started
    for (let i = 0; i < questions.length; i++) {
      const audio = new Audio(`http://localhost:8000/speak_question/${i}`);

      await audio
        .play()
        .catch((error) => console.error("Audio play error:", error));

      // Wait for audio to finish before starting recognition
      await new Promise((resolve) => {
        audio.onended = resolve;
      });

      // Set listening state for the entire 15-second window
      setActiveListeningIndex(i);
      setIsListening(true);

      // Start answering automatically
      startListening(i);

      // Wait 15 seconds before moving to the next question
      await new Promise((resolve) => setTimeout(resolve, 8000));

      // Reset listening states
      setIsListening(false);
      setActiveListeningIndex(null);
    }
  };

  // Function to start speech recognition for a specific question
  const startListening = (index) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[index] = transcript; // Update the correct text box
        return updatedAnswers;
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="bg-slate-50 p-8 rounded-md w-[38rem]">
      <h2 className="bg-purple-200 py-3 px-4 rounded-md text-center tracking-widest font-semibold flex justify-between">
        <span>Expense Tracker</span>
        <button
          disabled={hasStarted}
          title="Start Voice Assistant"
          onClick={playQuestions}
        >
          🔊
        </button>
      </h2>
      {isListening && <ListeningLoader />}

      <div className="mt-6 text-[#28104E]">
        <div className="flex mb-6 items-center">
          <div className="basis-[10rem] tracking-widest ">Who Paid ??</div>
          <input
            className="border-2 border-solid grow py-1 px-3 tracking-widest outline-1 outline-purple-400 border-purple-300 rounded-lg"
            value={answers[0]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[0] = e.target.value;
              setAnswers(newAnswers);
              whoPaidBill(e.target.value);
              setIsListening(true);
            }}
          />
        </div>

        <div className="flex mb-6 items-center">
          <div className="basis-[10rem] tracking-widest">Amount</div>
          <input
            className="border-2 border-solid grow py-1 px-3 tracking-widest outline-1 outline-purple-400 border-purple-300 rounded-lg"
            value={answers[1]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[1] = e.target.value;
              setAnswers(newAnswers);
              totalAmount(Number(e.target.value));
              setIsListening(false);
            }}
          />
        </div>
        <div className="flex mb-6 items-center">
          <div className="basis-[10rem] tracking-widest">Purpose</div>
          <input
            className="border-2 border-solid grow py-1 px-3 tracking-widest outline-1 outline-purple-400 border-purple-300 rounded-lg"
            value={answers[2]}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[2] = e.target.value;
              setAnswers(newAnswers);
              setPurpose(e.target.value);
              setIsListening(false);
            }}
          />
        </div>
      </div>

      <div>
        <button
          className="px-4 py-2 rounded-full bg-purple-600 text-white shadow-md tracking-widest font-medium text-md flex gap-3 items-center ml-auto"
          onClick={() => navigate("newExpense")}
        >
          <span>Next</span> <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PayBillVoice;
