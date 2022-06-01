const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();
const port = 3000;

const posts = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

const homeStartingContent =
  "This is a simple NodeJS blog. This app use EJS & Express.";

const aboutContent = `People tend to think that About Us pages have to sound formal to gain credibility and trust. But most people find it easier to trust real human beings, rather than a description that sounds like it came from an automaton. It should always sound friendly and real.
Trying to sound too professional on your About Us page results in stiff, “safe” copy and design — the perfect way to make sure your company blends in with the masses. Instead, take inspiration from Eight Hour Day. This brand showcases the people behind the company and humanizes its brand.`;

app.get("/", (req, res) => {
  res.render(`${__dirname}/views/home`, {
    title: "Home Page",
    paragraph: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render(`${__dirname}/views/about`, { paragraph: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render(`${__dirname}/views/contact`);
});

app.get("/compose", (req, res) => {
  res.render(`${__dirname}/views/compose`);
});

app.get("/posts/:postTitle", (req, res) => {

  const post = posts.find((post) => _.lowerCase(post.title) === _.lowerCase(req.params.postTitle));
  if (post) res.render(`${__dirname}/views/post`, { post: post });
  else res.render(`${__dirname}/views/404`);
});

app.post("/compose", (req, res) => {
  const newPost = { title: req.body.title, content: req.body.content };
  posts.push(newPost);
  res.render(`${__dirname}/views/compose`);
});

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
