/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../modules/lib');
const { DISCORD_LIB_VERSION } = require('/../modules/discord/config');
const discordCommands = lib.discord.commands[DISCORD_LIB_VERSION];

await Promise.all([
	// Matches
	discordCommands.create({
		name: 'halo-matches',
		description: "Retrieve player's recent matches",
		options: [
			{
				type: 3,
				name: 'game',
				description: 'Targeted game',
				choices: [
					{
						name: 'Halo Infinite',
						value: 'infinite',
					},
					{
						name: 'Halo: The Master Chief Collection',
						value: 'mcc',
					},
				],
				required: true,
			},
			{
				type: 3,
				name: 'gamertag',
				description: 'Targeted player',
				required: true,
			},
		],
	}),
	// Ranks
	discordCommands.create({
		name: 'halo-ranks',
		description: "Retrieve player's ranks",
		options: [
			{
				type: 3,
				name: 'game',
				description: 'Targeted game',
				choices: [
					{
						name: 'Halo Infinite',
						value: 'infinite',
					},
					{
						name: 'Halo: The Master Chief Collection',
						value: 'mcc',
					},
				],
				required: true,
			},
			{
				type: 3,
				name: 'gamertag',
				description: 'Targeted player',
				required: true,
			},
		],
	}),
	// Stats
	discordCommands.create({
		name: 'halo-stats',
		description: "Retrieve player's stats (Service Record)",
		options: [
			{
				type: 3,
				name: 'game',
				description: 'Targeted game',
				choices: [
					{
						name: 'Halo Infinite',
						value: 'infinite',
					},
					{
						name: 'Halo: The Master Chief Collection',
						value: 'mcc',
					},
				],
				required: true,
			},
			{
				type: 3,
				name: 'gamertag',
				description: 'Targeted player',
				required: true,
			},
		],
	}),
	// Articles
	discordCommands.create({
		name: 'halo-articles',
		description: 'Retrieve available articles from a specific game',
		options: [
			{
				type: 3,
				name: 'game',
				description: 'Targeted game',
				choices: [
					{
						name: 'Halo Infinite',
						value: 'infinite',
					},
					{
						name: 'Halo: The Master Chief Collection',
						value: 'mcc',
					},
				],
				required: true,
			},
			{
				type: 3,
				name: 'language',
				description: 'Desired languages',
				choices: [
					{
						name: 'English (en-US)',
						value: 'en-US',
					},
					{
						name: 'Deutsch (de-DE)',
						value: 'de-DE',
					},
					{
						name: 'Español (es-ES)',
						value: 'es-ES',
					},
					{
						name: 'Español (es-MX)',
						value: 'es-MX',
					},
					{
						name: 'Français (fr-FR)',
						value: 'fr-FR',
					},
					{
						name: 'Italiano (it-IT)',
						value: 'it-IT',
					},
					{
						name: 'Polski (pl-PL) ',
						value: 'pl-PL',
					},
					{
						name: 'Portuguese (pt-BR)',
						value: 'pt-BR',
					},
					{
						name: 'Русский (ru-RU)',
						value: 'ru-RU',
					},
					{
						name: '日本 (ja-JP)',
						value: ' ja-JP',
					},
					{
						name: '한국어 (ko-KR)',
						value: 'ko-KR',
					},
					{
						name: '中国人 (zh-CN)',
						value: 'zh-CN',
					},
					{
						name: '中国人 (zh-HK)',
						value: 'zh-HK',
					},
				],
			},
		],
	}),
]);