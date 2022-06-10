const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pauses the player"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("❌ The queue is empty!")

		queue.setPaused(true)
        await interaction.editReply("✅ Paused the player!")
	}
}