const config = require('dotenv').config().parsed
const ngrok = require('ngrok');
const TelegramBot = require('node-telegram-bot-api');
// just read that nodemon kolhoz
// https://philna.sh/blog/2021/03/15/restart-app-not-tunnel-ngrok-nodemon/

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true });


async function main() {
    const url = await ngrok.connect({
        authtoken: config.NGROK_TOKEN,
        proto: 'tcp', addr: 22
    });
    console.log("\nNGROK: ", url);

    bot.onText(/\/ip (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
        const chatId = msg.chat.id;
        const pass = match[1]; // the captured "whatever"
        // console.log("pass", pass);
    
        if (config.PASSWORD === pass) {
            const fullIp = url.split("//")[1];
            const [ip, port] = fullIp.split(":");
            const message = `ssh -o IdentitiesOnly=yes XXX@${ip} -p ${port}`;
            bot.sendMessage(chatId, message);
        } else {
            bot.sendMessage(chatId, "bad pass");
        }
    });
}

main();
