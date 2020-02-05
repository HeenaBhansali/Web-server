const requireAuth = (req, res, next) => {
  if (req.user) {
    console.log("next req", req.next)
    next()
  } else {
    console.log("failed status")
    res.sendStatus(401)
  }
}

module.exports = requireAuth
