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
            .set('')
            .then(res => {
                console.log(res.body);
                expect(res.body[0].title).length.greaterThan(0);
                expect(res.body[0].content).length.greaterThan(0);
                expect(res.body[0].status).to.be.equal('published');
            });
    });
});
