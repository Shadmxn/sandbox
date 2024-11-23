import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getResponse(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices[0].message.content;
    console.log("Sandbox Prep Ai:", reply);
    return reply;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function chat() {
  let messages = [{ role: "system", content: "You are a helpful assistant." }];
  
  const askQuestion = () => {
    rl.question("You: ", async (input) => {
      messages.push({ role: "user", content: input });
      
      const reply = await getResponse(messages);
      messages.push({ role: "assistant", content: reply });

      askQuestion();
    });
  };

  askQuestion();
}

chat();
