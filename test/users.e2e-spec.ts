import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let server: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();
    });

    it('/users (POST) should create a user', async () => {
        const userPayload = {
            firstName: "John",
            lastName: "Doe",
            age: 32,
            email: "email@email.com",
            password: "password"
        };

        const response = await request(server)
            .post('/users')
            .send(userPayload)
            .expect(201);

        expect(response.body.firstName).toEqual(userPayload.firstName);
        expect(response.body.lastName).toEqual(userPayload.lastName);
        expect(response.body.age).toEqual(userPayload.age);
        expect(response.body.email).toEqual(userPayload.email);

        const createdUser = response.body;
    });

    it('/users/:userId (PUT) should update a user', async () => {
        const updatedData = {
            firstName: "Jane",
            lastName: "Smith",
            age: 30,
            email: "jane@email.com",
            password: "newpassword"
        };


        const res = await request(server).get('/users');
        const users = res.body;
        const randomUser = users[Math.floor(Math.random() * users.length)];

        const response = await request(server)
            .put(`/users/${randomUser.id}`)
            .send(updatedData)
            .expect(200);  // Assuming 200 is returned for a successful update

        expect(response.body.firstName).toEqual(updatedData.firstName);
        expect(response.body.lastName).toEqual(updatedData.lastName);
        expect(response.body.age).toEqual(updatedData.age);
        expect(response.body.email).toEqual(updatedData.email);
    });

    it('/users (POST) should not create a user with existing email', async () => {
        const duplicateEmailPayload = {
            firstName: "James",
            lastName: "Brown",
            age: 35,
            email: "email@email.com",  // Using an email that's supposed to already exist
            password: "somepassword"
        };

        await request(server)
            .post('/users')
            .send(duplicateEmailPayload)
            .expect(400);  // Assuming 400 or another appropriate status code for duplication error
    });

    afterAll(async () => {
        await app.close();
    });
});