  
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
    let note = req.body
    notes.push(note);
  
    writeFileAsync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    .then(() => {
      res.json(note);
    })
  });
};