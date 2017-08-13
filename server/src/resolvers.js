import { PubSub, withFilter } from 'graphql-subscriptions'
import rethinkdb from 'rethinkdb'

const pubsub = new PubSub();

export const resolvers = {
	Query: {
		people: (root, data, {rethinkdb: {people}}) => {
			// console.log('people query, people: ', people())
			return people()
		},
		peopleChanges: (root, data, {rethinkdb: {peopleChanges}}) => {
			// console.log('people query, people: ', people())
			return peopleChanges()
		},
	},
  // Mutation: {
  //   addChannel: (root, args) => {
  //     const newChannel = { id: String(nextId++), messages: [], name: args.name };
  //     channels.push(newChannel);
  //     return newChannel;
  //   },
  //   addMessage: (root, { message }) => {
  //     const channel = channels.find(channel => channel.id === message.channelId);
  //     if(!channel)
  //       throw new Error("Channel does not exist");
  //
  //     const newMessage = { id: String(nextMessageId++), text: message.text };
  //     channel.messages.push(newMessage);
  //
  //     pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });
  //
  //     return newMessage;
  //   },
  // },
  // Subscription: {
  //   messageAdded: {
  //     subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
  //       // The `messageAdded` channel includes events for all channels, so we filter to only
  //       // pass through events for the channel specified in the query
  //       return payload.channelId === variables.channelId;
  //     }),
  //   }
  // },
  Subscription: {
	  personAdded: {
		  subscribe: () => {

		  }
	  }
  }
};
