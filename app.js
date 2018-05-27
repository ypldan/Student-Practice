/* eslint-disable no-undef */
const express = require("express");
const processor = require("./server/model.js");
const authorizer = require("./server/user.js");
const crypt = require("bcrypt");
const bodyParser = require("body-parser");
const multer = require("multer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

passport.use(new LocalStrategy(((username, password, done) => {
  if (!authorizer.containsUser(username)) {
    return done(null, false, { message: "Wrong login." });
  }
  const user = authorizer.getUser(username);
  const passwordHash = user.password;
  if (!crypt.compareSync(password, passwordHash)) {
    return done(null, false, { message: "Wrong password." });
  }
  const result = {};
  result.name = user.name;
  result.id = user.id;
  return done(null, result);
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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
app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/getPost", (req, res) => {
  const post = processor.getPost(req.query.id);
  if (post != null) {
    res.send(post);
  } else {
    res.status(404).end("Post not found");
  }
});

app.get("/getAuthors", (req, res) => {
  const set = processor.getAuthorsSet();
  res.send(Array.from(set));
});

app.post("/getPosts", (req, res) => {
  const posts = processor.getPosts(req.query.skip, req.query.top, req.body);
  if (posts.length !== 0) {
    res.send(posts);
  } else {
    res.status(404).end("No posts found.");
  }
});

app.post("/addPost", (req, res) => {
  if (req.user) {
    const post = processor.addPost(req.body);
    if (post != null) {
      res.send(post);
    } else {
      res.status(404)
        .end("Error");
    }
  } else {
    res.status(404).end("Not logged in");
  }
});

app.put("/addLike", (req, res) => {
  if (req.user) {
    const post = processor.addLike(req.query.id, req.body);
    if (post != null) {
      if (post) {
        res.end("added");
      } else {
        res.end("taken");
      }
    } else {
      res.status(404)
        .end("Post not found.");
    }
  } else {
    res.status(404).end("Not logged in");
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
  if (req.user) {
    const post = processor.editPost(req.query.id, req.body);
    if (post != null) {
      res.send(post);
    } else {
      res.status(404)
        .end("Error");
    }
  } else {
    res.status(404).end("Not logged in");
  }
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  if (req.user) {
    const fileName = req.file.filename;
    // fs.writeFile(fileName, req.file.buffer);
    console.log(fileName);
    res.send(`images/${fileName}`);
  } else {
    res.status(404).end("Not logged in");
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user.name);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(404).end();
  return null;
}

app.get("/getUser", ensureAuthenticated, (req, res) => {
  res.send(req.user.username);
});

app.post("/logout", (req, res) => {
  req.logout();
  res.end();
});

// app.post('/login', passport.)

app.listen(3000, () => {
  console.log("Server is running...");
});
