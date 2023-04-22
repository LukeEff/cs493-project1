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



app.get('/:id', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
