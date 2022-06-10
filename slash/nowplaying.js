const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Displays information about the current playing song"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("❌ The queue is empty!")

		let bar = queue.createProgressBar({ queue: false, length: 19 })

        const song = queue.current

		await interaction.editReply({
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
        ]
		})
	}
}