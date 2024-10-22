const express = require('express');
const { Spotify, Tweet, Instagram } = require('canvafy');
const app = express();
const PORT = 8767;

// Middleware dan pengaturan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Halaman utama
app.get('/', (req, res) => res.render('index'));

// Spotify Card
app.get('/spotify', async (req, res) => {
  const { author, album, title, blur = 0, opacity = 0, timestampCurrent = 0, timestampMax = 0 } = req.query;

  const spotify = await new Spotify()
    .setAuthor(author || "")
    .setAlbum(album || "")
    .setTimestamp(Number(timestampCurrent), Number(timestampMax))
    .setImage("") // Kosong, bisa diatur pengguna nanti
    .setTitle(title || "")
    .setBlur(Number(blur))
    .setOverlayOpacity(Number(opacity))
    .build();

  res.set('Content-Type', 'image/png');
  res.send(spotify.toBuffer());
});

// Twitter Card
app.get('/twitter', async (req, res) => {
  const { theme = 'light', displayName, username, comment, verified = false, avatar } = req.query;

  const tweet = await new Tweet()
    .setTheme(theme)
    .setUser({ displayName: displayName || "", username: username || "" })
    .setVerified(verified === 'true')
    .setComment(comment || "")
    .setAvatar(avatar || "")
    .build();

  res.set('Content-Type', 'image/png');
  res.send(tweet.toBuffer());
});

// Instagram Card
app.get('/instagram', async (req, res) => {
  const { theme = 'light', username, likeCount = 0, likeText, story = false, verified = false, avatar, postImage, liked = false, saved = false } = req.query;

  const instagram = await new Instagram()
    .setTheme(theme)
    .setUser({ username: username || "" })
    .setLike({ count: Number(likeCount), likeText: likeText || "like" })
    .setVerified(verified === 'true')
    .setStory(story === 'true')
    .setAvatar(avatar || "")
    .setPostImage(postImage || "")
    .setLiked(liked === 'true')
    .setSaved(saved === 'true')
    .build();

  res.set('Content-Type', 'image/png');
  res.send(instagram.toBuffer());
});

// Jalankan server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));