const express = require("express")
const emails = require("../fixtures/emails")
const readBody = require("../lib/read-body")

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

const createEmailRoute = async (req, res) => {
  const body = await readBody(req)
  const newEmail = JSON.parse(body)
  emails.push(newEmail)
}

const emailsRouter = express.Router()

emailsRouter.get("/", getEmailsRoute)
emailsRouter.get("/:id", getEmailRoute)
emailsRouter.get("/from/:sender/to/:recipient", getEmailFrom)
emailsRouter.post("/", createEmailRoute)

module.exports = emailsRouter
