const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("credits")
        .setDescription("Displays the credits of the bot"),
    run: async ({ interaction }) => {


        interaction.editReply({
            embeds: [new MessageEmbed()
                .setTitle("Kart Credits")
                .setDescription("**Categories**\n:notes: **Music**: tawashi#3982\n:information_source: **Information**: tawashi#3982\n\n**Used packages:\ndiscord.js discord-api-types @discordjs/builders @discordjs/rest\navconv discord-player @discordjs/voice @discordjs/opus**")
            ]
        })
    }
}