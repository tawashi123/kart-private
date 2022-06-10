const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Displays the API ping of the bot"),
    run: async ({ client, interaction }) => {
        interaction.editReply(`🏓 Pong! API Ping: ${client.ws.ping}ms!`)
    }
}