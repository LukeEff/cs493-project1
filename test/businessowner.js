var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var app = require('../app/app.js');

let createdBusiness = {};
let createdReview = {};
let createdPhoto = {};

describe('Endpoints', function() {
  beforeEach(function () {
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
    }, function (error, response, body) {
      createdBusiness = JSON.parse(body);
    }, 10000);
  });
  describe('Businesses', function () {
    describe('Business Owner', function () {
      it('should create a new business', function () {
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
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).businessName).to.equal(businessName);
          createdBusiness = JSON.parse(body);
        }, 10000);
      });
      it('should update a business', function () {
        const url = 'http://localhost:3000/businesses/edit/' + createdBusiness.businessUuid;
        const businessName = 'Test Business 2';
        request.patch({
          url: url,
          body: JSON.stringify({businessName: businessName}),
          headers: {'Content-Type': 'application/json'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).businessName).to.equal(businessName);
        });
      });
      it('should delete a business', function () {
        const url = 'http://localhost:3000/businesses/delete/' + createdBusiness.businessUuid;
        request.delete(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
        }, 10000);
      });
    });
    describe('Business User', function () {
      it('should list all businesses', function () {
        const url = 'http://localhost:3000/businesses';
        request.get(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.be.an('array');
        }, 10000);
      });
      it('should list a business', function () {
        const url = 'http://localhost:3000/businesses/' + createdBusiness.businessUuid;
        request.get(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.be.an('object');
        }, 10000);
      });
    });
  });
  describe('Reviews', function () {
    describe('Users', function () {
      it('should create a new review', function () {
        const url = 'http://localhost:3000/reviews/create';
        const businessUuid = createdBusiness.businessUuid;
        const userUuid = '12345';
        const starRating = 5;
        const moneyRating = 5;
        const writtenReview = 'Test Review';
        const reviewObj = {
          businessUuid: businessUuid,
          userUuid: userUuid,
          starRating: starRating,
          moneyRating: moneyRating,
          writtenReview: writtenReview
        };
        request.post({
          url: url,
          body: JSON.stringify(reviewObj),
          headers: {'Content-Type': 'application/json'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).businessUuid).to.equal(businessUuid);
          createdReview = JSON.parse(body);
        }, 10000);
      });
      it('should update a review', function () {
        const url = 'http://localhost:3000/reviews/edit/' + createdReview.reviewUuid;
        const starRating = 1;
        request.patch({
          url: url,
          body: JSON.stringify({
            starRating: starRating
          }),
          headers: {'Content-Type': 'application/json'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).starRating).to.equal(starRating);
        }, 10000);
      });
      it('should delete a review', function () {
        const url = 'http://localhost:3000/reviews/delete/' + createdReview.reviewUuid;
        request.delete(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
        }, 10000);
      });
      it ('should list all reviews', function () {
        // userUuid is a query param
        const userUuid = '12345';
        const url = 'http://localhost:3000/reviews?userUuid=' + userUuid;
        request.get(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.be.an('array');
        });
      });
    });
  });
  describe('Photos', function () {
    describe('Users', function () {
      it('should create a new photo', function () {
        const url = 'http://localhost:3000/photos/create';
        const businessUuid = createdBusiness.businessUuid;
        const userUuid = '12345';
        const photoUrl = 'www.test.com';
        const photoObj = {
          businessUuid: businessUuid,
          userUuid: userUuid,
          photoUrl: photoUrl
        };
        request.post({
          url: url,
          body: JSON.stringify(photoObj),
          headers: {'Content-Type': 'application/json'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).businessUuid).to.equal(businessUuid);
          createdPhoto = JSON.parse(body);
        }, 10000);
      });
      it('should list all photos', function () {
        const userUuid = '12345';
        const url = 'http://localhost:3000/photos?userUuid=' + userUuid;
        request.get(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.be.an('array');
        }, 10000);
      });
      it('should list all photos for a business', function () {
        const businessUuid = createdBusiness.businessUuid;
        const url = 'http://localhost:3000/photos?businessUuid=' + businessUuid;
        request.get(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.be.an('array');
        }, 10000);
      });
      it('should update the caption of a photo', function () {
const url = 'http://localhost:3000/photos/edit/' + createdPhoto.photoUuid;
        const caption = 'Test Caption';
        request.patch({
          url: url,
          body: JSON.stringify({caption: caption}),
          headers: {'Content-Type': 'application/json'}
        }, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).caption).to.equal(caption);
        }, 10000);
      });
      it('should delete a photo', function () {
        const url = 'http://localhost:3000/photos/delete/' + createdPhoto.photoUuid;
        request.delete(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
        }, 10000);
      });
    });
  });
});
