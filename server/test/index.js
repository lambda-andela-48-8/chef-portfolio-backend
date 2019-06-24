import chai from 'chai';

const { expect } = chai;
describe('it should test mocha', () => {
  it('test addition', (done) => {
    expect(2 + 2).to.eql(4);
    done();
  });
});
