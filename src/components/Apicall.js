import axios from "axios";

const sendMessageToApi = async (message) => {
  try {
    // Replace 'https://your-api-endpoint.com/message' with your actual API endpoint
    const response = await axios
      .post("http://15.207.230.178/chatbot/get-response/", {
        query:
          "I want to hire someone with experience in Python and Node. My budget is $12000 a month",
        chat_id: "845f0cc1-7a1d-48ae-ab46-72858cbb1738",
      })
      .then((response) => console.log(response))
      .catch((error) => console.error("Network error:", error));

    // Assuming the API returns a JSON object with a 'message' field
    console.log(response.status);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in sendMessageToApi:", error);
    throw error;
  }
};

export default sendMessageToApi;
