const expect = require('expect.js');
const fixtures = require('./fixtures');

function test(what, t) {
  describe(what, () => {
    it('index', t(require('../')[what]));
    it('direct', t(require('../' + what)));
  });
}

describe('single', () => {

  test('js2tmx', (fn) => (done) => {
    fn(fixtures.example.js, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example.tmx);
      done();
    });
  });

  test('tmx2js', (fn) => (done) => {
    fn(fixtures.example.tmx, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example.js);
      done();
    });
  });

});

describe('no namespace', () => {

  test('js2tmx', (fn) => (done) => {
    fn(fixtures.example_no_ns.js, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_no_ns.tmx);
      done();
    });
  });

  test('tmx2js', (fn) => (done) => {
    fn(fixtures.example_no_ns.tmx, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_no_ns.js);
      done();
    });
  });

});

describe('multi', () => {

  test('js2tmx', (fn) => (done) => {
    fn(fixtures.example_multi.js, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_multi.tmx);
      done();
    });
  });

  test('tmx2js', (fn) => (done) => {
    fn(fixtures.example_multi.tmx, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_multi.js);
      done();
    });
  });

});
