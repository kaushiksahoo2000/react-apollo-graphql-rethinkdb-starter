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
	interests: [String]
	name: String
}

type ContactInfo {
	email: String
	phone: String
}

# This type specifies the entry points into our API
type Query {
	people: [Person]
	peopleChanges: [Person]
}

# The mutation root type, used to define all mutations
# type Mutation {

# }

# The subscription root type, specifying what we can subscribe to
type Subscription {
  personAdded: Person
}

`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
