require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

var tap_dead = 0;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

    if (msg.author.bot) return;

    else if (msg.content === 'where is tap?') {
    msg.channel.send('dead to me');
    }

    else if (msg.content.includes("tap" && "dead")) {
    tap_dead++;

    msg.channel.send(`Tap is dead to me ${tap_dead} times over.`)     
    }  


});
