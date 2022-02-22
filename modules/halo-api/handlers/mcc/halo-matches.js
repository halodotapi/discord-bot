/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { MCC_LIB_VERSION } = require('../../config');

const {
	BOT_EMBED_COLOR,
	BOT_EMBED_AUTHOR_NAME,
	BOT_EMBED_AUTHOR_URL,
	BOT_EMBED_ICON_URL,
} = require('../../../discord/config');

//#region public methods

/**
 * @param {string} gamertag
 **/
const getPlayerMCCMatches = async gamertag => {
	const mcc = lib.halo.mcc[MCC_LIB_VERSION];
	const matches = await mcc.player.stats.matches.list({
		gamertag,
		page: 1,
	});

	const formattedGamertag = matches.additional.gamertag;
	const matchInfo = matches.data[0];

	return {
		content: '',
		tts: false,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `MCC Recent Matches for ${formattedGamertag}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: {
				url:
					matchInfo.details.category.id === null
						? void 0
						: matchInfo.details.category.image_url,
			},
			fields: [
				{
					name: 'Match Summary',
					value: [
						`+ **Kills:** ${matchInfo.player.stats.core.summary.kills}`,
						`+ **Deaths:** ${matchInfo.player.stats.core.summary.deaths}`,
						`+ **Assists:** ${matchInfo.player.stats.core.summary.assists}`,
						`+ **Medals:** ${matchInfo.player.stats.core.summary.medals}`,
						`+ **Headshots:** ${matchInfo.player.stats.core.breakdowns.kills.headshots}`,
						`+ **K/D Ratio:** ${(
							matchInfo.player.stats.core.kdr || 0
						).toFixed(2)}`,
						``,
						`+ **Points:** ${matchInfo.player.stats.points}`,
						`+ **Outcome:** ${
							matchInfo.player.stats.outcome === 'unknown'
								? 'Unknown'
								: matchInfo.player.stats.outcome
										.charAt(0)
										.toUpperCase() +
								  matchInfo.player.stats.outcome.slice(1)
						}`,
						`+ **Duration:** ${matchInfo.duration.human}`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Details',
					value: [
						`+ **Mode:** ${
							matchInfo.details.category.name || 'Unknown'
						}`,
						`+ **Map:** ${matchInfo.details.map.name || 'Unknown'}`,
					].join('\n'),
					inline: true,
				},
			],
			timestamp: matchInfo.played_at,
			footer: {
				text: matchInfo.details.game.name || 'Unknown',
				icon_url: matchInfo.details.game.image_url,
			},
		},
	};
};

//#endregion

module.exports = {
	getPlayerMCCMatches,
};
