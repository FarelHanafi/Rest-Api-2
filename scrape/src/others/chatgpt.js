const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function ChatGpt(you_qus) {
  let baseURL = "https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/";
  try {
    const response = await fetch(baseURL + "ask", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b8a273427emshece8c366422f740p1c9758jsna540aa5fe6d1',
        'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
        "Referer": baseURL
      },
      body: JSON.stringify({
        query: you_qus
      })
    });
    
    const data = await response.text();
    return data; // Return the response data if needed
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
}


module.exports = ChatGpt