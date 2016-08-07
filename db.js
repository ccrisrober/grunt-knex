module.exports = {
	test: {
		client: 'mysql',
		connection: {
			host: "127.0.0.1",
			database: "demo",
			user: "root",
			password: ""
		},
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/test'
		}
	},
	development: {
		client: 'mysql',
		connection: {
			host: "127.0.0.1",
			database: "demo",
			user: "root",
			password: ""
		},
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/development'
		}
	},
	production: {
		client: 'mysql',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/production'
		}
	}
};