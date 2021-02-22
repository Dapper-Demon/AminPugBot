const data = require("./data.json")

module.exports= {
    async giveRole(userId, roleID, guild) {
        var role = await guild.roles.fetch(roleID);
        var user = await guild.members.fetch(userId);
        user.roles.add(role);
    },

    async removeRole(userId, roleID, guild) {
        var role = await guild.roles.fetch(roleID);
        var user = await guild.members.fetch(userId);
        user.roles.remove(role);
    },

    // I never got the bot to recognize reactions to messages made before the bot started
    // up so I just gave up on this shit
    addReactionForRole(reaction, user) {
        if (reaction.emoji.id == data.amEmote) {
            self.giveRole(user.id, data.amRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.ncEmote) {
            self.giveRole(user.id, data.ncRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.imEmote) {
            self.giveRole(user.id, data.imRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.mainEmote) {
            self.giveRole(user.id, data.mainRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.advEmote) {
            self.giveRole(user.id, data.advRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.invEmote) {
            self.giveRole(user.id, data.invRole, reaction.message.guild.id);
        } 
    },

    removeReactionForRole(reaction, user) {
        if (reaction.emoji.id == data.amEmote) {
            self.removeRole(user.id, data.amRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.ncEmote) {
            self.removeRole(user.id, data.ncRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.imEmote) {
            self.removeRole(user.id, data.imRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.mainEmote) {
            self.removeRole(user.id, data.mainRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.advEmote) {
            self.removeRole(user.id, data.advRole, reaction.message.guild.id);
        } else if (reaction.emoji.id == data.invEmote) {
            self.removeRole(user.id, data.invRole, reaction.message.guild.id);
        } 
    }
}