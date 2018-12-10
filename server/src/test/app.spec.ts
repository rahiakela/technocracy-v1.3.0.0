import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:3000';
const expect = chai.expect;

// https://tutorialedge.net/typescript/creating-rest-api-express-typescript/
// https://mherman.org/blog/developing-a-restful-api-with-node-and-typescript/
// https://stackoverflow.com/questions/43320699/chai-response-body-is-always-empty
// https://stackoverflow.com/questions/31176526/how-to-write-a-post-request-test-in-mocha-with-data-to-test-if-response-matches
describe('Base API[/api] Test Suite', () => {

    it('1 > should be json', async () => {
        return chai.request(BASE_URL).get('/api')
            .then(res => {
                expect(res.type).to.equal('application/json');
            });
    });

    it('2 > should return welcome message', async () => {
       return chai.request(`${BASE_URL}`).get('/api')
           .then(res => {
               expect(res.body.message).to.equal('Welcome to Technocracy REST APIs!!!!');
           });
    });

});
