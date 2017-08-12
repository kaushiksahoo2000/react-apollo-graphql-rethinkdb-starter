import React from 'react'
import { gql, graphql } from 'react-apollo';

const PeopleList = ({ data: {loading, error, people }}) => {
	console.log('PeopleList.js', {loading, error, people})
	if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }

	return (
		<div className="peopleList">
			{ people.map( person =>
			(<div key={person.id}>
			   {person.name}
			</div>)
			)}
			{/* Hello There from PeopleList.js */}
		</div>
	)
}

export const peopleListQuery = gql`
	query PeopleListQuery {
		people {
			id
			name
			interests
		}
	}
`

export default graphql(peopleListQuery, {
  options: { pollInterval: 5000 },
})(PeopleList);
