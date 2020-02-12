  
const notes = require('../db/db');

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

};