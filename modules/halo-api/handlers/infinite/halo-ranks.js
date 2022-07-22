/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { INFINITE_LIB_VERSION } = require('../../config');
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
const getPlayerInfiniteRanks = async gamertag => {
	const infinite = lib.halo.infinite[INFINITE_LIB_VERSION];
	const CSRS = await infinite.stats.players.csrs({
		gamertag,
	});

	const formattedGamertag = CSRS.additional.parameters.gamertag;
	const escapedGamertag = escapeGamertag(formattedGamertag);

	const highestCurrentCSRS = CSRS.data
		.reduce((a, b) => {
			a.push({
				queue: b.queue,
				input: b.input,
				current: b.response.current,
			});

			return a;
		}, [])
		.sort(
			(a, b) => parseFloat(b.current.value) - parseFloat(a.current.value)
		)[0];

	let queueName = 'Unknown';

	switch (highestCurrentCSRS.queue) {
		case 'open':
			queueName = 'Open (Crossplay)';
			break;
		case 'solo-duo':
			queueName = [
				'Solo/Duo',
				highestCurrentCSRS.input === 'controller'
					? '(Controller)'
					: '(MnK)',
			].join(' ');
			break;
		default:
	}

	return {
		content: '',
		tts: false,
		embed: {
			color: BOT_EMBED_COLOR,
			title: `Infinite Ranks (CSRS) for ${formattedGamertag}`,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: { url: highestCurrentCSRS.current.tier_image_url },
			fields: [
				{
					name: 'Placement (Highest)',
					value: [
						`+ **Tier:** ${
							highestCurrentCSRS.current.tier
						} ${Math.min(
							highestCurrentCSRS.current.sub_tier,
							6
						)} - ${Math.max(highestCurrentCSRS.current.value, 0)}`,
						`+ **Queue:** ${queueName}`,
					].join('\n'),
					inline: false,
				},
				{
					name: 'Find out more stats on Halo.info',
					value: `:point_right: [https://halo.info/${escapedGamertag}](https://halo.info/${escapedGamertag})`,
					inline: false,
				},
				{
					name: '#SaveHaloDotAPI',
					value: `:green_heart: [Support us](https://bit.ly/support-hda)`,
					inline: false,
				},
			],
		},
	};
};

//#endregion

module.exports = {
	getPlayerInfiniteRanks,
};
