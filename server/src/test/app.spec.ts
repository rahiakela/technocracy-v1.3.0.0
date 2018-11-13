import 'mocha';
import * as chai from 'chai';
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:3000';
const expect = chai.expect;

// https://tutorialedge.net/typescript/creating-rest-api-express-typescript/
// https://mherman.org/blog/developing-a-restful-api-with-node-and-typescript/
// https://stackoverflow.com/questions/43320699/chai-response-body-is-always-empty
describe('Base API /api', () => {
    it('should be json', () => {
        return chai.request(BASE_URL).get('/')
            .then(res => {
                expect(res.type).to.equal('application/json');
            });
    });

    it('should return welcome message', async () => {
       return chai.request(`${BASE_URL}`).get('/')
           .then(res => {
               expect(res.body).to.have('message', 'Welcome to Technocracy REST APIs!!!!');
           });
    });
});