const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000
//app.use(bodyParser.json())

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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
