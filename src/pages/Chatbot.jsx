import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatHistory");
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    sessionStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:8000/get_travel_info",
        {
          user_query: input,
        }
      );

      const botMessage = { text: response.data.response, sender: "bot" };
      const newChat = [...updatedMessages, botMessage];
      setMessages(newChat);
      sessionStorage.setItem("chatHistory", JSON.stringify(newChat));
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = {
        text: "Sorry, there was an error processing your request.",
        sender: "bot",
      };
      setMessages([...updatedMessages, errorMessage]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white w-[90%] max-w-2xl h-[80%] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-1 bg-purple-900 text-white rounded-t-lg">
          <h3 className="text-lg font-bold px-4">Chatbot</h3>
          <button className=" text-5xl text-red-600  pr-2 " onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 my-1 rounded-lg text-sm max-w-[450px] ${
                  msg.sender === "user"
                    ? "bg-purple-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input & Send Button */}
        <div className="flex border-t p-2 bg-gray-100">
          <input
            type="text"
            className="flex-1 border rounded-l-md p-2 text-sm outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-purple-700 text-white px-4 rounded-r-md hover:bg-purple-600"
            onClick={handleSendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
