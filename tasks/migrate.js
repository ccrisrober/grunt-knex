/*
 * grunt-knex
 * https://github.com/maldicion069/grunt-knex
 *
 * Copyright (c) 2016 maldicion069
 * Licensed under the MIT license.
 */

'use strict';
var colors  = require("colors"),
    Promise = require("bluebird"),
	Knex    = require("knex");

module.exports = function(grunt) {
	var knex;
	grunt.registerTask("migrate", "", function(cmd, name) {
		var done = this.async();
		var file = grunt.config.get("knex.file");
		var config = file? require(file) : grunt.config("knex.config");
		
		var env = grunt.option("env") || "development";

		knex = Knex(config[env]);
		commands_migrate[cmd](config[env], name)
			.then(function(msg) {
				grunt.log.oklns(msg);
			})
			.catch(function(msg) {
				grunt.log.errorlns(msg);
			})
			.finally(done);
	});

	var commands_migrate = {
		make: function(config, name) {
			if(name == null){
				return Promise.reject("Name can not be empty!");
			}
			return knex.migrate.make(name, config)
				.then(function(fn) {
					return ('Created Migration: ' + name).green;
				});
		},
		run: function(config) {
			return knex.migrate.latest(config)
				.spread(function(batchNo, log) {
					if(log.length === 0) {
						return "Already up to date".cyan;
					} else {
						return ('Batch ' + batchNo + ' run: ' + log.length + ' migrations \n' + log.join("\n")).green
					}
				});
		},
		rollback: function(config) {
			return knex.migrate.rollback(config)
				.spread(function(batchNo, log) {
					if(log.length === 0) {
						return 'Already at the base migration'.cyan;
					} else {
						return ('Batch ' + batchNo + ' rolled back: ' + log.length + ' migrations \n' + log.join("\n")).green
					}
				});
		},
		version: function(config) {
			return knex.migrate.currentVersion(config)
				.spread(function(version) {
        			return ('Current Version: ' + version.blue).green;
				});
		}
	};
};