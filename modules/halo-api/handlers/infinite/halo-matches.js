/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { INFINITE_LIB_VERSION } = require('../../config');
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
const getPlayerInfiniteMatches = async (gamertag, index = 0) => {
	const infinite = lib.halo.infinite[INFINITE_LIB_VERSION];
	const matches = await infinite.stats.matches.list({
		gamertag,
		limit: {
			count: 25,
			offset: index,
		},
	});

	const formattedGamertag = matches.additional.gamertag;
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
				custom_id: packCustomId(CUSTOM_IDS_ACTIONS.INFINITE_MATCHES, {
					gamertag,
					index: index - 1,
				}),
				disabled: hasNext === false,
			},
			{
				...navigationButtonTemplate,
				label: 'Next Match',
				custom_id: packCustomId(CUSTOM_IDS_ACTIONS.INFINITE_MATCHES, {
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
			title: `Infinite Recent Matches for ${formattedGamertag}`,
			description: `> Latest 25 - Match ${index + 1}/${
				matches.data.length
			}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			image: {
				url: matchInfo.details.map.asset.thumbnail_url,
			},
			fields: [
				{
					name: 'Details',
					value: [
						`+ **Map:** ${matchInfo.details.map.name}`,
						`+ **Mode:** ${matchInfo.details.category.name}`,
						`+ **Playlist:** ${matchInfo.details.playlist.name}`,
						`+ **Duration:** ${matchInfo.duration.human}`,
						`+ **Outcome:** ${[
							matchInfo.player.outcome.charAt(0).toUpperCase() +
								matchInfo.player.outcome.slice(1),
							matchInfo.player.outcome === 'win'
								? ':tada:'
								: ':salt:',
						].join(' ')}`,
					].join('\n'),
					inline: false,
				},
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
						`+ **K/D Ratio:** ${(
							matchInfo.player.stats.core.kdr || 0
						).toFixed(2)}`,
						``,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Shots',
					value: [
						`+ **Fired:** ${vwc(
							matchInfo.player.stats.core.shots.fired
						)}`,
						`+ **Landed:** ${vwc(
							matchInfo.player.stats.core.shots.landed
						)}`,
						`+ **Missed:** ${vwc(
							matchInfo.player.stats.core.shots.missed
						)}`,
						`+ **Accuracy:** ${matchInfo.player.stats.core.shots.accuracy.toFixed(
							2
						)}%`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Damage',
					value: [
						`+ **Taken:** ${vwc(
							matchInfo.player.stats.core.damage.taken
						)}`,
						`+ **Dealt:** ${vwc(
							matchInfo.player.stats.core.damage.dealt
						)}`,
					].join('\n'),
					inline: true,
				},
			],
			timestamp: matchInfo.played_at,
		},
	};
};

//#endregion

module.exports = {
	getPlayerInfiniteMatches,
};
