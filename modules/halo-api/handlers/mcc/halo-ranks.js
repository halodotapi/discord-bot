/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { MCC_LIB_VERSION } = require('../../config');
const { MCC_RANKS } = require('../../../discord/emojis');

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
const getPlayerMCCRanks = async gamertag => {
	const mcc = lib.halo.mcc[MCC_LIB_VERSION];
	const serviceRecord = await mcc.player.stats['service-record'].summary({
		gamertag,
	});

	const formattedGamertag = serviceRecord.additional.parameters.gamertag;
	const { multiplayer } = serviceRecord.data;
	const MPSkillRanks = multiplayer.progression.ranks;

	const highestRank = MPSkillRanks.reduce((a, b) => {
		a.push(...b.playlists);
		return a;
	}, []).sort((a, b) => parseFloat(b.rank) - parseFloat(a.rank))[0];

	return {
		content: '',
		tts: false,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `MCC Skill Ranks for ${formattedGamertag}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: { url: highestRank.image_url },
			fields: MPSkillRanks.reverse().map(sR => ({
				name: sR.platform,
				value: sR.playlists
					.map(playlist => {
						const emojiId = `r${playlist.rank}`;
						const emoji = MCC_RANKS[emojiId];
						// Using "en space" to increase space between emoji and text
						const text = [emoji, playlist.name].join(' ');
						return text;
					})
					.join('\n'),
				inline: true,
			})),
		},
	};
};

//#endregion

module.exports = {
	getPlayerMCCRanks,
};
