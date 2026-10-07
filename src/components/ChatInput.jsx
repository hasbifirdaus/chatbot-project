import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    if (inputText === "" || isLoading) return;

    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];

    setChatMessages(newChatMessages);
    setInputText("");
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);

    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder={isLoading ? "Loading..." : "Send a message to Chatbot"}
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}
