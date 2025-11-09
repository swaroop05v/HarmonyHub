const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

// Create playlist
router.post('/', auth, async (req,res) => {
  try{
    const { title, description, coverImage } = req.body;
    const pl = new Playlist({ userId: req.user.id, title, description, coverImage, songs: [] });
    await pl.save();
    res.json(pl);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Get user's playlists
router.get('/', auth, async (req,res) => {
  try{
    const pls = await Playlist.find({ userId: req.user.id }).populate('songs');
    res.json(pls);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Get single playlist
router.get('/:id', auth, async (req,res) => {
  try{
    const pl = await Playlist.findById(req.params.id).populate('songs');
    res.json(pl);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Add song to playlist
router.post('/:id/songs', auth, async (req,res) => {
  try{
    const { title, artist, url, duration } = req.body;
    const song = new Song({ title, artist, url, duration });
    await song.save();
    const pl = await Playlist.findById(req.params.id);
    pl.songs.push(song._id);
    await pl.save();
    res.json(song);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Remove song
router.delete('/:id/songs/:songId', auth, async (req,res) => {
  try{
    const pl = await Playlist.findById(req.params.id);
    pl.songs = pl.songs.filter(s => s.toString() !== req.params.songId);
    await pl.save();
    await Song.findByIdAndDelete(req.params.songId);
    res.json({ message: 'Removed' });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Update playlist
router.put('/:id', auth, async (req,res) => {
  try{
    const { title, description, coverImage } = req.body;
    const pl = await Playlist.findByIdAndUpdate(req.params.id, { title, description, coverImage }, { new: true });
    res.json(pl);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Delete playlist
router.delete('/:id', auth, async (req,res) => {
  try{
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

module.exports = router;
