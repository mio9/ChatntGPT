import { SlashCommandBuilder } from "discord.js";
import { Command } from "interface/Command";
import axios from "axios";
import * as dotenv from "dotenv";

export const commandMap: Map<string, Command> = new Map();

commandMap.set("ask", {
	data: new SlashCommandBuilder()
		.addStringOption((option) =>
			option.setName("prompt").setDescription("Your prompt"),
		)
		.setName("ask")
		.setDescription("Ask the bot something"),

	async execute(interaction) {
		// await interaction.reply(interaction.options.get("prompt").value.toString());
		interaction.deferReply();
		const response = await axios({
			url: dotenv.config().parsed.CHAT_ENDPOINT,
			method: "POST",
			data: { prompt: interaction.options.get("prompt").value.toString() },
		});
		interaction.editReply(response.data);
	},
});
