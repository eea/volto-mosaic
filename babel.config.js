module.exports = function (api) {
	api.cache(true);

	const presets = [ "@babel/preset-env", "@babel/preset-react" ];
	const plugins = [ require("@babel/plugin-proposal-class-properties") ];

	return {
		presets,
		plugins
	};
};