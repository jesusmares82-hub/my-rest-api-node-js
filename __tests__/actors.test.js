const request = require('supertest');
const app = require('../src/app');
const { actors, users } = require('../src/models')

let idCreateUsers = 0;
let id = 0;
let token = '';

beforeAll(async (done) => {

    let createUser = {
        first_name: 'Diego',
        last_name: 'Mesa',
        email: 'noludis1976@gmail.com',
        password: 'diego'
    }

    let resulCreateUser = await request(app).post('/api/v1/users').send(createUser);

    idCreateUsers = resulCreateUser.body.id;

    let loginUser = {
        email: 'noludis1976@gmail.com',
        password: 'diego'
    }

    let loginSuccess = await request(app).post('/api/v1/login').send(loginUser)

    token = loginSuccess.body.token;

    done();
})
describe('Estamos probando los endepoints de Actors', () => {
    it('Probando la creacion de un actor', async (done) => {

        let actor = {
            first_name: 'Diego',
            last_name: 'Mesa Luna',
            dob: '05-19-2021',
            biography: 'Estoy trabajando duro para que un día me llamen ingeniero',
            active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }

        let response = await request(app).post("/api/v1/actors").send(actor).set('access-token', token);
        id = response.body.id;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("first_name", "Diego");
        expect(response.body).toHaveProperty("id");

        done();
    })

    it('Actualizando un registro', async (done) => {
        let actorsUpdate = { first_name: 'Especialista' }

        let updateActors = await request(app).put(`/api/v1/actors/${id}`).send(actorsUpdate).set('access-token', token);

        expect(updateActors.status).toBe(201);
        expect(updateActors).toHaveProperty("text", "[1]");

        done();
    })

    it('Trayendo la lista de todos los actores', async (done) => {

        let getAllActors = await request(app).get('/api/v1/actors?page=1&limit=5').set('access-token', token);

        expect(getAllActors.status).toBe(201)
        expect(getAllActors.body.actorsDataPagination[0]).toHaveProperty('first_name', 'Especialista');

        done();
    })

    it('Trayendo la información de un solo actor', async (done) => {
        let getAllActors = await request(app).get(`/api/v1/actors/${id}`).set('access-token', token);

        expect(getAllActors.status).toBe(200)
        expect(getAllActors.body[0]).toHaveProperty('id', id)

        done();
    })

    it('Eliminando un actor', async (done) => {

        let deleActors = await request(app).delete(`/api/v1/actors/${id}`).set('access-token', token);
        // console.log(deleActors);

        expect(deleActors.status).toBe(201);
        expect(deleActors).toHaveProperty("body", 1);

        done();
    })

    afterAll(async (done) => {

        await users.destroy({ where: { id: idCreateUsers } });

        done();
    })
})

