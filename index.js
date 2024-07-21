const express = require("express");
const https = require("https");
const fs = require("fs");

const config = require("./config");

const app = express();

const certificate = fs.readFileSync("/etc/letsencrypt/live/64bit.dev/fullchain.pem");
const privateKey = fs.readFileSync("/etc/letsencrypt/live/64bit.dev/privkey.pem");

app.use("/", (req, res) => {
	return res.sendFile("index.html", { root: "./" });
});

const httpsServer = https.createServer({
	cert: certificate,
	key: privateKey,
}, app);

httpsServer.listen(config.PORT, () => console.log(`Running api on https://${ config.HOST }:${ config.PORT }/`));
