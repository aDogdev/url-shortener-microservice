require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

let urlDatabase = [];
let counter = 1;

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  try {
    const urlObj = new URL(originalUrl);

    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return res.json({ error: "invalid url" });
    }

    dns.lookup(urlObj.hostname, (err) => {
      if (err) return res.json({ error: "invalid url" });

      const existing = urlDatabase.find(
        (entry) => entry.original_url === originalUrl
      );
      if (existing) return res.json(existing);

      const newEntry = {
        original_url: originalUrl,
        short_url: counter,
      };

      urlDatabase.push(newEntry);
      counter++;
      res.json(newEntry);
    });
  } catch (error) {
    res.json({ error: "invalid url" });
  }
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = parseInt(req.params.short_url);
  const entry = urlDatabase.find((entry) => entry.short_url === shortUrl);

  entry
    ? res.redirect(entry.original_url)
    : res.json({ error: "Short URL not found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
