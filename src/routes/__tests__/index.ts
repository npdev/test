import request from 'supertest';
import { app } from "../../index";
import { Controller } from '../../controllers/controller';
import {IUser} from "../../models/user";

describe('GET /', () => {
    it('should return 200 & valid response', async done => {
        request(app)
            .get(`/`)
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.text).toBe("Hello world!")
                done()
            })
    });
});

describe('POST /createUser', () => {
    it('responds with json', async done => {
        const mockUser = {} as IUser;
        jest.spyOn(Controller.prototype, 'createUser')
            .mockImplementationOnce(() => Promise.resolve(mockUser));

        request(app)
            .post('/createUser')
            .send({name: 'john'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                return done();
            });
    });
});