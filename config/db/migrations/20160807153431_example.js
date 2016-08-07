
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', function(table) {
		table.increments('userid').primary();
		table.string('username');
		table.string('password');
		table.string('name');
		table.string('email');
		table.timestamps(true, true); // Adds 'created_at' & 'updated_at' with both not nullable & default-ing to Date.now();
		//table.timestamps(); // Just adds 'created_at' & 'updated_at' with default null
	});
};

exports.down = function(knex, Promise) {
		return knex.schema.dropTable('user');
};