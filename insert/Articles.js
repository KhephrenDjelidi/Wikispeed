// Articles.js
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  popular: Number,
}, { collection: 'Popularity' }); // Assure-toi que Mongoose utilise la collection 'popularity'

const Article = mongoose.model('Popularity', articleSchema, 'Popularity'); // Assure-toi que Mongoose utilise la collection 'popularity'
export default Article;
