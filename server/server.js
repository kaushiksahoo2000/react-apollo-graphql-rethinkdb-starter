import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rethinkdbConnector from './rethinkdbConnector'
import { schema } from './src/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const start = async () => {
	const rethinkdb = await rethinkdbConnector()
	const PORT = 4000;
	const app = express();

	app.use('*', cors({ origin: 'http://localhost:3000' }));

	app.use('/graphql', bodyParser.json(), graphqlExpress({
		context: {
			rethinkdb
		},
		schema
	}));

	app.use('/graphiql', graphiqlExpress({
	  endpointURL: '/graphql',
	  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
	}));

	// We wrap the express server so that we can attach the WebSocket for subscriptions
	const server = createServer(app);
	server.listen(PORT, () => {
	  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
	  // Set up the WebSocket for handling GraphQL subscriptions
	  new SubscriptionServer({
	    execute,
	    subscribe,
	    schema
	  }, {
	    server,
	    path: '/subscriptions',
	  });
	});
}

start()
