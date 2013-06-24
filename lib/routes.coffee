path = require("path")

module.exports = (app) ->
  persons = require(path.join(__dirname, 'models','persons'))

  #app.engine('html', require('ejs').renderFile);
  app.get "/", (request, response) ->
    response.render "anonymous"

  app.get('/api/persons', persons.list)

  app.get('/api/persons/total', persons.total) #placement matters

  app.get('/api/persons/:id', persons.read) #sometimes called 'show'
  app.post('/api/persons', persons.create)
  app.put('/api/persons/:id', persons.update)
  app.del('/api/persons/:id', persons.del)
