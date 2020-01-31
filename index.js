const express = require("express")
const users = require("./fixtures/users")
const emails = require("./fixtures/emails")

const app = express()

const getUsersRoute = (req, res) => {
  res.send(users)
}

const getEmailsRoute = (req, res) => {
  res.send(emails)
}

app.use((req, res) => {
  const route = req.method + " " + req.url
  req.accepts("text/csv")
  if (route === "GET /users") {
    res.send(users)
  } else if (route === "GET /emails") {
    res.send(emails)
  } else {
    res.end("You asked for " + route)
  }
})

app.listen(3000)
