const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())

/**
 * Business owner endpoints
 */
var businesses = {}

// List businesses owned by a user
app.get('/businesses', (req, res) => {
  const ownerId = req.query.ownerId
})

// Create a new business
app.post('/businesses', (req, res) => {
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


app.get('/:id', (req, res) => {
  res.send('Hello World!')
})

app.post('/post', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
