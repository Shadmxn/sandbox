const { getAnswer } = require("./promptService");

async function test() {
  const question = "What is photosynthesis?"; // Sample question
  const answer = await getAnswer(question);
  console.log("Answer:", answer);
}

test();
