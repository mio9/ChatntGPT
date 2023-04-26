import { SlashCommandBuilder } from "discord.js";
import { Command } from "interface/Command";
import axios from "axios";
import * as dotenv from "dotenv";
import _ from "lodash";

export const commandMap: Map<string, Command> = new Map();

commandMap.set("ask", {
	data: new SlashCommandBuilder()
		.addStringOption((option) =>
			option.setName("prompt").setDescription("Your prompt").setRequired(true),
		)
		.setName("ask")
		.setDescription("Ask the bot something"),

	async execute(interaction) {
		// await interaction.reply(interaction.options.get("prompt").value.toString());
		const inputPrompt = interaction.options.get("prompt");
		if (inputPrompt == null) {
			interaction.reply("You sent empty");
			return;
		}
		await interaction.deferReply();
		const date = new Date();
		const fullPrompt = `${inputPrompt.value.toString()}. Give hilarious funny answers only, also make sure the answers are utterly useless and as unrelated as possible. Random but unique precise answers in absurd english, don't mention the question again.`;
		try {
			const response = await axios({
				url: dotenv.config().parsed.CHAT_ENDPOINT,
				method: "POST",
				data: { prompt: fullPrompt },
			});

			const replyMsg = `> **${
				interaction.user.tag
			}** - *"${inputPrompt.value.toString()}"*
		${_.trimStart(response.data, "\ns")}
		`;
			interaction.editReply(replyMsg);
		} catch (error) {
			interaction.editReply(error.message);
		}
	},
});
