// Import des modules express et cors
const express = require("express");
const cors = require("cors");

// Création d'une appli express
const app = express();

const corsOption = {
    origin: "http:/localhost:8081"
};

app.use(cors(corsOption));
// Ajout des middleware
// Analyse des requêtes dont le type de contenu est - application/json
app.use(express.json());
// Analyse des requêtes dont le type de contenu est - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Route
app.get('/',(req,res) => {
    res.json({message: 'Welcome to my application'})
});

// Configuration du port, ecoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})