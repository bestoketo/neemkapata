const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Comment schema and model
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

// Routes
app.post('/comments', async (req, res) => {
    const { name, comment } = req.body;
    const newComment = new Comment({ name, comment });
    await newComment.save();
    res.status(201).send(newComment);
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.status(200).send(comments);
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
