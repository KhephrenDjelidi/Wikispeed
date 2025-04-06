// WikiArticle.js
import mongoose from 'mongoose';

const wikiArticleSchema = new mongoose.Schema({
    title: String,
    abstract: String,
    links: [String]
});

export default mongoose.model('WikiArticle', wikiArticleSchema);
