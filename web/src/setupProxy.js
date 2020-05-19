const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = createProxyMiddleware({
	target: "https://apiko-marketplace-api-2019.herokuapp.com/",
	pathRewrite: {
		"^api": "",
	},
	changeOrigin: true,
});

module.exports = function (app) {
	app.use("/api", proxy);
};
