/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../../modules/lib');
const { DISCORD_LIB_VERSION } = require('../../../../modules/discord/config');

const {
	getPlayerMCCMatches,
} = require('../../../../modules/halo-api/handlers/mcc/halo-matches');

const {
	normalizeGamertag,
	getValueFromDiscordOptionsPayloadByName,
} = require('../../../../modules/utils');

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

	// Halo: The Master Chief Collection
	if (game === 'mcc') {
		const response = discord.messages.create({
			channel_id: `${context.params.event.channel_id}`,
			...(await getPlayerMCCMatches(gamertag)),
		});

		return response;
	}
};

//#endregion
