import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/discussionForum', {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
	console.log('mongoose connected.')
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
