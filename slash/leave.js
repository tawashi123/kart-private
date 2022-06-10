const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("Leaves the VC and clears the queue"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("❌ I am not in a VC!")

		if (queue) {

			let RADIO = interaction.member.voice.channel

			queue.destroy()
			await interaction.editReply(`✅ Left from ${RADIO}!`)

		}
	}
}