
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user').insert({
          username: "sdfsdf",
          password: "xxxx",
          name: "fgg",
          email: "fgfgfgffff"
        })
      ]);
    });
};
