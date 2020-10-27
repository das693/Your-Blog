// jshint esversion:6
// Express module

const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const lodash = require("lodash");

// Serving static files

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// GET and POST requests

// home route

const posts = []

app.get("/", function (req, res) {
    const d = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = d.toLocaleString("en-US", options)
    res.render("home", { Post: posts, Date: date });
});

// compose route

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {

    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);

    res.redirect("/")
});

// Requests to the unique post

app.get("/:title", function (req, res) {

    const titleID = req.params.title;
    const d = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = d.toLocaleString("en-US", options)

    for (i = 0; i < posts.length; i++) {
        if (titleID === posts[i].title) {
            res.render("viewblogs", { Unique: posts[i], Date: date });
        }
    }

});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});