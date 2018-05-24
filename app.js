const express = require("express");
const processor = require("./server/model.js");

const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/public/images/`);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  },
});

const upload = multer({ storage });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getPost", (req, res) => {
  const post = processor.getPost(req.query.id);
  if (post != null) {
    res.end(JSON.stringify(post));
  } else {
    res.status(404).end("Post not found");
  }
});

app.post("/getPosts", (req, res) => {
  const posts = processor.getPosts(req.query.skip, req.query.top, req.body);
  if (posts.length !== 0) {
    res.end(JSON.stringify(posts));
  } else {
    res.status(404).end("No posts found.");
  }
});

app.post("/addPost", (req, res) => {
  const post = processor.addPost(req.body);
  if (post != null) {
    res.end(JSON.stringify(post));
  } else {
    res.status(404).end("Error");
  }
});

app.put("/addLike", (req, res) => {
  const post = processor.addLike(req.query.id, req.body);
  if (post != null) {
    if (post) {
      res.end("added");
    } else {
      res.end("taken");
    }
  } else {
    res.status(404).end("Post not found.");
  }
});

app.delete("/removePost", (req, res) => {
  const post = processor.removePost(req.query.id);
  if (post) {
    res.end("Post is deleted.");
  } else {
    res.status(404).end("Post not found");
  }
});

app.put("/editPost", (req, res) => {
  const post = processor.editPost(req.query.id, req.body);
  if (post != null) {
    res.end(JSON.stringify(post));
  } else {
    res.status(404).end("Error");
  }
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  const fileName = req.file.filename;
  // fs.writeFile(fileName, req.file.buffer);
  console.log(fileName);
  res.send(`images/${fileName}`);
});

app.listen(3000, () => {
  console.log("Server is running...");
});
