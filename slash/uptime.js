const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Displays the uptime of the bot"),
    run: async ({ client, interaction }) => {
        interaction.editReply(`⌛ The uptime is ${client.uptime}ms!`)
    }
}