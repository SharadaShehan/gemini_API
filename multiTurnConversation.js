const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');
require('dotenv').config();

const KEY= process.env.KEY;

const genAI = new GoogleGenerativeAI(KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
let history = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptAsync(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

// get complete response
async function run() {
    while (true) {
        const chat = model.startChat({
            history,
            generationConfig: {
            maxOutputTokens: 100,
            },
        });
        const userText = await promptAsync(`User: `);
        const result = await chat.sendMessage(userText);
        const responseText = (await result.response).text();
        console.log(`Bot: ${responseText}`);
        history.push(
            {
                role: "user",
                parts: userText
            }
        )
        history.push(
            {
                role: "model",
                parts: responseText
            }
        )
    }
}

// // get response in chunks
// async function run() {
//     while (true) {
//         const chat = model.startChat({
//             history,
//             generationConfig: {
//             maxOutputTokens: 100,
//             },
//         });
//         const userText = await promptAsync(`User: `);
//         const result = await model.generateContentStream(userText);
//         let responseText = '';
//         console.log("Bot: ")
//         for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             console.log(chunkText);
//             responseText += chunkText;
//         }
//         history.push(
//             {
//                 role: "user",
//                 parts: userText
//             }
//         )
//         history.push(
//             {
//                 role: "model",
//                 parts: responseText
//             }
//         )
//     }
// }

run();
