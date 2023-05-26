const typePlate = require("../controllers/typePlate.controller");
module.exports = app => {
    // Import du typePlateController
    const typePlate = require('../controllers/typePlate.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un typePlate
    router.post('/', typePlate.create);
    // Récuper les utilisateurs
    router.get('/', typePlate.findAll);
    // Récuper un utilisateur
    router.get('/:id', typePlate.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', typePlate.update);
    // Supprimer un utilisateur
    router.delete('/:id', typePlate.delete);

    app.use('/api/typePlate', router);
}