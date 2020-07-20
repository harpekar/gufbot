//Implementations for Gufbot's functions

const fs = require('fs');
const jimp = require('jimp'); //Image manipulation 

function addNew(user, dead_db, tapScore=0, shinyScore=0, shinyTime=0) 
{
    dead_db.push({"username":user.username, "score":tapScore, "shinyScore":shinyScore, "shinyTime":shinyTime})
}

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

    //dead_db.push({"username":msg.author.username, "score":1});

    addNew(msg.author, dead_db, tapScore = 1, shinyScore = 0, shinyTime = 0) 

    msg.channel.send(`Tap is only dead to ${msg_user} once.`)

    updateScores(msg)

}


function aggronBad(msg) {
        msg.channel.send(`Don\'t make me tap the sign.`)
        msg.channel.send("", {files: ['./tapthesign.png'] });   
}

function shinyTracker(msg, dead_db) {

   msgUser = msg.author.username 

   timeStamp = msg.createdAt.getTime()

   console.log(timeStamp)

   for ( var index = 0; index < dead_db.length; index++) {

        console.log(`Is ${dead_db[index].username} the same as ${msgUser}?`)

        if (dead_db[index].username == msgUser) { 

                if (((timeStamp - dead_db[index].shinyTime )  / (1000 * 3600)) > 48) //If 48 hours have elapsed, reset the tracker
                {
                    dead_db[index].shinyScore = 1;
                    dead_db[index].shinyTime = timeStamp;
                    return;

                }        
                 
                else{           
                    
                    dead_db[index].shinyScore++;
                
                    if (dead_db[index].shinyScore >= 3)
                    {
                        msg.channel.send(`${msgUser} is a bastard and a cheater.`)
                    }

                    return;
                } 
        }
    }

    addNew(msg.author, dead_db, tapScore = 0, shinyScore = 1, shinyTime = timeStamp) 
    msg.channel.send(`${msgUser} just got their first shiny.`)   
}


function pictures(msg) {
        
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

function updateScores(msg, dead_db)
{

    const db_string = JSON.stringify(dead_db, null, 3) //Set up indentation in file

    fs.writeFile('./names.json', db_string, err => {
    
    if (err) {msg.channel.send(`Error writing file ${err}`) }
    else {}

    })
}

function killBot(msg, bot, dead_db) 
{
    updateScores(msg, dead_db)
    msg.channel.send('See you, space cowboy.').then(m => {bot.destroy();   });

}

module.exports = {tapIterate, aggronBad, shinyTracker, leaderboard, killBot }
