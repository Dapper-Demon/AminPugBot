const Discord = require('discord.js');
const client = new Discord.Client();

const data = require('./data.json');
const roleManager = require("./roleManager");
const mapVoting = require("./mapVoting");

// Used to track map votes, if votes are live, and who has voted so far
var mapVotingObj = {
    "Product" : 0,
    "Ashville" : 0,
    "Lakeside" : 0,
    "Upward" : 0,
    "live" : false,
    "set" : new Set()
};

client.on('ready', async () => {
    console.log("Amin lives...");
});

client.on('message', async (msg) => {
    var cont = msg.content.toLowerCase();
    if (msg.author.id == data.botID) {
        return;
    }

    // No Racism!
    if (cont.includes("nigger") || cont.includes("nigga")) {
        msg.delete();
    }

    // Starting and ending voting for maps
    if (msg.channel.id == data.mapVotingChannel && cont.startsWith("!start") && msg.member.hasPermission("MUTE_MEMBERS") && !mapVotingObj.live) {
        mapVoting.startVote(msg, mapVotingObj);
    } else if (msg.channel.id == data.mapVotingChannel && cont.startsWith("!end") && msg.member.hasPermission("MUTE_MEMBERS") && mapVotingObj.live) {
        mapVoting.endVote(msg, mapVotingObj);
    }

    // Tally all of the map votes and make sure that each person only votes once
    if (msg.channel.id == data.mapVotingChannel && mapVotingObj.live && !mapVotingObj.set.has(msg.author.id)) {
        switch(parseInt(cont)){
            case 1:
                mapVotingObj.Product += 1;
                mapVotingObj.set.add(msg.author.id);
                break;
            case 2:
                mapVotingObj.Ashville += 1;
                mapVotingObj.set.add(msg.author.id);
                break;
            case 3:
                mapVotingObj.Lakeside += 1;
                mapVotingObj.set.add(msg.author.id);
                break;
            case 4:
                mapVotingObj.Upward += 1;
                mapVotingObj.set.add(msg.author.id);
        }
    }
});

// client.on('messageReactionAdd', (reaction, user) => {
    
// });

// client.on("messageReactionRemove", (reaction, user) => {    

// });

// client.on('messageUpdate', (oldMessage, newMessage) => {
   
// });

// client.on('messageDelete', message => {
    
// });

// client.on('guildMemberAdd', member => {
    
// });

client.on('voiceStateUpdate', async (oldState, newState) => {
    // Check for disconnecting from the discord all together
    if (!newState.channel) {
        roleManager.removeRole(oldState.member.id, data.pickedRole, oldState.member.guild);
        roleManager.removeRole(oldState.member.id, data.addedRole, oldState.member.guild);
        return;
    }

    // Picked role handler
    if (newState.channel.id == data.redVC || newState.channel.id == data.blueVC) {
        roleManager.giveRole(newState.member.id, data.pickedRole, newState.member.guild);
        roleManager.removeRole(oldState.member.id, data.addedRole, oldState.member.guild);
    } else if (oldState.channel) {
        if (oldState.channel.id == data.redVC || oldState.channel.id == data.blueVC) {
            roleManager.removeRole(oldState.member.id, data.pickedRole, oldState.member.guild);
        }
    }

    // Added role handler
    if (newState.channel.id == data.pickingVC || newState.channel.id == data.addedVC || newState.channel.id == data.captainsPickingVC) {
        roleManager.giveRole(newState.member.id, data.addedRole, newState.member.guild);
    } else if (oldState.channel) {
        if (oldState.channel.id == data.pickingVC || oldState.channel.id == data.addedVC || oldState.channel.id == data.captainsPickingVC) {
            roleManager.removeRole(oldState.member.id, data.addedRole, oldState.member.guild);
        }
    }
});

client.login(require('./token.json').token);

process.on('SIGINT', () => {
    console.log("Logging off...");
    process.exit();
});