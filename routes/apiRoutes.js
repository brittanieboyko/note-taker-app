  
const notes = require("../db/db");
const fs = require("fs");
const util = require("util")
const path = require("path")

const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    notes.push(req.body);
    res.json(req.body)
  });
};
