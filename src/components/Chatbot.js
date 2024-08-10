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
        console.log("API response:");
        console.log(apiResponse);
        const botMessage = { text: apiResponse, isUser: false };
        console.log(botMessage);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Failed to get response from the bot.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const formatMessage = (message) => {
    if (!message || !message.text) {
      return <p>Message content is not available.</p>;
    }
  
    const data = message.text;
  
    return (
      <div className="user-info">
        <h3>{data.name || "Name not available"}</h3>
        <p><strong>Email:</strong> {data.email || "Email not available"}</p>
        <p><strong>Phone:</strong> {data.phone || "Phone not available"}</p>
        <p><strong>Full-Time Salary:</strong> ${data.fullTimeSalary || "N/A"}</p>
        <p><strong>Part-Time Salary:</strong> ${data.partTimeSalary || "N/A"}</p>
        <p><strong>Skills:</strong> {Array.isArray(data.skills) ? data.skills.join(", ") : "Skills not available"}</p>
  
        <div className="section">
          <h4>Work Experience:</h4>
          {Array.isArray(data.workExperience) && data.workExperience.length > 0 ? (
            data.workExperience.map((exp, index) => (
              <div key={index} className="experience">
                <p><strong>Role:</strong> {exp.role || "Role not available"}</p>
                <p><strong>Company:</strong> {exp.company || "Company not available"}</p>
                <p><strong>Duration:</strong> {exp.startDate || "Start date not available"} - {exp.endDate || "End date not available"}</p>
                <p><strong>Description:</strong> {exp.description || "Description not available"}</p>
              </div>
            ))
          ) : (
            <p>No work experience available</p>
          )}
        </div>
  
        <div className="section">
          <h4>Education:</h4>
          {Array.isArray(data.education) && data.education.length > 0 ? (
            data.education.map((edu, index) => (
              <div key={index} className="education">
                <p><strong>Degree:</strong> {edu.degree || "Degree not available"} in {edu.major || "Major not available"}</p>
                <p><strong>School:</strong> {edu.school || "School not available"}</p>
                <p><strong>Grade:</strong> {edu.grade || "Grade not available"}</p>
                <p><strong>Duration:</strong> {edu.startDate || "Start date not available"} - {edu.endDate || "End date not available"}</p>
              </div>
            ))
          ) : (
            <p>No education details available</p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="chatbot-title">Mercor Assist</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.isUser ? "user-message" : "bot-message"}`}>
            {message.isUser ? message.text : formatMessage(message.text)}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="chatbot-input" />
        <button onClick={handleSendMessage} className="chatbot-send-button">Send</button>
      </div>
    </div>
  );
}  

export default Chatbot;
