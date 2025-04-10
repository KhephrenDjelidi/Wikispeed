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

// Assure-toi que la sortie soit bien encodée en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/solve", (req, res) => {
  const { start_id, target_id } = req.query;

  if (!start_id || !target_id) {
    return res.status(400).send("start_id and target_id are required.");
  }

  const escapedStartId = `"${start_id}"`;
  const escapedTargetId = `"${target_id}"`;

  // Lancer le script Python et récupérer la sortie JSON
  exec(
    `python3 solver.py ${escapedStartId} ${escapedTargetId}`,
    { encoding: "utf8" }, // Assurer l'UTF-8 pour stdout
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send(`Error: ${error.message}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send(`stderr: ${stderr}`);
      }

      try {
        // Exemple de stdout : "Distance: 3\nPath: ['Paris', 'Station F', 'OpenAI', 'ChatGPT']"
        const lines = stdout.trim().split('\n');
        const data = {};

        lines.forEach(line => {
          const [key, value] = line.split(/:\s(.+)/); // Split en gardant ce qu’il y a après ": " comme valeur
          if (key === 'Distance') {
            data.Distance = parseInt(value);
          } else if (key === 'Path') {
            data.Path = JSON.parse(value.replace(/'/g, '"')); // Remplace les quotes simples par doubles pour JSON.parse
          }
        });

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.json(data);
      } catch (parseError) {
        console.error("Erreur de parsing du JSON du Python:", parseError);
        return res.status(500).send("Invalid format from Python script.");
      }
    }
  );
});

// Lancer le serveur
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 API Popularité en ligne sur http://localhost:${port}`);
});
