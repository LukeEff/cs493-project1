const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000

global.crypto = require('crypto')


/**
 * Business owner endpoints
 */
let businesses = {}

// Create a new business
app.post('/businesses/create', (req, res) => {
  const businessName = req.body.businessName
  const streetAddress = req.body.streetAddress
  const city = req.body.city
  const state = req.body.state
  const zipCode = req.body.zipCode
  const businessPhoneNum = req.body.businessPhoneNum
  const businessEmail = req.body.businessEmail
  const category = req.body.category
  const website = req.body.website
  const ownerId = req.body.ownerId
  const businessUuid = crypto.randomUUID()
  businesses[businessUuid] = {
    businessName: businessName,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipCode: zipCode,
    businessPhoneNum: businessPhoneNum,
    businessEmail: businessEmail,
    category: category,
    website: website,
    ownerId: ownerId,
    businessUuid: businessUuid
  }
  res.send(businesses[businessUuid])
})

// Update a business
app.patch('/businesses/edit/:businessUuid', (req, res) => {
  const businessUuid = req.params.businessUuid
  const prevBusiness = businesses[businessUuid]
  if (!prevBusiness) {
    res.status(404).send('Business not found')
    return
  }
  const businessName = req.body.businessName || prevBusiness.businessName
  const streetAddress = req.body.streetAddress || prevBusiness.streetAddress
  const city = req.body.city || prevBusiness.city
  const state = req.body.state || prevBusiness.state
  const zipCode = req.body.zipCode || prevBusiness.zipCode
  const businessPhoneNum = req.body.businessPhoneNum || prevBusiness.businessPhoneNum
  const businessEmail = req.body.businessEmail || prevBusiness.businessEmail
  const category = req.body.category || prevBusiness.category
  const website = req.body.website || prevBusiness.website
  businesses[businessUuid] = {
    businessName: businessName,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipCode: zipCode,
    businessPhoneNum: businessPhoneNum,
    businessEmail: businessEmail,
    category: category,
    website: website,
    ownerId: prevBusiness.ownerId,
    businessUuid: prevBusiness.businessUuid
  }

  res.send(businesses[businessUuid])
});

// Delete a business
app.delete('/businesses/delete/:businessUuid', (req, res) => {
  const businessUuid = req.params.businessUuid
  const business = businesses[businessUuid]
  if (!business) {
    res.status(404).send('Business not found')
    return
  }
  delete businesses[businessUuid]
  res.send(business)
});

/**
 * Business endpoints for users
 */
// List businesses
app.get('/businesses', (req, res) => {
  const page = req.query.page || 0
  const pageSize = 10
  const pageOfBusinesses = Object.values(businesses).slice(page * pageSize, (page + 1) * pageSize)
  res.send(pageOfBusinesses)
});

// List details of a business
app.get('/businesses/:businessUuid', (req, res) => {
  const businessUuid = req.params.businessUuid
  const business = businesses[businessUuid]
  res.send(business)
});

/**
 * Review endpoints for users
 */
let reviews = {}

// Create a new review
// TODO - add userUuid and do not allow users to review the same business twice
app.post('/reviews/create', (req, res) => {
  const businessUuid = req.body.businessUuid
  const starRating = req.body.starRating
  const moneyRating = req.body.moneyRating
  const writtenReview = req.body.writtenReview || ''

  if (!businesses[businessUuid]) {
    res.status(404).send('Business not found')
    return
  }
  if (!starRating || !moneyRating) {
    res.status(400).send('Star rating and money rating are required')
    return
  }
  if (starRating < 1 || starRating > 5) {
    res.status(400).send('Star rating must be between 1 and 5')
    return
  }
  if (moneyRating < 1 || moneyRating > 5) {
    res.status(400).send('Money rating must be between 1 and 5')
    return
  }
  const reviewUuid = crypto.randomUUID()
  reviews[reviewUuid] = {
    businessUuid: businessUuid,
    starRating: starRating,
    moneyRating: moneyRating,
    writtenReview: writtenReview,
    reviewUuid: reviewUuid
  }
  res.send(reviews[reviewUuid])
})

// List all reviews with a filter
app.get('/reviews', (req, res) => {
  const page = req.query.page || 0
  const businessUuid = req.query.businessUuid
  const userUuid = req.query.userUuid
  if (!userUuid && !businessUuid) {
    res.status(400).send('Must provide either a businessUuid or userUuid')
    return
  }
  const pageSize = 10
  const pageOfReviews = Object.values(reviews).filter(review => {
    if (businessUuid) {
      return review.businessUuid === businessUuid
    }
    if (userUuid) {
      return review.userUuid === userUuid
    }
  }).slice(page * pageSize, (page + 1) * pageSize);

  res.send(pageOfReviews)
});

// Update a review
app.patch('/reviews/edit/:reviewUuid', (req, res) => {
  const reviewUuid = req.params.reviewUuid
  const prevReview = reviews[reviewUuid]
  if (!prevReview) {
    res.status(404).send('Review not found')
    return
  }
  const starRating = req.body.starRating || prevReview.starRating
  const moneyRating = req.body.moneyRating || prevReview.moneyRating
  const writtenReview = req.body.writtenReview || prevReview.writtenReview
  reviews[reviewUuid] = {
    businessUuid: prevReview.businessUuid,
    starRating: starRating,
    moneyRating: moneyRating,
    writtenReview: writtenReview,
    reviewUuid: prevReview.reviewUuid
  }
  res.send(reviews[reviewUuid])
});

// Delete a review
app.delete('/reviews/delete/:reviewUuid', (req, res) => {
  const reviewUuid = req.params.reviewUuid
  const review = reviews[reviewUuid]
  if (!review) {
    res.status(404).send('Review not found')
    return
  }
  delete reviews[reviewUuid]
  res.send(review)
});

/**
 * Photo endpoints for users
 */
let photos = {}

// Add a photo to a business
app.post('/photos/create', (req, res) => {
  const businessUuid = req.body.businessUuid
  const photoUrl = req.body.photoUrl
  const userUuid = req.body.userUuid
  if (!businesses[businessUuid]) {
    res.status(404).send('Business not found')
    return
  }
  if (!photoUrl) {
    res.status(400).send('Photo URL is required')
    return
  }
  if (!userUuid) {
    res.status(400).send('User UUID is required')
    return
  }

  const photoUuid = crypto.randomUUID()
  photos[photoUuid] = {
    businessUuid: businessUuid,
    photoUrl: photoUrl,
    photoUuid: photoUuid,
    userUuid: userUuid
  }
  res.send(photos[photoUuid])
});

// List all photos with a filter
app.get('/photos', (req, res) => {
  const page = req.query.page || 0
  const businessUuid = req.query.businessUuid
  const userUuid = req.query.userUuid
  if (!userUuid && !businessUuid) {
    res.status(400).send('Must provide either a businessUuid or userUuid')
    return
  }
  const pageSize = 10
  const pageOfPhotos = Object.values(photos).filter(photo => {
    if (businessUuid && userUuid) {
      return photo.businessUuid === businessUuid && photo.userUuid === userUuid
    }
    if (businessUuid) {
      return photo.businessUuid === businessUuid
    }
    if (userUuid) {
      return photo.userUuid === userUuid
    }
  }).slice(page * pageSize, (page + 1) * pageSize);

  res.send(pageOfPhotos)
});

// Delete a photo
app.delete('/photos/delete/:photoUuid', (req, res) => {
  const photoUuid = req.params.photoUuid
  const photo = photos[photoUuid]
  if (!photo) {
    res.status(404).send('Photo not found')
    return
  }
  delete photos[photoUuid]
  res.send(photo)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
