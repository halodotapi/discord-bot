/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../modules/lib');

await lib.discord.users['@0.2.0'].me.status.update({
	activity_name: `/halo commands`,
	activity_type: 'WATCHING',
	status: 'ONLINE',
});
