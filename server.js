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

const db = require('./app/models/user.model');


app.get('/',(req,res) => {
    res.json({message: 'Welcome to my home'})
});

// Route
require('./app/routes/user.routes')(app);
require('./app/routes/canteen.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/departement.routes')(app);
require('./app/routes/procurement.routes')(app);
require('./app/routes/menu.routes')(app);
require('./app/routes/plate.routes')(app);
require('./app/routes/typePlate.routes')(app);
require('./app/routes/status.routes')(app);


// Configuration du port, ecoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})