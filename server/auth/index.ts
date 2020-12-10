import "reflect-metadata";
import express from 'express';
import { UserResolver } from './Account/resolvers';
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './util/constants'
// import cors from 'cors';

const main = async () => {
    const app = express();

    const RedisStore = connectRedis(session);
    const client = redis.createClient();

    // app.use(cors({"origin": 'http://localhost:3000', credentials: true}));

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: client,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                sameSite: 'lax',
                secure: __prod__,
            },
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app });

    app.get('/', function (_req, res) {
        res.send("home page")
    })

    app.get('/accountId', function(req: express.Request, res: express.Response) {
        // res.json({accountId:req.session.userName});
        // res.json({accountId:req.session.id});
        // res.json({accountId:req.session.account});
        res.json({accountId:req.session.accountId});
    })

    app.listen(4000, () => console.log('listening on port 4000'));
}

main().catch(err => console.log(err));