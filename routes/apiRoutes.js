const notes = require("../db/db");
const fs = require("fs");
const util = require("util")
const path = require("path")

const writeFileAsync = util.promisify(fs.writeFile);

const assignId = (array) => {
  let idCounter = 0;
  array.forEach(element => {
    element.id = idCounter++
  });
}


module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    let note = req.body
    notes.push(note);
    assignId(notes);
  
    writeFileAsync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    .then(() => {
      res.json(note);
    })
  });

  app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    notes.splice(id, 1);
    assignId(notes);

    writeFileAsync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes))
    .then(() => {
      res.json(id);
    })
  });
};
