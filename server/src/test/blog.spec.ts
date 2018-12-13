import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:3000/api/blog';
const expect = chai.expect;
const JWT_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTA0NWQ5NzM5MGJlYTNmOWM1MTQ3NzUiLCJlbWFpbCI6InZpZ25lcy5hcnVsam90aGlAZ21haWwuY29tIiwibmFtZSI6IlZpZ25lcyBBcnVsam90aGkiLCJleHAiOjE1NDUyMzQ1OTAsImlhdCI6MTU0NDYyOTc5MH0.OXv87OxQx9x2CM222HMML777JgZBOG3rOucwi7sRwdw`;

describe('Blog API[/api/blog] Test Suite', () => {

    it('1 > Fetch All Published Blog API[/:page]: should return the list of blog', () => {
        chai.request(BASE_URL).get('/0')
            .then(res => {
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
                expect(res.body[0].status).to.be.equal('published');
            });
    });

    it('2 > Get A Published Blog API[/:id]: should return the blog', () => {
        chai.request(BASE_URL).get('/59946057d3a8604780c6e4ad/load')
            .then(res => {
                expect(res.body.title).length.greaterThan(0);
                expect(res.body.content).length.greaterThan(0);
                expect(res.body.status).to.be.equal('published');
            });
    });

    it('3 > Search Blog API[/search/:query]: should return the list of blog', () => {
        chai.request(BASE_URL).get('/search/spring')
            .then(res => {
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
                expect(res.body[0].status).to.be.equal('published');
            });
    });

    it('4 > Get Blog Written By Author API[/all/:writtenBy]: should return the list of blog', () => {
        chai.request(BASE_URL).get('/all/59945ee3d3a8604780c6e4a8')
            .set('x-access-token', JWT_TOKEN)
            .then(res => {
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
            });
    });

    it('5 > Get Pending Blog List API[/all/pending/list]: should return the list of blog', () => {
        chai.request(BASE_URL).get('/all/pending/list')
            .set('x-access-token', JWT_TOKEN)
            .then(res => {
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
                expect(res.body[0].status).to.be.equal('pending');
            });
    });
});
