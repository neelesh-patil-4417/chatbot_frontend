import React, { useState } from "react";
import "./Chatbot.css";
import sendMessageToApi from "./Apicall";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = { text: newMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    try {
      const apiResponse = await sendMessageToApi(newMessage);

      // Assuming apiResponse is the list of user objects
      if (Array.isArray(apiResponse)) {
        apiResponse.forEach((user) => {
          const userDetails = `
            Name: ${user.name}
            Email: ${user.email}
            Phone: ${user.phone}
            Full-Time Salary: $${user.fullTimeSalary}
            Part-Time Salary: $${user.partTimeSalary}
            Skills: ${user.skills.join(", ")}

            Work Experience:
            ${user.workExperience.map(
              (experience) => `
                Role: ${experience.role}
                Company: ${experience.company}
                Duration: ${experience.startDate} - ${experience.endDate}
                Description: ${experience.description}
              `
            ).join("\n")}

            Education:
            ${user.education.map(
              (education) => `
                Degree: ${education.degree} in ${education.major}
                School: ${education.school}
                Grade: ${education.grade}
                Duration: ${education.startDate} - ${education.endDate}
              `
            ).join("\n")}
          `;

          const botMessage = { text: userDetails, isUser: false };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        });
      } else {
        const botMessage = { text: apiResponse, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Failed to get response from the bot.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };


  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="chatbot-title">Mercor Assist</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${message.isUser ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="chatbot-input"
        />
        <button onClick={handleSendMessage} className="chatbot-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
