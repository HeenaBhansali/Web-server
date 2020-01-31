const http = require("http")

const server = http.createServer((req, res) => {
  console.log("request", req)
  console.log("response", res)
  const route = req.method + " " + req.url
  res.end("You asked for " + route)
})

server.listen(3000)
