import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { commandMap } from "./commands";
import * as dotenv from "dotenv";
const env = dotenv.config().parsed;
const TOKEN = env.TOKEN;
const CLIENT_ID = env.CLIENT_ID;
const GUILD_ID = env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (client) => {
	console.log(`yep client is up, i am ${client.user.tag}`);
});

client.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isCommand()) return;
	try {
		commandMap.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error)
		interaction.reply('Command failed to run, maybe try again 😅')
	}
	console.log(`${interaction.user.tag} ran ${interaction.commandName}`);
});

client.login(TOKEN);

const rest = new REST().setToken(TOKEN);

// register commands
(async () => {
	try {
		console.log(
			`Started refreshing ${commandMap.size} application (/) commands.`,
		);

		// prepare commands JSON body
		const commands = [];
		commandMap.forEach((value, key) => {
			commands.push(value.data.toJSON());
		});

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log("Successfully reloaded application (/) commands.");
		// console.log(data);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
