const plate = require("../controllers/plate.controller");
module.exports = app => {
    // Import du plateController
    const plate = require('../controllers/plate.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un plate
    router.post('/', plate.create);
    // Récuper les utilisateurs
    router.get('/', plate.findAll);
    // Récuper un utilisateur
    router.get('/:id', plate.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', plate.update);
    // Supprimer un utilisateur
    router.delete('/:id', plate.delete);

    app.use('/api/plate', router);
}