const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Joins your VC"),
    run: async ({ client, interaction }) => {

		const queue = await client.player.createQueue(interaction.guild)
        let interaction_user = interaction.member.id

        if (queue.connection) await interaction.editReply(`❌ <@${interaction_user}> I already am in a VC!`)

        if (!interaction.member.voice.channel) await interaction.editReply(`❌ <@${interaction_user}> You are not in a VC!`)

        if (interaction.member.voice.channel) {
            if (!queue.connection) {
                
                let RADIO = interaction.member.voice.channel
    
                await queue.connect(interaction.member.voice.channel)
                await interaction.editReply(`✅ Joined ${RADIO}!`)
            }
        }
    }
}