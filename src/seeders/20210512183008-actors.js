'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('actors', [
      {
        first_name: 'Jeremiah',
        last_name: 'Valeska',
        dob: '12-05-2021',
        biography: 'Soy de Cicuco, Bolivar',
        profile_photo: 'https://pbs.twimg.com/media/D8QlywTW4AE1C5a.jpg',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Oswald',
        last_name: 'Cobbelpot',
        dob: '12-05-2021',
        biography: 'Soy de Cicuco, Bolivar',
        profile_photo: 'https://pbs.twimg.com/media/D8QlywTW4AE1C5a.jpg',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Melissa',
        last_name: 'Mesa Luna',
        dob: '12-05-2021',
        biography: 'Soy de Cicuco, Bolivar',
        profile_photo: 'https://pbs.twimg.com/media/D8QlywTW4AE1C5a.jpg',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Viviana',
        last_name: 'Luna Sanez',
        dob: '12-05-2021',
        biography: 'Soy de Cicuco, Bolivar',
        profile_photo: 'https://pbs.twimg.com/media/D8QlywTW4AE1C5a.jpg',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('actors', null, {});
  }
};
