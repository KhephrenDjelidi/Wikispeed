import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Ajoute l'import du package cors
import Article from './Articles.js';

const app = express();

// Activer CORS pour toutes les origines
app.use(cors());

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://Server:PAitDBovuYfZKInh@qdcloud.8xeyc.mongodb.net/?retryWrites=true&w=majority&appName=QDcloud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion à MongoDB réussie'))
.catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// Route pour récupérer la popularité de l'article
app.get("/articles", async (req, res) => {
  try {
    const { title } = req.query;

    let query = {};
    let result = {};

    // Recherche de l'article spécifique avec le titre fourni
    if (title) {
      query = { title: { $regex: new RegExp(title, 'i') } }; // Recherche insensible à la casse
    }

    // Recherche de l'article avec le titre spécifié
    const article = await Article.find(query);

    if (article.length > 0) {
      result.articlePopularity = article[0].popular;
    } else {
      result.articlePopularity = null; // Si l'article n'est pas trouvé
    }

    // Recherche du premier article dans la collection
    const firstArticle = await Article.findOne(); // Trouve le premier article de la collection
    if (firstArticle) {
      result.firstArticlePopularity = firstArticle.popular;
    } else {
      result.firstArticlePopularity = null; // Si la collection est vide
    }

    // Renvoie les résultats avec la popularité des deux articles
    res.json(result);
  } catch (err) {
    console.error("❌ Erreur GET /articles :", err);
    res.status(500).json({ message: "Erreur lors de la recherche de popularité", error: err });
  }
});

// Lancer le serveur
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 API Popularité en ligne sur http://localhost:${port}`);
});
