import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `

type Person {
	age: Int
	contactInfo: ContactInfo
	id: String
	interests: [String!]!
	name: String
}

type ContactInfo {
	email: String
	phone: String
}

type Channel {
  id: ID!                # "!" denotes a required field
  name: String
  messages: [Message]!
}

input MessageInput{
  channelId: ID!
  text: String
}

type Message {
  id: ID!
  text: String
}

# This type specifies the entry points into our API
type Query {
	people: [Person]
	channels: [Channel]    # "[]" means this is a list of channels
	channel(id: ID!): Channel
}

# The mutation root type, used to define all mutations
type Mutation {
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}

# The subscription root type, specifying what we can subscribe to
type Subscription {
  messageAdded(channelId: ID!): Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
