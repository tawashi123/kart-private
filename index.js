const { Client, Intents, Collection } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { readdirSync } = require("fs")
const { Player } = require("discord-player")

const slash_load = process.argv[2] == "slash_load"

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.slashcommands = new Collection()
client.player = new Player(client)

const TOKEN = "OTg0ODA2NjEyNzEzNzU0Njg1.GNhF4V.NqrNxwvkG6ZNZSN2DNspZhfJN3IULdIKFNLYs8"
const CLIENT_ID = "984806612713754685"

let commands = []

const slashFiles = readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (slash_load) commands.push(slashcmd.data.toJSON())
}

if (slash_load) {
    const rest = new REST({ version: "10" }).setToken(TOKEN)
    console.log("Deploying slash commands...")
    rest.put(Routes.applicationCommands(CLIENT_ID), {body: commands}).then(() => {
        console.log("Successfully deployed")
        process.exit(0)
    }).catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
} else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("This is not a valid slash command!")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}