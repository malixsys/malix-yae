express = require("express")
reload = require("reload")
livereload = require("express-livereload")
path = require("path")

htmlDir = path.join(__dirname, "..", "html")
appDir = path.join(htmlDir, "client")
viewsDir = path.join(htmlDir, "server")

app = express()

app.use express.logger("dev")

# Configuration
app.configure ->
  app.set "views", viewsDir
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.static(appDir)
  app.use app.router

routes = require(path.join(__dirname, "routes"))
routes(app)

port = process.env.PORT or 5000
server = require("http").createServer(app)
reload server, app, 1000

server.listen port, ->
  livereload app, config = watchDir: htmlDir
  console.log "Server listening on " + port
