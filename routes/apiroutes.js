var db = require("../db/db.json");
var fs = require("fs");
var express = require("express");
var app = express();

    app.get("/notes", function(req, res) {
        db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(db);
    });

    app.post("/notes", function(req, res) {
        var newNote = {
            id: Math.floor(Math.random() * 100),
            title: req.body.title,
            text: req.body.text
        };
        db.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(db), function(err, res) {
            if (err) {
                throw err;
            }
        });
        res.json(db);
    });

    app.delete("/notes/:id", function(req, res) {
        var undeletedNotes = [];
        for (var i = 0; i < db.length; i++) {
            if (db[i].id != req.params.id) {
                undeletedNotes.push(db[i]);
            }
        }
        db = undeletedNotes;
        fs.writeFileSync("./db/db.json", JSON.stringify(db), function(err, res) {
            if (err) {
                throw err;
            }
        });
        console.log("Delete", db);
        res.json(db);
    });
module.exports = app;