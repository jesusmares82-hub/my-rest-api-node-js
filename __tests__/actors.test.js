const { create } = require('../src/controllers/actors.controllers');
const request = require('supertest');
const app = require('../src/server')
// const { actors } = require('../src/models') 

it('Probando la creacion de un actor', async () => {
    //AAA

    //.Arrage
    let actor = {
        first_name: 'Melissa', 
        last_name: 'Mesa Luna',
        dob: '05-19-2021',
        biography: 'Soy de Cicuco, Bolivar',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
    }
    //.Action
    let response = await request(app).post("/api/v1/actors").send(actor);
    // console.log(response);

    //.Assert
    // expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("first_name", "Melissa");
    // expect(response._data).toHaveProperty("id");
})
