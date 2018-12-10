import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:3000/api/auth';
const expect = chai.expect;

describe('Auth API[/api/auth] Test Suite', () => {

    it('1 > Login API[/login]: should return JWT Token', async (done) => {
        chai.request(BASE_URL).post('/login')
            .send({'email': 'vignes.aruljothi@gmail.com', 'password': 'test1234'})
            .then(res => {
                expect(res.type).to.equal('application/json');
                expect(res.body.statusCode).to.be.equal(200);
                expect(res.body.user.jwtToken).to.have.length(256);
            });
        done();
    });

    it('2 > Account APIs Register/Activate/Re-Activate/Update Email/Forget/Reset Password', (done) => {
        chai.request(BASE_URL).post('/register')
            .send({
                'email': 'dummy.user@example.com',
                'username': 'dummy.user',
                'password': 'test1234'
            })
            .then(res => {
                expect(res.body.local.name).to.be.equal('dummy.user');
                expect(res.body.local.email).to.be.equal('dummy.user@example.com');
                expect(res.body.local.active).to.be.equal('N');
                expect(res.body.local.activateToken.token).to.have.length(16);

                // run test in time interval like 1, 2, 3 and 4 seconds
                setTimeout(() => {
                    // test account activate api as well
                    chai.request(BASE_URL).get('/activate/' + res.body.local.activateToken.token)
                        .then(res2 => {
                            // expect(res.body.statusCode).to.be.equal(200);
                            expect(res2.body.user.local.name).to.be.equal('dummy.user');
                            expect(res2.body.user.local.email).to.be.equal('dummy.user@example.com');
                            expect(res2.body.user.local.active).to.be.equal('Y');
                        });
                }, 1000);

                setTimeout(() => {
                    // test account reactivate api as well
                    chai.request(BASE_URL).put('/reactivate')
                        .send({'email': 'dummy.user@example.com'})
                        .then(res2 => {
                            expect(res2.body.verified).to.be.equal(true);
                        });
                }, 2000);

                setTimeout(() => {
                    // test update email api as well
                    chai.request(BASE_URL).put('/mail/update')
                        .send({
                            'newEmail': 'dummy.user1@example.com',
                            'oldEmail': 'dummy.user@example.com'
                        })
                        .then(res2 => {
                            expect(res2.body.updated).to.be.equal(true);
                        });
                }, 3000);

                setTimeout(() => {
                    // test forget password api as well
                    chai.request(BASE_URL).put('/forgot/pass')
                        .send({'email': 'dummy.user1@example.com'})
                        .then(res2 => {
                            expect(res2.body.mailSent).to.be.equal(true);
                            expect(res2.body.user.local.activateToken.token).to.have.length(16);

                            setTimeout(() => {
                                // test reset password api as well
                                chai.request(BASE_URL).put('/reset/pass')
                                    .send({
                                        'password': 'test@1234',
                                        'token': res2.body.user.local.activateToken.token
                                    })
                                    .then(res3 => {
                                        expect(res3.body.resetPass).to.be.equal(true);
                                    });
                            }, 200);
                        });
                }, 4000);

            });
        done();
    });

    it('3 > Save Google Social User API[/social/user]: should return saved user',  (done) => {
        chai.request(BASE_URL).post('/social/user')
            .send({
                'provider': 'GOOGLE',
                'email': 'google.user@gmail.com',
                'name': 'Google User',
                'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/23795811_1509315285812305_5394988857322734652_n.jpg?oh=f582ac811088fb5093c6194b6393f506&oe=5AA292BF',
                'token': 'EAAG1g3gEiqoBAESZBjGdmKjmMFWRTNuTBWfhrrY1OV1ZBjtEx99',
                'uid': '1503703613040140'
            })
            .then(res => {
                expect(res.body.google.name).to.be.equal('Google User');
                expect(res.body.google.email).to.be.equal('google.user@gmail.com');
                expect(res.body.google.uid).to.be.equal('1503703613040140');
            });
        done();
    });

    it('4 > Save Facebook Social User API[/social/user]: should return saved user',  (done) => {
        chai.request(BASE_URL).post('/social/user')
            .send({
                'provider': 'FACEBOOK',
                'email': 'facebook.user@example.com',
                'name': 'Facebook User',
                'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/23795811_1509315285812305_5394988857322734652_n.jpg?oh=f582ac811088fb5093c6194b6393f506&oe=5AA292BF',
                'token': 'EAAG1g3gEiqoBAESZBjGdmKjmMFWRTNuTBWfhrrY1OV1ZBjtEx99',
                'uid': '1503703613040141'
            })
            .then(res => {
                expect(res.body.facebook.name).to.be.equal('Facebook User');
                expect(res.body.facebook.email).to.be.equal('facebook.user@example.com');
                expect(res.body.facebook.uid).to.be.equal('1503703613040141');
            });
        done();
    });

    it('5 > Subscribe Local User API[/subscribe]: should return saved user',  (done) => {
        chai.request(BASE_URL).put('/subscribe')
            .send({'email': 'chaman.bharti84@gmail.com'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscription).to.be.equal('Y');
                expect(res.body.local.email).to.be.equal('chaman.bharti84@gmail.com');
            });
        done();
    });

    it('6 > Subscribe Google User API[/subscribe]: should return saved user',  (done) => {
        chai.request(BASE_URL).put('/subscribe')
            .send({'email': 'rahi.akela2009@gmail.com'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscription).to.be.equal('Y');
                expect(res.body.google.email).to.be.equal('rahi.akela2009@gmail.com');
            });
        done();
    });

    it('7 > Subscribe Facebook User API[/subscribe]: should return saved user',  (done) => {
        chai.request(BASE_URL).put('/subscribe')
            .send({'email': 'chaman.bharti@yahoo.in'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscription).to.be.equal('Y');
                expect(res.body.facebook.email).to.be.equal('chaman.bharti@yahoo.in');
            });
        done();
    });

    it('8 > Subscribe Un-Registered User API[/subscribe]: should return subscribed boolean',  (done) => {
        chai.request(BASE_URL).put('/subscribe')
            .send({'email': 'dummy.subscribed.user@example.com'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscribed).to.be.equal(true);
            });
        done();
    });

    it('9 > Unsubscribe Google User API[/unsubscribe]: should return saved user',  (done) => {
        chai.request(BASE_URL).put('/unsubscribe')
            .send({'email': 'rahi.akela2009@gmail.com'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscription).to.be.equal('N');
                expect(res.body.google.email).to.be.equal('rahi.akela2009@gmail.com');
            });
        done();
    });

    it('10 > Unsubscribe Facebook User API[/unsubscribe]: should return saved user',  (done) => {
        chai.request(BASE_URL).put('/unsubscribe')
            .send({'email': 'chaman.bharti@yahoo.in'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscription).to.be.equal('N');
                expect(res.body.facebook.email).to.be.equal('chaman.bharti@yahoo.in');
            });
        done();
    });

    it('11 > Unsubscribe Un-Registered User API[/unsubscribe]: should return subscribed boolean',  (done) => {
        chai.request(BASE_URL).put('/unsubscribe')
            .send({'email': 'dummy.subscribed.user@example.com'})
            .then(res => {
                // console.log('Body:', res.body);
                expect(res.body.subscribed).to.be.equal(true);
            });
        done();
    });
});

