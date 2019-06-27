import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import tokenHandler from '../utils/tokenHandler';

const { expect } = chai;
chai.use(chaiHttp);


let userToken;
const userToken2 = tokenHandler.generateToken({ firstName: 'johnny', id: 54354 });
const lunchRecipe = {
  title: 'Buritp',
  mealType: 'Lunch',
  ingredients: ['yam', 'egg', 'chicken'],
  instructions: 'Boil for 2 hours',
};
describe('POST /api/recipe', () => {
  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({ email: 'tunde@mail.com', password: 'secret' })
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('should return error when token is not passed along request', (done) => {
    chai.request(server)
      .post('/api/recipe')
      .send({})
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('Unathorized, token must be provided');
        done();
      });
  });
  it('should return error when required values are not passed along with request', (done) => {
    chai.request(server)
      .post('/api/recipe')
      .send({})
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('please provide values for title, mealType and ingredients');
        done();
      });
  });
  it('should return error when user does not exist', (done) => {
    chai.request(server)
      .post('/api/recipe')
      .set('authorization', userToken2)
      .send(lunchRecipe)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('chef does not exist');
        done();
      });
  });
  it('should save recipe successfully', (done) => {
    chai.request(server)
      .post('/api/recipe')
      .set('authorization', userToken)
      .send(lunchRecipe)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('chefName');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('mealType');
        expect(res.body.data).to.have.property('ingredients');
        expect(res.body.data).to.have.property('instructions');
        done();
      });
  });
});

describe('GET api/recipe', () => {
  it('should return all recipes', (done) => {
    chai.request(server)
      .get('/api/recipe')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('title');
        expect(res.body.data[0]).to.have.property('chefName');
        expect(res.body.data[0]).to.have.property('mealType');
        done();
      });
  });
});

describe('GET /api/recipe/:recipeId', () => {
  it('should return error when recipe is not found', (done) => {
    chai.request(server)
      .get(`/api/recipe/${99}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        console.log('TCL: res.status', res.status);
        // expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('recipe not found');
        done();
      });
  });
  it('should return the found recipe', (done) => {
    chai.request(server)
      .get(`/api/recipe/${1}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('chefName');
        expect(res.body.data).to.have.property('title');
        expect(res.body.data).to.have.property('mealType');
        done();
      });
  });
});
