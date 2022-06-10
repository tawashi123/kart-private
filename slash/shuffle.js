const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the queue"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("❌ The queue is empty!")

		queue.shuffle()
        await interaction.editReply(`✅ Shuffled the queue containing ${queue.tracks.length} songs!`)
	}
}