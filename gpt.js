import readline from "readline";
import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const historyFile = "./history.txt";
if (!fs.existsSync(historyFile)) fs.writeFileSync(historyFile, "");

async function fetchWebContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('body').text().replace(/\s+/g, ' ').trim().slice(0, 4000);
  } catch (err) {
    return `Unable to fetch content: ${err.message}`;
  }
}

async function chat() {
  rl.question("🧠 You: ", async (msg) => {
    try {
      let content = msg;
      const urls = msg.match(/(https?:\/\/[^\s]+)/g);
      if (urls) {
        const web = await fetchWebContent(urls[0]);
        content = `User request: ${msg}\n\nWeb Content from ${urls[0]}:\n${web}`;
      }
      const res = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are AswadXen AI. Use provided web content if available." },
          { role: "user", content }
        ],
      });
      const reply = res.choices[0].message.content;
      console.log("🤖 GPT:", reply);
      fs.appendFileSync(historyFile, `You: ${msg}\nGPT: ${reply}\n\n`);
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
    chat();
  });
}
chat();
