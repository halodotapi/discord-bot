/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../../../../modules/lib');

const {
	unpackCustomId,
	CUSTOM_IDS_ACTIONS,
} = require('../../../../../../modules/utils/discord');

const {
	DISCORD_LIB_VERSION,
} = require('../../../../../../modules/discord/config');

const {
	getPlayerMCCMatches,
} = require('../../../../../../modules/halo-api/handlers/mcc/halo-matches');

const {
	getPlayerInfiniteMatches,
} = require('../../../../../../modules/halo-api/handlers/infinite/halo-matches');

//#region handler

module.exports = async (
	/**
	 * @see https://docs.autocode.com/building-endpoints/the-context-object/
	 */
	context
) => {
	const customId = context.params.event.data.custom_id;

	if (customId === void 0) {
		throw new Error('Missing "custom_id" property');
	}

	const { action, payload } = unpackCustomId(customId);
	const discord = lib.discord.channels[DISCORD_LIB_VERSION];

	if (action === CUSTOM_IDS_ACTIONS.MCC_MATCHES) {
		await setLoading(
			context.params.event.message.id,
			context.params.event.channel_id
		);

		const response = await discord.messages.update({
			message_id: context.params.event.message.id,
			channel_id: context.params.event.channel_id,
			...(await getPlayerMCCMatches(payload.gamertag, payload.index)),
		});

		return response;
	}

	if (action === CUSTOM_IDS_ACTIONS.INFINITE_MATCHES) {
		await setLoading(
			context.params.event.message.id,
			context.params.event.channel_id
		);

		const response = await discord.messages.update({
			message_id: context.params.event.message.id,
			channel_id: context.params.event.channel_id,
			...(await getPlayerInfiniteMatches(
				payload.gamertag,
				payload.index
			)),
		});

		return response;
	}

	throw new Error('Unknown "action" specified');
};

//#endregion
//#region private methods

/**
 * @param {string} messageId
 * @param {string} channelId
 * @param {any} discord
 */
const setLoading = async (messageId, channelId) => {
	const discord = lib.discord.channels[DISCORD_LIB_VERSION];
	await discord.messages
		.update({
			message_id: messageId,
			channel_id: channelId,
			components: [],
		})
		.catch(console.error);
};

//#region
