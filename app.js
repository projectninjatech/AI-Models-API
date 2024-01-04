require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const OpenAI = require('openai')
const bodyParser = require('body-parser');
const port = 3000


app.use(cors());
app.use(bodyParser.json());


const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(userMsg) {

    const completion = await openai.chat.completions.create({
        messages: userMsg,
        model: "gpt-3.5-turbo",
    });


    console.log(completion.choices[0].message);
    let data = completion.choices[0].message;
    return data
}

app.post('/gpt', async (req, res) => {
    const userMsg = req.body.userMsg;
    console.log("GPT User:", userMsg);
    let result = await main(userMsg);
    console.log("GPT Response:")
    res.json(result)
})

let conversationHistory = []
async function run(userMsg) {

    let response = ""
    conversationHistory.push({
        role: "user",
        parts: userMsg,
    })

    conversationHistory.push({
        role: "model",
        parts: response,
    })


    console.log("Conversation History", conversationHistory)



    const model = genAI.getGenerativeModel({ model: "gemini-pro" });


    const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    const result = await chat.sendMessage(userMsg);
    response = await result.response;
    const text = response.text();
    conversationHistory[conversationHistory.length - 1].parts = text;
    // console.log("===========================================================");
    // console.log("Conversation History", conversationHistory);
    // console.log("===========================================================");
    return text
}

app.post('/gemini', async (req, res) => {
    const userMsg = req.body.userMsg;
    console.log("Gemini User:", userMsg);
    let result = await run(userMsg[userMsg.length - 1].content);

    console.log("Gemini Response", {
        role: "model",
        parts: result,
    })
    res.json({
        role: "model",
        content: result,
    })
})

app.get("/", (req, res) => {
    res.json("AI Chatterbox API is running")
})



async function dalleImageGeneration(userMsg) {
    const image = await openai.images.generate({ model: "dall-e-2", prompt: userMsg, });
    console.log("Image Data", image.data);
    return image.data[0].url
}

app.post('/dalle', async (req, res) => {
    const userMsg = req.body.userMsg;
    console.log("User Message", userMsg)
    try {
        const response = await dalleImageGeneration(userMsg)
        console.log("Response", response);

        res.json({
            role: "model",
            content: response,
        })
    } catch (error) {
        console.log("Error ", error)
    }


})

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})