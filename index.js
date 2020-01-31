const express = require("express")
const users = require("./fixtures/users")
const emails = require("./fixtures/emails")

const app = express()

const getUsersRoute = (req, res) => {
  res.send(users)
}

const getUserRoute = (req, res) => {
  const user = users.find(user => user.id === req.params.id)
  res.send(user)
}

const getEmailsRoute = (req, res) => {
  res.send(emails)
}

const getEmailRoute = (req, res) => {
  const email = emails.find(email => email.id === req.params.id)
  res.send(email)
}

const getEmailFrom = (req, res) => {
  const email = emails.find(
    email =>
      email.from === req.params.sender && email.to === req.params.recipient
  )
  res.send(email)
}

const router = express.Router()

router.get("/users", getUsersRoute)
router.get("/users/:id", getUserRoute)
router.get("/emails", getEmailsRoute)
router.get("/emails/:id", getEmailRoute)
router.get("/emails/from/:sender/to/:recipient", getEmailFrom)

app.use(router)

app.listen(3000)
