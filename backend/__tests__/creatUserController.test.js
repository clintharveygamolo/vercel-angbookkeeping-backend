import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server.js'

const request = supertest(app);
describe('AuthController', () => {
    describe('POST /api/auth/login', () => {
        it('should return valid jwt token when provided with correct credentials', async () => {
            const response = await request
                .post('/api/auth/createUser')
                .send({ 
                    user_id: 1,
                    name: 'Clint Harvey',
                    password: 'test',
                    role: 'Admin'
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('userId');
        });

        it('should return an error when provided with incorrect credentials', async () => {
            const response = await request
                .post('/api/auth/login')
                .send({ 
                    user_id: 1,
                    name: 'Stephen Ang',
                    password: 'test',
                    role: 'Admin'
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');
        });

        it('should return error when user is not found', async () => {
            const response = await request
                .post('/api/auth/login')
                .send({ 
                    user_id: 1,
                    name: 'Din Magallanes',
                    password: 'test',
                    role: 'Viewer'
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');
        });
    });
});