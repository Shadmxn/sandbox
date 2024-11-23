require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI with the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to generate a prompt and get an answer from OpenAI
async function getAnswer(question) {
  const prompt = `
    Answer each question in a clear, friendly, and simple way suitable for high school students. Start with a definition and provide an example if possible.

    Q: What is photosynthesis?
    A: Photosynthesis is the process by which plants convert sunlight into energy, which helps them grow. For example, green leaves capture sunlight using chlorophyll.

    Q: What is gravity?
    A: Gravity is the force that pulls objects toward each other. For instance, gravity is why things fall to the ground when dropped.

    Q: ${question}
    A:`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    // Extract and return the answer from the API response
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching answer:", error);
    return "Sorry, I couldn't process that question.";
  }
}

// Export the function for use in other files
module.exports = { getAnswer };
