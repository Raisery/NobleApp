import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import NobleCommand from '../../types/NobleCommand'
const url = process.env.DASHBOARD_URL

const dashboard = {
	data: new SlashCommandBuilder()
		.setName('dashboard')
		.setDescription('Affiche le lien du dashboard'),
	execute: async (interaction: ChatInputCommandInteraction) => {
		if (!interaction.client.user || !interaction.client.readyTimestamp) return
		const embed = new EmbedBuilder()
			.setTitle('🛠️ Dashboard 🛠️')
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.addFields({
				name: 'NobleApp',
				value: url ?? '',
				inline: false,
			})
			.setTimestamp()
			.setFooter({
				text: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			})
		await interaction.reply({ embeds: [embed], fetchReply: true })
	},
} as NobleCommand

export default dashboard
