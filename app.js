const express = require('express');
const processor=require('./server/model.js');
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/getPost', (req, res) => {
    let post = processor.getPost(req.query.id);
    if (post!=null) {
        res.end(JSON.stringify(post));
    } else {
        res.status(404).end("Post not found");
    }
});

app.post("/getPosts", (req, res) => {
    let posts=processor.getPosts(req.query.skip, req.query.top, req.body);
    if (posts.length!==0) {
        res.end(JSON.stringify(posts));
    } else {
        res.status(404).end("No posts found.");
    }
});

app.post("/addPost", (req, res) => {
    let post = processor.addPost(req.body);
    if (post!=null) {
        res.end(JSON.stringify(post));
    } else {
        res.status(404).end("Error");
    }
});

app.put("/addLike", (req, res) => {
    let post=processor.addLike(req.query.id, req.body);
    if (post!=null) {
        if (post) {
            res.end("Like has been added.");
        } else {
            res.end("Like has been taken.");
        }
    } else {
        res.status(404).end("Post not found.");
    }
});

app.delete("/removePost", (req, res) => {
    let post=processor.removePost(req.query.id);
    if (post) {
        res.end("Post is deleted.");
    } else {
        res.status(404).end("Post not found");
    }
});

app.put("/editPost", (req, res) => {
    let post=processor.editPost(req.query.id, req.body);
    if (post!=null) {
        res.end(JSON.stringify(post));
    } else {
        res.status(404).end("Error");
    }
});

app.listen(3000, () => {
    console.log('Server is running...');
});