import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Ajoute l'import du package cors
import Article from './Articles.js';
import { exec } from "child_process";




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


app.get("/solve", (req, res) => {
  const { start_id, target_id } = req.query;

  // Vérifie si start_id et target_id sont fournis
  if (!start_id || !target_id) {
      return res.status(400).send("start_id and target_id are required.");
  }

  // Échapper les parenthèses et autres caractères spéciaux en les mettant entre guillemets
  const escapedStartId = `"${start_id}"`; // Utilise des guillemets autour de start_id
  const escapedTargetId = `"${target_id}"`; // Utilise des guillemets autour de target_id

  // Exécuter le script Python en passant les paramètres start_id et target_id
  exec(`python3 solver.py ${escapedStartId} ${escapedTargetId}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send(`Error: ${error.message}`);
      }
      if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).send(`stderr: ${stderr}`);
      }

      // Traite la sortie du script Python
      const output = stdout.split("\n");
      const distance = output[0].replace("Distance:", "").trim();
      const path = output[1].replace("Path:", "").trim();

      // Renvoie la réponse JSON avec la distance et le chemin
      res.json({ distance, path });
  });
});


// Lancer le serveur
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 API Popularité en ligne sur http://localhost:${port}`);
});

