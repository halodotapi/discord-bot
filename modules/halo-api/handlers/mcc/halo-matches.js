/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { MCC_LIB_VERSION } = require('../../config');
const { packCustomId, CUSTOM_IDS_ACTIONS } = require('../../../utils/discord');
const { valueWithCommas: vwc } = require('../../../utils');

const {
	BOT_EMBED_COLOR,
	BOT_EMBED_AUTHOR_NAME,
	BOT_EMBED_AUTHOR_URL,
	BOT_EMBED_ICON_URL,
} = require('../../../discord/config');

//#region public methods

/**
 * @param {string} gamertag
 * @param {number} [index=0]
 **/
const getPlayerMCCMatches = async (gamertag, index = 0) => {
	const mcc = lib.halo.mcc[MCC_LIB_VERSION];
	const matches = await mcc.player.stats.matches.list({
		gamertag,
		page: 1,
	});

	const formattedGamertag = matches.additional.parameters.gamertag;
	const matchInfo = matches.data[index];

	const hasPrevious = matches.data[index + 1] !== void 0;
	const hasNext = matches.data[index - 1] !== void 0;

	// Navigation Buttons
	const components = [];
	const navigationButtonTemplate = {
		style: 1,
		label: '',
		custom_id: '',
		disabled: true,
		type: 2,
	};

	components.push({
		type: 1,
		components: [
			{
				...navigationButtonTemplate,
				label: 'Previous Match',
				custom_id: packCustomId(CUSTOM_IDS_ACTIONS.MCC_MATCHES, {
					gamertag,
					index: index - 1,
				}),
				disabled: hasNext === false,
			},
			{
				...navigationButtonTemplate,
				label: 'Next Match',
				custom_id: packCustomId(CUSTOM_IDS_ACTIONS.MCC_MATCHES, {
					gamertag,
					index: index + 1,
				}),
				disabled: hasPrevious === false,
			},
		],
	});

	return {
		content: '',
		tts: false,
		components,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `MCC Recent Matches for ${formattedGamertag}`,
			description: `> Latest 25 - Match ${index + 1}/${
				matches.data.length
			}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: {
				url:
					matchInfo.details.category.id === null
						? 'https://assets.halo.autocode.gg/static/mcc/images/multiplayer/gametypes/unknown.png'
						: matchInfo.details.category.image_url,
			},
			fields: [
				{
					name: 'Summary',
					value: [
						`+ **Kills:** ${vwc(
							matchInfo.player.stats.core.summary.kills
						)}`,
						`+ **Deaths:** ${vwc(
							matchInfo.player.stats.core.summary.deaths
						)}`,
						`+ **Assists:** ${vwc(
							matchInfo.player.stats.core.summary.assists
						)}`,
						`+ **Medals:** ${vwc(
							matchInfo.player.stats.core.summary.medals
						)}`,
						`+ **Headshots:** ${vwc(
							matchInfo.player.stats.core.breakdowns.kills
								.headshots
						)}`,
						`+ **Points:** ${vwc(matchInfo.player.stats.points)}`,
						`+ **K/D Ratio:** ${(
							matchInfo.player.stats.core.kdr || 0
						).toFixed(2)}`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Details',
					value: [
						`+ **Map:** ${matchInfo.details.map.name || 'Unknown'}`,
						`+ **Mode:** ${
							matchInfo.details.category.id === null
								? 'Unknown'
								: matchInfo.details.category.name
						}`,
						`+ **Duration:** ${matchInfo.duration.human}`,
						`+ **Outcome:** ${
							matchInfo.player.stats.outcome === 'unknown'
								? 'Unknown'
								: [
										matchInfo.player.stats.outcome
											.charAt(0)
											.toUpperCase() +
											matchInfo.player.stats.outcome.slice(
												1
											),
										matchInfo.player.stats.outcome === 'win'
											? ':tada:'
											: ':salt:',
								  ].join(' ')
						}`,
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
