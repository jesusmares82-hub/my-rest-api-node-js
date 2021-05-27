const request = require('supertest');
const app = require('../src/app');
const { contents } = require('../src/models');

let idCreateUsers = 0;
let id = 0;
let idUpdate = 0;
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

    let actor = {
        title: 'Probando'
    }

    let response = await request(app).post("/api/v1/contents").send(actor).set('authorization', token);

    done();
})

describe('Probando los endpoints de contenido', () => {
    it('Trayendo todo los registros de contents', async (done) => {

        let getAllContents = await request(app).get('/api/v1/contents?page=1&limit=5').set('authorization', token);

        let arrayContents = getAllContents.body.actorsDataPagination
        let arrayContentsLength = arrayContents.length - 1;
        let arrayExpect = getAllContents.body.actorsDataPagination[arrayContentsLength]
     
        id = arrayExpect.id;

        expect(getAllContents.status).toBe(201)
        expect(arrayExpect).toHaveProperty('title', 'Probando')
        expect(arrayExpect).toHaveProperty('id') 

        done();
    });

    it('Contenido segun su id', async (done) => {

        let getIdContents = await request(app).get(`/api/v1/contents/${id}`).set('authorization', token);

        let getIdNew = getIdContents.body[0]; 
        
        expect(getIdContents.status).toBe(201)
        expect(getIdNew).toHaveProperty('title', 'Probando')
        expect(getIdNew).toHaveProperty('id'); 

        done();
    });

    it('Creando un nuevo contenido', async (done) => {

        let dataCreateContent = { title: 'Creando un conteido de prueba'}
        let createResult = await request(app).post('/api/v1/contents').send(dataCreateContent).set('authorization', token);

        idUpdate = createResult.body.id;

        expect(createResult.status).toBe(201)
        expect(createResult.body).toHaveProperty('title', 'Creando un conteido de prueba');
        expect(createResult.body).toHaveProperty('id'); 

        done();
    });

    it('Actualizando un contenido', async (done) => {

        let updateData = {title: 'Acutaliznado el registro anterior'}

        let updateContent = await request(app).put(`/api/v1/contents/${idUpdate}`).send(updateData).set('authorization', token);
        console.log(updateContent.body); 
        console.log(updateContent.status); 

        expect(updateContent.status).toBe(201);
        expect(updateContent.text).toBe('[1]');

        done();
    })

    it('Eliminando contenido', async (done) => {

        let deleteGeneral = await request(app).delete(`/api/v1/contents/${id}`).set('authorization', token);
        let deleteContent = await request(app).delete(`/api/v1/contents/${idUpdate}`).set('authorization', token);
        
        
        expect(deleteContent.status).toBe(201);
        expect(deleteContent.body).toBe(1);

        done();

    })

    afterAll(async (done) => {
        let deleteUser = await request(app).delete(`/api/v1/users/${idCreateUsers}`).set('authorization', token);        
        done();
    })

}) 