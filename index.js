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

const usersRouter = express.Router()

usersRouter.get("/", getUsersRoute)
usersRouter.get("/:id", getUserRoute)

const emailsRouter = express.Router()

emailsRouter.get("/", getEmailsRoute)
emailsRouter.get("/:id", getEmailRoute)
emailsRouter.get("/from/:sender/to/:recipient", getEmailFrom)

app.use("/users", usersRouter)
app.use("/emails", emailsRouter)

app.listen(3000)
