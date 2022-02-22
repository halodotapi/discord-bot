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
	getPlayerMCCRanks,
} = require('../../../../modules/halo-api/handlers/mcc/halo-ranks');

const {
	getPlayerInfiniteRanks,
} = require('../../../../modules/halo-api/handlers/infinite/halo-ranks');

//#region handler

module.exports = async (
	/**
	 * @see https://docs.autocode.com/building-endpoints/the-context-object/
	 */
	context
) => {
	const discord = lib.discord.channels[DISCORD_LIB_VERSION];
	const { options } = context.params.event.data;

	// Options
	const game = getValueFromDiscordOptionsPayloadByName(options, 'game');
	const gamertag = normalizeGamertag(
		getValueFromDiscordOptionsPayloadByName(options, 'gamertag')
	);

	// Halo Infinite
	if (game === 'infinite') {
		const response = await discord.messages.create({
			channel_id: `${context.params.event.channel_id}`,
			...(await getPlayerInfiniteRanks(gamertag)),
		});

		return response;
	}

	// Halo: The Master Chief Collection
	if (game === 'mcc') {
		const response = discord.messages.create({
			channel_id: `${context.params.event.channel_id}`,
			...(await getPlayerMCCRanks(gamertag)),
		});

		return response;
	}
};

//#endregion
