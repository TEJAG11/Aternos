const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

function createBot() {
  const bot = mineflayer.createBot({
    host: " voidmc-zx.aternos.me", // example: myserver.aternos.me
    port: 63131,
    username: "ITS_BEST",
    version: false
  });

  bot.on('spawn', () => {
    console.log("✅ Bot joined the server!");

    function walkWithDelay() {
      bot.setControlState('forward', true);   // Start walking
      setTimeout(() => {
        bot.setControlState('forward', false); // Stop walking
        setTimeout(walkWithDelay, 3000);       // Wait 3 sec then walk again
      }, 3000); // Walk for 3 sec
    }

    walkWithDelay();
  });

  bot.on('end', () => {
    console.log("❌ Bot disconnected! Reconnecting...");
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log("Error: ", err));
}

createBot();

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("🌐 Ping server active on port 3000"));
