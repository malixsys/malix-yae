persons = [
  {name: "Mal Reynolds"},
  {name: "Zoe Washburne"},
  {name: "Jayne Cobb"},
  {name: "River Tam"},
  {name: "Shepherd Book"},
  {name: "Inarra Serra"}
]

module.exports.list = (req, res) ->
  res.json(persons)

module.exports.create = (req, res) ->

module.exports.read = (req, res) ->

module.exports.update = (req, res) ->

module.exports.del = (req, res) ->

module.exports.total = (req, res) ->
  res.json
    total: persons.length