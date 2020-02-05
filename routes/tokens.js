const express = require("express")
const bodyParser = require("body-parser")
const findUser = require("../lib/find-user")
const jwt = require("jsonwebtoken")

const signature = "1m_s3cure"

const createToken = user =>
  jwt.sign({ userId: user.id }, signature, { expiresIn: "7d" })

const createTokenRoute = (req, res) => {
  const credentials = req.body
  const user = findUser.byCredentials(credentials)
  console.log(user)

  if (user) {
    const token = createToken(user)
    console.log(token)
    res.status(201)
    res.send(token)
  } else {
    res.sendStatus(422)
  }
}

const tokensRouter = express.Router()

tokensRouter.post("/", bodyParser.json(), createTokenRoute)

module.exports = tokensRouter
