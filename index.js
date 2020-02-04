const express = require("express")
const logger = require("./lib/logger")
const compress = require("compression")
const serveStatic = require("serve-static")
const path = require("path")

const usersRouter = require("./routes/users")
const emailsRouter = require("./routes/emails")

const app = express()

app.use(logger)
app.use(compress())
app.use(serveStatic(path.join(__dirname, "./public")))
app.use("/uploads", serveStatic(path.join(__dirname, "uploads")))
app.use("/users", usersRouter)
app.use("/emails", emailsRouter)

app.listen(3000)
