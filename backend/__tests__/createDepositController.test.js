import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server.js'

const request = supertest(app);
describe('AuthController', () => {
    describe('POST /api/auth/login', () => {
        it('should return valid jwt token when provided with correct credentials', async () => {
            const response = await request
                .post('/api/auth/createDeposit')
                .send({ user_id: 1, password: 'adminpass' });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('userId');
        });

        it('should return an error when provided with incorrect credentials', async () => {
            const response = await request
                .post('/api/auth/createDeposit')
                .send({ user_id: 1, password: 'password' });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');
        });

        it('should return error when user is not found', async () => {
            const response = await request
                .post('/api/auth/createDeposit')
                .send({ user_id: 123, password: 'gdsf' });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');
        });
    });
});