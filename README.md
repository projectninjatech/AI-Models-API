# AI Chatterbox API
This repository contains a Node.js Express API that integrates with various AI models for natural language processing and image generation. The API includes endpoints for interacting with OpenAI's GPT-3.5 Turbo, Google's Generative AI (Gemini), and OpenAI's DALL-E-3.

## Setup

**1. Clone the repository:** </br>
git clone https://github.com/yourusername/ai-chatterbox-api.git

**2. Install dependencies:**</br>
npm install

**3. Create a .env file in the root directory and add the required environment variables:**</br>
OPENAI_KEY=your_openai_api_key</br>
GEMINI_API_KEY=your_google_generative_ai_key</br>

**4. Start the server:**</br>
npm start

**The API will be accessible at http://localhost:3000.**

## Endpoints
## 1. GPT Endpoint</br>
### Request </br>
**Endpoint: `POST /gpt`**

Body:

`{
  "userMsg": "User message for GPT"
}`

### Response
The response will be the generated message from GPT-3.5 Turbo.

## 2. Gemini Endpoint</br>
### Request</br>
**Endpoint: `POST /gemini`**

Body:

`{
  "userMsg": [
    {
      "content": "User message for Gemini"
    }
  ]
}`

### Response
The response will be the generated message from Gemini (Google Generative AI).

## 3. DALL-E Endpoint</br>
### Request</br>
**Endpoint: `POST /dalle`**

Body:

`{
  "userMsg": "Prompt for DALL-E image generation"
}`

### Response
The response will contain a URL to the generated image by DALL-E-2.

### Additional Information
The API also provides a root endpoint (GET /) to check if the server is running.

### Usage
You can use this API to interact with different AI models for chat-based language processing and image generation. Customize the requests based on your requirements and integrate the responses into your applications.

Feel free to explore and experiment with the capabilities of GPT-3.5 Turbo, Gemini, and DALL-E-3 through this API.