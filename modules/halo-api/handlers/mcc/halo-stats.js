/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { MCC_LIB_VERSION } = require('../../config');
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
 **/
const getPlayerMCCStats = async gamertag => {
	const mcc = lib.halo.mcc[MCC_LIB_VERSION];
	const [serviceRecord, appearance] = await Promise.all([
		mcc.player.stats['service-record'].summary({ gamertag }),
		mcc.player.appearance({ gamertag }),
	]);

	const formattedGamertag = serviceRecord.additional.gamertag;
	const { multiplayer, campaign } = serviceRecord.data;
	const xp = multiplayer.progression.xp;

	const MPCoreStats = multiplayer.core;
	const CPCoreStats = campaign.core;

	return {
		content: '',
		tts: false,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `MCC Service Record for ${formattedGamertag}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			description: `> **Clan Tag:** ${appearance.data.clan_tag}`,
			thumbnail: { url: xp.rank.image_url },
			fields: [
				{
					name: 'XP Progression',
					value: [
						`> **${vwc(xp.total)}** / ${vwc(
							xp.total + xp.remaining
						)} XP`,
						`> **${xp.rank.title}** - Tour ${xp.rank.tour}, Tier ${xp.rank.tier}`,
					].join('\n'),
				},
				{
					name: '**Multiplayer**',
					value: [
						`+ **Kills:** ${vwc(MPCoreStats.summary.kills)}`,
						`+ **Deaths:** ${vwc(MPCoreStats.summary.deaths)}`,
						`+ **Assists:** ${vwc(MPCoreStats.summary.assists)}`,
						`+ **K/D Ratio:** ${MPCoreStats.kdr.toFixed(2)}`,
						``,
						`+ **Matches:** ${vwc(MPCoreStats.matches_played)}`,
						`+ **Win Rate:** ${MPCoreStats.win_rate.toFixed(2)}%`,
					].join('\n'),
					inline: true,
				},
				{
					name: 'Campaign',
					value: [
						`+ **Kills:** ${vwc(CPCoreStats.summary.kills)}`,
						`+ **Deaths:** ${vwc(CPCoreStats.summary.deaths)}`,
						`+ **Missions Completed:** ${vwc(
							CPCoreStats.missions_completed
						)}`,
					].join('\n'),
					inline: true,
				},
			],
		},
	};
};

//#endregion

module.exports = {
	getPlayerMCCStats,
};
