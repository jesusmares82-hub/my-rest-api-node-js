'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Viviana',
        last_name: 'Sanez Luna',
        email: 'viviana_sanez@gmail.com',
        password: 'saenz14',
        reset_token: 'asdqewfasdasdadsasd',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Diego',
        last_name: 'Mesa Luna',
        email: 'degoprisss@gmail.com',
        password: 'viviana14',
        reset_token: 'asdqewfadsasd',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Melissa',
        last_name: 'Mesa Luna',
        email: 'Melissamelu1@gmail.com',
        password: 'melis14',
        reset_token: 'asaasdsdqewfadsasd',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Apolinar',
        last_name: 'Luna Borquez',
        email: 'pollo104@gmail.com',
        password: 'apolapollo14',
        reset_token: 'asdqewfasdasdadsasd',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
