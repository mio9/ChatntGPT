import { SlashCommandBuilder } from "discord.js";
import { Command } from "interface/Command";

export const commandMap: Map<string, Command> = new Map();

commandMap.set('ask', {
  data: new SlashCommandBuilder().setName('ask').setDescription('Ask the bot something'),
  async run(interaction) {
      await interaction.reply('Test working')
  },
})