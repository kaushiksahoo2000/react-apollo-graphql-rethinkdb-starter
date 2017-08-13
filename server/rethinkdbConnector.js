import rethinkdb from 'rethinkdb'

let connection = null
let peopleArray = null
let peopleChanges = null

const rethinkdbConnector = async () => {
	console.log('rethinkdbConnector.js ', 'inside async call')

	await rethinkdb.connect({host: 'localhost', port: 28015}).then(function(conn) {
		//You are now connected to the database
		console.log('SUCCESSFULLY CONNECTED TO RETHINKDB')
		connection = conn
	}).error(function(error) {
		//Something bad happened
		console.log('ERROR CONNECTING TO RETHINKDB rethinkdb.connect error: ', {error})
	})

	const peopleTable = () => {
		rethinkdb.db('myDb').table('people').run(connection, function(err, cursor) {
			if (err) {
				throw err
			}
			cursor.toArray(function(err, result) {
				if (err) {
					throw err
				}
				// console.log(JSON.stringify(result));
				// console.log(result)
				// console.log(typeof result)
				peopleArray = result
			})
		})
		// console.log('inside peopleTable function', {peopleArray})
		return peopleArray
	}

	const peopleTableChanges = () => {
		console.log('INSIDE PEOPLE TABLE CHANGES')
		rethinkdb.db('myDb').table('people').changes().run(connection, function(err, cursor){
			if (err) throw err
			cursor.each(function(err, row) {
				if (err) throw err
				console.log('INSIDE CHANGEFEED FROM RETHINKDB CONNECTOR', JSON.stringify(row, null, 2))
			})
		})
		return peopleChanges
	}

	console.log('rethinkdbConnector.js ', 'after await rethinkdb connect call')
	return {
		people: () => peopleTable(),
		peopleChanges: () => peopleTableChanges()
	}
}

export default rethinkdbConnector
