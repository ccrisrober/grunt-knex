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
	grunt.registerTask("seed", "", function(cmd, name) {
		var done = this.async();
		var file = grunt.config.get("knex.file");
		var config = file? require(file) : grunt.config("knex.config");
		
		var env = grunt.option("env") || "development";

		knex = Knex(config[env]);
		commands_seed[cmd](config[env], name)
			.then(function(msg) {
				grunt.log.oklns(msg);
			})
			.catch(function(msg) {
				grunt.log.errorlns(msg);
			})
			.finally(done);
	});
	var commands_seed = {
		make: function(config, name) {
			if(name == null){
				return Promise.reject("Name can not be empty!");
			}
			return knex.seed.make(name, config)
				.then(function(fn) {
					return ('Created seed file: ' + name).green;
				});
		},
		run: function(config) {
			return knex.seed.run(config)
				.then(function(log) {
					if(log.length === 0) {
						return "No seed files exist".cyan;
					} else {
						return ('Ran ' + log.length +' seed files \n' + log.join("\n")).green;
					}
				});
		}
	};
};