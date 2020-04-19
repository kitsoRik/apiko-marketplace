const graphqlHTTP = require('express-graphql');
const schema = require("./schema");
const { getUserById } = require('../db/models/user');
const { getSessionBySesid } = require('../db/models/session');

const router = require("express").Router();

router.use('/api/graphql', async (req, res) => {
    if(req.method === 'OPTIONS') return res.send({});
    
    const { sesid } = req.cookies;
    
    const session = await getSessionBySesid(sesid);
    let user;
    
    if(session) user = await getUserById(session.userId);

    graphqlHTTP({
        schema: schema,
        graphiql: true,
        context: { req, res, user }
      })(req, res);
});

module.exports = router;