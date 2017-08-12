import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo';


class PeopleList extends Component {
	render() {
		const { data: {loading, error, people } } = this.props

		if (loading) {
			return <p>Loading ...</p>
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
			</div>
		)
	}
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
