/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { INFINITE_LIB_VERSION } = require('../../config');
const { valueWithCommas: vwc } = require('../../../utils');
const { escapeGamertag } = require('../../../utils/players');

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
const getPlayerInfiniteStats = async gamertag => {
	const infinite = lib.halo.infinite[INFINITE_LIB_VERSION];
	const [CPServiceRecord, MPServiceRecord] = await Promise.all([
		infinite.stats.players['service-record'].campaign({ gamertag }),
		infinite.stats.players['service-record'].multiplayer.matchmade.all({
			gamertag,
		}),
	]);

	const MPCoreStats = MPServiceRecord.data.core;
	const formattedGamertag = MPServiceRecord.additional.parameters.gamertag;
	const escapedGamertag = escapeGamertag(formattedGamertag);

	const totalAudioLogs = Object.keys(CPServiceRecord.data.audio_logs).reduce(
		(a, b) => a + CPServiceRecord.data.audio_logs[b],
		0
	);

	return {
		content: '',
		tts: false,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `Infinite Service Record (PVP) for ${formattedGamertag}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: {
				url: CPServiceRecord.data.difficulty
					.highest_completed_image_url,
			},
			image: {
				url: `https://halo.info/player-card/${escapedGamertag}.png`,
			},
			fields: [
				{
					name: '**Multiplayer**',
					value: [
						`+ **Kills:** ${vwc(MPCoreStats.summary.kills)}`,
						`+ **Deaths:** ${vwc(MPCoreStats.summary.deaths)}`,
						`+ **Assists:** ${vwc(MPCoreStats.summary.assists)}`,
						`+ **Medals:** ${vwc(MPCoreStats.summary.medals)}`,
						`+ **K/D Ratio:** ${MPCoreStats.kdr.toFixed(2)}`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Campaign',
					value: [
						`+ **Skulls Found:** ${vwc(
							CPServiceRecord.data.skulls
						)}`,
						`+ **FOB Secured:** ${vwc(
							CPServiceRecord.data.fob_secured
						)}`,
						`+ **Spartan Cores Found:** ${vwc(
							CPServiceRecord.data.spartan_cores
						)}`,
						`+ **Audio Logs Found:** ${vwc(totalAudioLogs)}`,
						`+ **Missions Completed:** ${vwc(
							CPServiceRecord.data.missions_completed
						)}`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Find out more stats on Halo.info',
					value: `:point_right: [https://halo.info/${escapedGamertag}](https://halo.info/${escapedGamertag})`,
					inline: false,
				},
			],
		},
	};
};

//#endregion

module.exports = {
	getPlayerInfiniteStats,
};
