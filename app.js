// jshint esversion:6
// Express module

const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const mongoose = require("mongoose");

// Serving static files

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose database connection

mongoose.connect("mongodb://localhost:27017/yourBlogDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Schema defenition

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Model defenition 

const Post = mongoose.model("post", postSchema);

// GET and POST requests

// home route

const posts = []

app.get("/", function (req, res) {
    const d = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = d.toLocaleString("en-US", options)

    Post.find({}, function (err, posts) {

        res.render("home", { Post: posts, Date: date });
    })

});

// compose route

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });

}
);

// Requests to the unique post

app.get("/:titleID", function (req, res) {

    const ID = req.params.titleID;
    const d = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = d.toLocaleString("en-US", options)

    Post.findOne({ _id: ID }, function (err, foundPost) {
        if (!err) {
            res.render("viewblogs", { Unique: foundPost, Date: date });
        }
    });
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});