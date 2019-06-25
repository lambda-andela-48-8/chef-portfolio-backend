import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /api/auth/signup', () => {
  it('should return error when required fileds are not provided', (done) => {
    chai.request(server).post('/api/auth/signup')
      .send({ email: 'tunde@mail.com' })
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('please provide required values. email, password and first name are important');
        done();
      });
  });
  it('should create user', (done) => {
    chai.request(server).post('/api/auth/signup')
      .send({ email: 'tunde@mail.com', password: 'secret', firstName: 'tunde' })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should return error when user already exists in the database', (done) => {
    chai.request(server).post('/api/auth/signup')
      .send({ email: 'tunde@mail.com', password: 'secret', firstName: 'tunde' })
      .end((err, res) => {
        expect(res.status).to.eql(409);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('user with this email already exists');
        done();
      });
  });
});
