const express = require("express");
const { connect } = require("./db/db");
const app = express();


app.use(/.*/, (req, res, next) => {
    if(req.headers.origin) 
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    else res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(require("body-parser").json());
app.use(require("cookie-parser")());

app.use(require("./graphql"));

app.use("/api", require("./routes/auth"));

const start = async () => {
    await connect();
    await app.listen(3500, () => console.log("Listening 3500 port"));
}

start();