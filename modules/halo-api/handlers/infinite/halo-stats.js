/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { INFINITE_LIB_VERSION } = require('../../config');
const { valueWithCommas: vwc, escapeGamertag } = require('../../../utils');

const {
	BOT_EMBED_COLOR,
	BOT_EMBED_AUTHOR_NAME,
	BOT_EMBED_AUTHOR_URL,
	BOT_EMBED_ICON_URL,
} = require('../../../discord/config');

//#region definitions

/**
 * @constant
 * @type {string}
 */
const MP_SR_FILTER = 'matchmade:pvp';

//#enregion
//#region public methods

/**
 * @param {string} gamertag
 **/
const getPlayerInfiniteStats = async gamertag => {
	const infinite = lib.halo.infinite[INFINITE_LIB_VERSION];
	const [CPServiceRecord, MPServiceRecord] = await Promise.all([
		infinite.stats['service-record'].campaign({ gamertag }),
		infinite.stats['service-record'].multiplayer({
			gamertag,
			filter: MP_SR_FILTER,
		}),
	]);

	const MPCoreStats = MPServiceRecord.data.core;
	const formattedGamertag = MPServiceRecord.additional.gamertag;
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
			title: `Halo Infinite Service Record for ${formattedGamertag}`,
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
						`+ **K/D Ratio:** ${MPCoreStats.kdr.toFixed(2)}`,
						``,
						`+ **Matches:** ${vwc(
							MPServiceRecord.data.matches_played
						)}`,
						`+ **Win Rate:** ${MPServiceRecord.data.win_rate.toFixed(
							2
						)}%`,
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
						``,
						`+ **Missions Completed:** ${vwc(
							CPServiceRecord.data.mission_completed
						)}`,
						`+ **LASO Completed:** ${
							CPServiceRecord.data.difficulty.laso_completed
								? 'Yes'
								: 'No'
						}`,
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
