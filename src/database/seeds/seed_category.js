
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tb_category').del()
    .then(function () {
      // Inserts seed entries
      return knex('tb_category').insert([
        {name: 'fiction'},
        {name: 'action'},
        {name: 'mistery'}
      ]);
    });
};
