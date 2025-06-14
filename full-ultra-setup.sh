#!/bin/bash

# ✅ FULL GPT ULTRA SETUP (WEB + CLI + GPT)
echo "🚀 Setting up GPT Ultra..."

# Buat folder
mkdir -p ~/aswadxen-ai/gpt-ultra && cd ~/aswadxen-ai/gpt-ultra

# Simpan fail GPT utama
cat > gpt.js <<EOGPT
const readline = require("readline");
const { ChatGPTAPI } = require("chatgpt");
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("🤖 GPT Ultra ready. Taip soalan:");
rl.on("line", async (input) => {
  const res = await api.sendMessage(input);
  console.log("✍️:", res.text);
});
EOGPT

# Install modul
npm init -y
npm install chatgpt

# Simpan script start
echo "cd ~/aswadxen-ai/gpt-ultra && node gpt.js" > ~/aswadxen-ai/gpt-ultra/start-ultra.sh
chmod +x ~/aswadxen-ai/gpt-ultra/start-ultra.sh

# Siap
echo "✅ GPT Ultra siap! Run dengan: bash ~/aswadxen-ai/gpt-ultra/start-ultra.sh"
