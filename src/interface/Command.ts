import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

export interface Command {
	data: SlashCommandBuilder | SlashCommandSubcommandBuilder;
	run: (interaction: CommandInteraction) => Promise<void>;
}
