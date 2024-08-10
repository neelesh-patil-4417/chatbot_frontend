import axios from "axios";

const sendMessageToApi = async (message) => {
  try {
    const response = await axios
      .post("http://127.0.0.1:8000/chatbot/get-response/", {
        query:message,
        chat_id: "4165ec72-9053-487d-acf4-5b325f5f5226",
      })
      .then((response) => response.data.message)
      .catch((error) => console.error("Network error:", error));

    // Assuming the API returns a JSON object with a 'message' field
    return response
    
  } catch (error) {
    console.error("Error in sendMessageToApi:", error);
    throw error;
  }
};

export default sendMessageToApi;
