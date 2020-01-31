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

const routes = {
  "GET /users": getUsersRoute,
  "GET /emails": getEmailsRoute
}

const noRouteFound = (req, res) => {
  const route = req.method + " " + req.url
  res.end("You asked for " + route)
}

app.use((req, res) => {
  const route = req.method + " " + req.url
  const handler = routes[route] || noRouteFound

  handler(req, res)
})

app.listen(3000)
