import rethinkdb from 'rethinkdb'

const rethinkdbConnector = async () => {
	console.log('rethinkdbConnector.js ', 'inside async call')
	await rethinkdb.connect({host: 'localhost', port: 28015}).then(function(conn) {
		//You are now connected to the database
		console.log('SUCCESSFULLY CONNECTED TO RETHINKDB')
		rethinkdb.db('myDb').table('people').run(conn).then(function(result) {
			console.log('database: myDb, table: people, result: ', {result})
		})
	}).error(function(error) {
		//Something bad happened
		console.log('ERROR CONNECTING TO RETHINKDB rethinkdb.connect error: ', {error})
	})
	console.log('rethinkdbConnector.js ', 'after await rethinkdb connect call')
}

export default rethinkdbConnector
