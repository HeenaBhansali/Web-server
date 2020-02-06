const jwt = require("jsonwebtoken")
const users = require("../fixtures/users")
const signature = "1m_s3cure"

const findUserByToken = ({ userId }) => users.find(user => user.id === userId)

const tokenAuth = (req, res, next) => {
  const header = req.headers.authorization || ""
  const [type, token] = header.split(" ")

  if (type === "Bearer") {
    const payload = jwt.verify(token, signature)

    console.log("payload", payload)

    const user = findUserByToken(payload)
    if (user) {
      req.user = user
    } else {
      res.sendStatus(401)
      return
    }
  }

  next()
}

module.exports = tokenAuth
