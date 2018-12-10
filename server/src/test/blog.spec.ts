import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:3000/api/blog';
const expect = chai.expect;

describe('Blog API[/api/blog] Test Suite', () => {

    it('1 > Fetch All Published Blog API[/:page]: should return the list of blog', () => {
        chai.request(BASE_URL).get('/0')
            .then(res => {
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
                expect(res.body[0].status).to.be.equal('published');
            });
    });

});
