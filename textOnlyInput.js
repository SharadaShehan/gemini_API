const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const KEY= process.env.KEY;

const genAI = new GoogleGenerativeAI(KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
  const prompt = "Once upon a time";
  
  // get complete response
  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);

  // get response in chunks
  const result = await model.generateContentStream(prompt);
  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
}

run();
