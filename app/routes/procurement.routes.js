const procurement = require("../controllers/procurement.controller");
module.exports = app => {
    // Import du procurementController
    const procurement = require('../controllers/procurement.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un procurement
    router.post('/', procurement.create);
    // Récuper les utilisateurs
    router.get('/', procurement.findAll);
    // Récuper un utilisateur
    router.get('/:id', procurement.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', procurement.update);
    // Supprimer un utilisateur
    router.delete('/:id', procurement.delete);

    app.use('/api/procurement', router);
}