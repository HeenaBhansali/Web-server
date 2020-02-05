const users = require("../fixtures/users")

const findUserByCredentials = ({ username, password }) =>
  users.find(user => user.username === username && user.password === password)

const basicAuth = (req, res, next) => {
  const header = req.headers.authorization || ""
  const [type, payload] = header.split(" ")

  console.log(type, payload)
  if (type === "Basic") {
    const credentials = Buffer.from(payload, "base64").toString("ascii")
    const [username, password] = credentials.split(":")

    const user = findUserByCredentials({ username, password })
    console.log(user)

    if (user) {
      req.user = user
    } else {
      res.sendStatus(401)
      return
    }
  }

  next()
}

module.exports = basicAuth
