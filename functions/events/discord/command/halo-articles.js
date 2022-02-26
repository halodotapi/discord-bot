/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../../modules/lib');
const { DISCORD_LIB_VERSION } = require('../../../../modules/discord/config');
const { normalizeGamertag } = require('../../../../modules/utils/players');

const {
	getValueFromDiscordOptionsPayloadByName,
} = require('../../../../modules/utils/discord');

const {
	getInfiniteArticles,
} = require('../../../../modules/halo-api/handlers/infinite/halo-articles');

const {
	getMCCArticles,
} = require('../../../../modules/halo-api/handlers/mcc/halo-articles');

//#region handler

module.exports = async (
	/**
	 * @see https://docs.autocode.com/building-endpoints/the-context-object/
	 */
	context
) => {
	const discordChannels = lib.discord.channels[DISCORD_LIB_VERSION];
	const { options } = context.params.event.data;

	// Options
	const game = getValueFromDiscordOptionsPayloadByName(options, 'game');
	const language = getValueFromDiscordOptionsPayloadByName(
		options,
		'language',
		'en-US'
	);

	// Halo Infinite
	if (game === 'infinite') {
		const response = discordChannels.messages.create({
			channel_id: `${context.params.event.channel_id}`,
			...(await getInfiniteArticles(language)),
		});

		return response;
	}

	// Halo: The Master Chief Collection
	if (game === 'mcc') {
		const response = discordChannels.messages.create({
			channel_id: `${context.params.event.channel_id}`,
			...(await getMCCArticles(language)),
		});

		return response;
	}

	// Default / Error
	throw new Error('Unknown "game" specified');
};

//#endregion
