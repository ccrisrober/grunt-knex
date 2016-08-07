/*
 * grunt-knex
 * https://github.com/maldicion069/grunt-knex
 *
 * Copyright (c) 2016 maldicion069
 * Licensed under the MIT license.
 */

'use strict';
var colors  = require("colors"),
	Knex    = require("knex");

module.exports = function(grunt) {

	grunt.initConfig({
		knex: {
			//file: process.cwd() + "/db.js",


			config: {
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
				}
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

};
