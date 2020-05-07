const express = require("express");
const { connect } = require("./db/db");
const multer = require("multer");
const { getSessionBySesid } = require("./db/models/session");
const { getUserById } = require("./db/models/user");
const app = express();
const http = require("http").createServer(app);

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials: true
};

app.use(require('cors')(corsOptions));

app.use("/static", express.static("static"));

app.use(require("body-parser").json());
app.use(require("cookie-parser")());

require("./apollo/apollo")(app, corsOptions);
require("./socketio").connect(http);

const start = async () => {
    await connect();
    await http.listen(3500, () => console.log("Listening 3500 port"));
}

start();