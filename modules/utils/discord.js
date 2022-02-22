/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const { b64encode, b64decode } = require('./crypto');

//#region definitions

/**
 * @constant
 */
const CUSTOM_IDS_ACTIONS = {
	MCC_MATCHES: 'mcc_matches',
	INFINITE_MATCHES: 'infinite_matches',
};

//#endregion
//#region public methods

/**
 * @param {Array<{ "name": string; "value": string; "type": number }>} options
 * @param {string} name
 */
const getValueFromDiscordOptionsPayloadByName = (options, name) =>
	options.find(o => o.name === name).value;

/**
 * @param {string} action
 * @param {Record<string, unknown>} payload
 */
const packCustomId = (action, payload) =>
	[action, b64encode(JSON.stringify(payload))].join('#');

/**
 * @param {string} customId
 */
const unpackCustomId = customId => {
	const explode = customId.split('#');

	return {
		action: explode[0],
		payload: JSON.parse(b64decode(explode[1])),
	};
};

//#endregion

module.exports = {
	getValueFromDiscordOptionsPayloadByName,
	packCustomId,
	unpackCustomId,
	CUSTOM_IDS_ACTIONS,
};
