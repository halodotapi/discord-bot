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

//#endregion

module.exports = {
	valueWithCommas,
};
