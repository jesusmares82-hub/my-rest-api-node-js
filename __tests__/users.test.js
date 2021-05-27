const request = require('supertest');
const app = require('../src/app');
const { users } = require('../src/models');

let idCreateUsers = 0;
let id = 0;
let token = '';

describe('Probando los endpoints de usuarios', () => {
    it('Probando la creacion de un usuario', async (done) => {

        let createUser = {
            first_name: 'Nohemi',
            last_name: 'Luna',
            email: 'noludis1976@gmail.com',
            password: 'diego'
        }
    
        let resulCreateUser = await request(app).post('/api/v1/users').send(createUser);
    
        idCreateUsers = resulCreateUser.body.id;
       

        expect(resulCreateUser.status).toBe(201);
        expect(resulCreateUser.body).toHaveProperty('id', idCreateUsers); 
        expect(resulCreateUser.body).toHaveProperty('first_name', 'Nohemi'); 

        done();
    }) 

    it('Logueandome', async (done) => {
        let loginUser = {
            email: 'noludis1976@gmail.com',
            password: 'diego'
        }

        let loginSuccess = await request(app).post('/api/v1/login').send(loginUser)

        token = loginSuccess.body.token;
        
       
        expect(loginSuccess.status).toBe(200);
        expect(loginSuccess.body.existsUsers).toHaveProperty('first_name', 'Nohemi')
        expect(loginSuccess.body.existsUsers).toHaveProperty('email', 'noludis1976@gmail.com')
       
        done()
    }) 

    it('Actualizando un usuario', async (done) => {

        let updateUser = {
            first_name: 'Humberto', 
            last_name: 'Enrique', 
            email: 'enrique@gmail.com', 
            password: 'enrique' 
        } 

        let updateResult = await request(app).put(`/api/v1/users/${idCreateUsers}`).send(updateUser).set('authorization', token);

        expect(updateResult.text).toBe('[1]');
        expect(updateResult.status).toBe(203)
        
        done();

    }) 

    it('Eliminando una usuario', async (done) => {

        let deleteUser = await request(app).delete(`/api/v1/users/${idCreateUsers}`).set('authorization', token);
    
        expect(deleteUser.status).toBe(201);
        expect(deleteUser.body).toBe(1);

        done()
    })

})
