/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

//#region public methods

/**
 * @param {string | number} value
 */
const valueWithCommas = value =>
	String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * @param {string} gamertag
 */
const normalizeGamertag = gamertag =>
	gamertag.trim().replace(/#/g, '').replace(/-/g, '').toLowerCase();

/**
 * @param {string} gamertag
 */
const escapeGamertag = gamertag => gamertag.replace(/ +/g, '-');

/**
 * @param {string} name
 * @param {?any} value
 */
const drawDiscordValue = (name, value) =>
	name + (value !== void 0 ? ': ' + String(value) : '');

/**
 * @param {Array<{ "name": string; "value": string; "type": number }>} options
 * @param {string} name
 */
const getValueFromDiscordOptionsPayloadByName = (options, name) =>
	options.find(o => o.name === name).value;

//#endregion

module.exports = {
	valueWithCommas,
	normalizeGamertag,
	escapeGamertag,
	drawDiscordValue,
	getValueFromDiscordOptionsPayloadByName,
};
