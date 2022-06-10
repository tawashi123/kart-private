const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Plays a song from the given keywords")
				.addStringOption((option) =>
					option.setName("keywords").setDescription("The search keywords").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {

        const queue = await client.player.createQueue(interaction.guild)
        let embed = new MessageEmbed()
        let interaction_user = interaction.member.id

        if (!interaction.member.voice.channel) await interaction.editReply(`❌ <@${interaction_user}> You are not in a VC!`)
        

        if (interaction.member.voice.channel) {
            let RADIO = interaction.member.voice.channel

            if (!queue.connection) {
                await queue.connect(interaction.member.voice.channel)
                await interaction.editReply(`✅ Joined ${RADIO}!`)
            }


            if (interaction.options.getSubcommand() === "search") {

                let keywords = interaction.options.getString("keywords")
    
                await interaction.editReply(`🔍 Searching for **${keywords}**...`)
    
                const result = await client.player.search(keywords, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.SOUNDCLOUD_SEARCH
                })
    
                if (result.tracks.length === 0)
                    return interaction.editReply(`❌ Nothing found for **${keywords}**!`)
                
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`Added **[${song.title}](${song.url})** to the queue!`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})
            }
            if (!queue.playing) await queue.play()
            await interaction.editReply({
                embeds: [embed]
            })
        }
    }
}