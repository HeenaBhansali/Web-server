const express = require("express")
const emails = require("../fixtures/emails")
const generateId = require("../lib/generate-id")
const bodyParser = require("body-parser")
const path = require("path")
const multer = require("multer")
const requireAuth = require("../lib/require-auth")

const upload = multer({ dest: path.join(__dirname, "../uploads") })

class NotFound extends Error {
  constructor(message) {
    super(message)
    this.name = "Not Found"
  }
}

const getEmailsRoute = (req, res) => {
  res.send(emails)
}

const getEmailRoute = (req, res) => {
  const email = emails.find(email => email.id === req.params.id)
  if (!email) {
    throw new NotFound()
  }
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
  const attachments = (req.files || []).map(file => "/uploads/" + file.filename)
  const newEmail = { id: generateId(), ...req.body, attachments }
  emails.push(newEmail)
  res.status(201)
  res.send(newEmail)
}

const updateEmailRoute = async (req, res) => {
  const email = emails.find(email => email.id === req.params.id)
  Object.assign(email, req.body)
  res.status(200)
  res.send(email)
}

const deleteEmailRoute = async (req, res) => {
  const index = emails.find(email => email.id === req.params.id)
  emails.splice(index, 1)
  res.sendStatus(204)
}

const emailsRouter = express.Router()

emailsRouter.use(requireAuth)
emailsRouter
  .route("/")
  .get(getEmailsRoute)
  .post(bodyParser.json(), upload.array("attachments"), createEmailRoute)

emailsRouter
  .route("/:id")
  .get(getEmailRoute)
  .patch(bodyParser.json(), updateEmailRoute)
  .delete(deleteEmailRoute)

emailsRouter.route("/from/:sender/to/:recipient").get(getEmailFrom)
module.exports = emailsRouter
