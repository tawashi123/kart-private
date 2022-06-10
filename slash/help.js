const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display every available command"),
    run: async({ interaction }) => {
            
        await interaction.editReply({ embeds: [
            new MessageEmbed()
                .setTitle("Voilà!")
                .setDescription("**🎶 Music\n`/play`: Plays a song from SoundCloud\n`/pause`: Pauses the player\n`/resume`: Resumes the player\n`/join`: Joins your VC\n`/leave`: Leaves and destroys the player\n`/queue`: Displays the queue\n`/nowplaying`: Display info about the current playing song\n`/shuffle`: Shuffles the queue\n`/skip`: Skips the current playing song\n`/stop`: Stops the player\n`/skipto`: Skips to a certain track\n:information_source: Information\n`/credits`: Displays the credits of Kart (Music)\n`/help`: Displays this message\n`/ping`: Displays the API ping of the bot\n`/uptime`: Displays the uptime of the bot (ms)\n**")
                .setColor("#00ff1f")
        ] })
    }
}