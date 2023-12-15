const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Enable JSON parsing for POST requests
app.use(express.json());

const bookmarksFilePath = path.join(__dirname, 'bookmarks.json');

function readBookmarks() {
    try {
        const bookmarksData = fs.readFileSync(bookmarksFilePath, 'utf8');
        return JSON.parse(bookmarksData);
    } catch (error) {
        return [];
    }
}

function writeBookmarks(bookmarks) {
    const bookmarksData = JSON.stringify(bookmarks, null, 2);
    fs.writeFileSync(bookmarksFilePath, bookmarksData, 'utf8');
}

app.get('/bookmarks', (req, res) => {
    const bookmarks = readBookmarks();
    res.json(bookmarks);
});

app.post('/bookmarks', (req, res) => {
  const { city } = req.body;
  if (city && typeof city === 'string') {
      const existingBookmarks = readBookmarks();
      if (!existingBookmarks.includes(city)) {
          existingBookmarks.push(city);
          writeBookmarks(existingBookmarks);
          res.status(200).send('Bookmark added successfully.');
      }
    }
});


app.delete('/bookmarks', express.json(), (req, res) => {
  const { city } = req.body;
  if (city && typeof city === 'string') {
      const existingBookmarks = readBookmarks();
      const index = existingBookmarks.indexOf(city);
      if (index !== -1) {
          existingBookmarks.splice(index, 1);
          writeBookmarks(existingBookmarks);
          res.status(200).send('Bookmark removed successfully.');
      } 
  } 
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});