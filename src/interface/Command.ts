import { SharedNameAndDescription, SharedSlashCommandOptions, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

export interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => Promise<void>;
}
