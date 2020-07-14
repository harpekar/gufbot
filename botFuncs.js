//Implementations for Gufbot's functions

const fs = require('fs');

function tapIterate(msg, dead_db) 
{

    msg_user = msg.author.username

        for (var index = 0; index < dead_db.length; index++) {

            json_obj = dead_db[index]

                //msg.channel.send(`msg sent by ${msg_user}, checking against ${json_obj.username}`)

                if (json_obj.username == msg_user) { //If the user already exists in the database

                    if (msg.content.includes("dead")) { dead_db[index].score++; }

                    else { dead_db[index].score--; }

                    msg.channel.send(`Tap is dead to ${json_obj.username} ${dead_db[index].score} times over.`)                         
                        return;
                }
        }

    dead_db.push({"username":msg.author.username, "score":1});
    msg.channel.send(`Tap is only dead to ${msg_user} once.`)

}


function aggronBad(msg) {
        msg.channel.send(`Don\'t make me tap the sign.`)
        msg.channel.send("", {files: ['./tapthesign.png'] });   
}


function leaderboard(msg, dead_db) 
{

    dead_db.sort(function(a,b) {
        return b.score-a.score        
    })

    msg.channel.send(`LEADERBOARD:`)

    for (var i = 0; i < Math.min(6,dead_db.length); i++) {

        json_obj = dead_db[i]
        msg.channel.send(`${dead_db[i].username} : ${json_obj.score}`) 

   }

}

function killBot(msg, bot, dead_db) 
{
    const db_string = JSON.stringify(dead_db, null, 3) //Set up indentation in file

    fs.writeFile('./names.json', db_string, err => {
    
    if (err) {msg.channel.send(`Error writing file ${err}`) }
    else {}

    })

    msg.channel.send('See you, space cowboy.').then(m => {bot.destroy();   });

}

module.exports = {tapIterate, aggronBad, leaderboard, killBot }
