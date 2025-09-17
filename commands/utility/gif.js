const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('gif')
	    .setDescription('Search the gif')
        .addStringOption(option => option.setName('query').setDescription('type the query').setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const options = interaction.options;
            const query = options.getString('query');
            const key = 'AIzaSyBZEVYB8DCvyWTwNrhM2uJXpfpYXf6xCF8';
            const clientkey = 'Giffy';
            const lmt = 10;
            let choice = Math.floor(Math.random() * lmt);

            const url = `https://tenor.googleapis.com/v2/search?q=anime+${query}&key=${key}&client_key=${clientkey}&limit=${lmt}`;
            const response = await fetch(url);
            const output = await response.json();

            await interaction.editReply({
                content: output.results[choice].url
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'Failed to fetch GIF 😢' });
        }
    },
};