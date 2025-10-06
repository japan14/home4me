import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

// API Key for RapidAPI
const RAPIDAPI_KEY = "26074f21f1msh37b82ab8ef926c7p1c0ee1jsn9f5eb54d2568";

function Chatbot() {
  // State for storing messages and loading state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle sending the message
  const handleSend = async (e) => {
    e.preventDefault();
    const userInput = e.target.message.value.trim();

    if (userInput) {
      // Add user's message to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userInput },
      ]);

      // Clear the input field
      e.target.reset();

      // Set loading state to true while waiting for a response
      setLoading(true);

      // Options for the API request
      const options = {
        method: "POST",
        url: "https://chat-gpt26.p.rapidapi.com/",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "chat-gpt26.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system", // System message to guide the bot
              content:
                "You are Home4Me Assistant, a helpful chatbot for housing-related inquiries. Provide clear, concise, and friendly answers.",
            },
            ...messages.map((msg) => ({
              role: msg.type === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: userInput },
          ],
        },
      };

      try {
        // API Request
        const response = await axios.request(options);

        // Extract and add bot's response to the conversation
        const botReply = response.data?.choices?.[0]?.message?.content;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: botReply || "Sorry, I couldn't understand that.",
          },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        // Turn off loading state
        setLoading(false);
      }
    }
  };

  return (
    <div className="chatbot">
      {/* Header */}
      <header className="chatbot-header">
        <h1>Home4Me Assistant</h1>
      </header>

      {/* Chat Display */}
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.type === "user" ? "user" : "bot"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="chatbot-message bot">Loading...</div>}
      </div>

      {/* Input Form */}
      <form className="chatbot-input-container" onSubmit={handleSend}>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="chatbot-input"
          autoComplete="off"
        />
        <button type="submit" className="chatbot-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
