/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

//#region definitions

/**
 * @constant
 * @type {string}
 **/
const STDLIB_SECRET_TOKEN = process.env.STDLIB_SECRET_TOKEN;

//#endregion
//#region modules

const lib = require('lib')({
	token: STDLIB_SECRET_TOKEN,
});

//#endregion

module.exports = lib;
