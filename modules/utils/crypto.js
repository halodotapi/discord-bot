/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

//#region public methods

/**
 * @param {string} entry
 */
const b64encode = entry => Buffer.from(entry).toString('base64');

/**
 * @param {string} entry
 */
const b64decode = entry => Buffer.from(entry, 'base64').toString('utf-8');

//#endregion

module.exports = {
	b64encode,
	b64decode,
};
