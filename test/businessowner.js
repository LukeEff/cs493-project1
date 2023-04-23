var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var app = require('../app/app.js');

describe('Business Owner', function() {
  describe('List businesses owned by a user', function() {
    it('should return a list of businesses owned by a user', function() {

    });
  });
  describe('Create a new business', function() {
    it('should create a new business', function() {
      const url = 'http://localhost:3000/businesses/create';
      const businessName = 'Test Business';
      const streetAddress = '123 Test St';
      const city = 'Test City';
      const state = 'Test State';
      const zipCode = '12345';
      const businessPhoneNum = '123-456-7890';
      const businessEmail = 'test@test.com';
      const category = 'Test Category';
      const website = 'www.test.com';
      const ownerUuid = '12345';
      const business = {
        businessName: businessName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        businessPhoneNum: businessPhoneNum,
        businessEmail: businessEmail,
        category: category,
        website: website,
        ownerUuid: ownerUuid
      };
      request.post({
        url: url,
        body: JSON.stringify(business),
        headers: {'Content-Type': 'application/json'}
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).businessName).to.equal(businessName);
      }, 10000);
    });
  });
});