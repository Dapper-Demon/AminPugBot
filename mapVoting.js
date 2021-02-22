const ds = require("discord.js");
const data = require("./data.json");

module.exports = {
    async startVote(msg, mapVotingObj) {
        // Put together the message inside of the embed
        const maps = "1) Product\n2) Ashville\n3) Lakeside\n4) Upward\n\nVote by typing the number of the map that you would like to vote for";
        mapVotingObj.live = true;

        // Make the embed
        const embed = new ds.MessageEmbed()
        .setColor(0x3030ff)
        .addField("Maps:", maps);

        // Clear the chat.
        msg.channel.bulkDelete(50)
        .catch(console.error);

        // Send the embed with a mention to the picked role
        msg.channel.send(`<@&${data.pickedRole}>`, embed);
    },

    endVote(msg, mapVotingObj) {
        // Put together the message inside of the embed with the total votes for each map
        const maps = `1) Product: ${mapVotingObj.Product}\n2) Ashville: ${mapVotingObj.Ashville}\n3) Lakeside: ${mapVotingObj.Lakeside}\n4) Upward: ${mapVotingObj.Upward}`;
        
        // Find the winner
        var winnerVal = 0;
        var winnerKey = "Product";
        for (const [key, value] of Object.entries(mapVotingObj)) {
            if (key == "live" || key == "live") {
                continue;
            } else if (value > winnerVal) {
                winnerVal = value;
                winnerKey = key;
            }
        }

        // Make the embed
        const embed = new ds.MessageEmbed()
        .setColor(0x3030ff)
        .addField("Results:", maps)
        .addField("Winner:", `${winnerKey}: ${winnerVal}`);

        // Reset all of the fields in mapVotingObj
        mapVotingObj.Product = 0;
        mapVotingObj.Ashville = 0;
        mapVotingObj.Lakeside = 0;
        mapVotingObj.Upward = 0;
        mapVotingObj.live = false;
        mapVotingObj.set = new Set();

        // Clear the chat.
        msg.channel.bulkDelete(50)
        .catch(console.error)

        // Send the embed
        msg.channel.send(embed);
    }
}