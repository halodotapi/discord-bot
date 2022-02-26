/**
 * Made with ♥ by Zeny (Autocode)
 * https://autocode.com/halo
 **/

const lib = require('../../../lib');
const { MCC_LIB_VERSION } = require('../../config');
const { packCustomId, CUSTOM_IDS_ACTIONS } = require('../../../utils/discord');

const {
	BOT_EMBED_COLOR,
	BOT_EMBED_AUTHOR_NAME,
	BOT_EMBED_AUTHOR_URL,
	BOT_EMBED_ICON_URL,
} = require('../../../discord/config');

//#region public methods

/**
 * @param {string} language
 * @param {number} [index=0]
 **/
const getMCCArticles = async (language, index = 0) => {
	const mcc = lib.halo.mcc[MCC_LIB_VERSION];
	const articles = await mcc.articles.list({
		language,
	});

	const articleInfo = articles.data[index];
	const hasPrevious = articles.data[index + 1] !== void 0;
	const hasNext = articles.data[index - 1] !== void 0;

	// Navigation Buttons
	const components = [];
	const navigationButtonTemplate = {
		style: 1,
		label: '',
		custom_id: '',
		disabled: true,
		type: 2,
	};

	if (articles.data.length >= 2) {
		components.push({
			type: 1,
			components: [
				{
					...navigationButtonTemplate,
					label: 'Previous',
					custom_id: packCustomId(CUSTOM_IDS_ACTIONS.MCC_ARTICLES, {
						language,
						index: index - 1,
					}),
					disabled: hasNext === false,
				},
				{
					...navigationButtonTemplate,
					label: 'Next',
					custom_id: packCustomId(CUSTOM_IDS_ACTIONS.MCC_ARTICLES, {
						language,
						index: index + 1,
					}),
					disabled: hasPrevious === false,
				},
			],
		});
	}

	return {
		content: '',
		tts: false,
		components,
		embed: {
			color: BOT_EMBED_COLOR,
			title: articleInfo.title,
			description: articleInfo.message,
			author: {
				name: BOT_EMBED_AUTHOR_NAME,
				url: BOT_EMBED_AUTHOR_URL,
				icon_url: BOT_EMBED_ICON_URL,
			},
			thumbnail: {
				url: articleInfo.image_url,
			},
			footer: {
				text: 'Halo: The Master Chief Collection',
			},
		},
	};
};

//#endregion

module.exports = {
	getMCCArticles,
};
