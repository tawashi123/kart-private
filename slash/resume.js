const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the player"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("❌ The queue is empty!")

		queue.setPaused(false)
        await interaction.editReply("✅ Resumed the player!")
	}
}