const request = require('supertest');
const chai = require('chai');

const assert = chai.assert;

describe('loading the application', function () {
    var server;
    beforeEach(function () {
        require('../bootstrap');
        server = app.server
    });

    afterEach(function () {
        app.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
});