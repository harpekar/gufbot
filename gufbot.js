require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs'); // For file manipulation

const botFuncs = require('./botFuncs.js')

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

let rawdata = fs.readFileSync('names.json');
let dead_db = JSON.parse(rawdata);


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

//conditions[0] is the parameter to be met in each messsage for the effect in conditions[1] to happen
conditions = [
    [m => m.content == 'where is tap?', m => m.channel.send('dead to me')],
    [m => (m.content.includes('tap') && 
            (m.content.includes('dead') || m.content.includes('alive'))), 
            m => botFuncs.tapIterate(m, dead_db) ],
    [m => m.content.includes('aggron') && m.content.includes('raid'), 
            m => botFuncs.aggronBad(m)],
    [m => m.channel == '<#729070432270942342>' && m.attachments.size > 0, 
            m => botFuncs.shinyTracker(m, dead_db)], 
    [m => m.content == '/leaderboard', m => botFuncs.leaderboard(m, dead_db)],
    [m => m.content == '!killbot', m => botFuncs.killBot(m, bot, dead_db)],
    [m => true, m => null]
]


bot.on('message', msg => {

    if (msg.author.bot) return;

    console.log(`channel is  ${msg.channel}`)

    action = conditions.find(cond => cond[0](msg))[1]
    action(msg)

});
