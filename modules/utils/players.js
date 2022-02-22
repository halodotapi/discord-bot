/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

//#region public methods

/**
 * @param {string} gamertag
 */
const normalizeGamertag = gamertag =>
	gamertag.trim().replace(/#/g, '').replace(/-/g, '').toLowerCase();

/**
 * @param {string} gamertag
 */
const escapeGamertag = gamertag => gamertag.replace(/ +/g, '-');

//#endregion

module.exports = {
	normalizeGamertag,
	escapeGamertag,
};
