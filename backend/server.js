const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Mongoose models ---
const User = require('./models/User');
const Playlist = require('./models/Playlist');
const Song = require('./models/Song');

// --- Routes ---
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlists');
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

app.get('/', (req, res) => res.send('HarmonyHub backend is running'));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/harmonyhub');
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  } catch (err) {
    console.error(err);
  }
}

start();
