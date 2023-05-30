
module.exports = app => {
    // Import du plateController
    const plate = require('../controllers/plate.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un plate
    router.post('/', plate.create);
    // Récupérer les utilisateurs
    router.get('/', plate.findAll);
    // Récupérer un utilisateur
    router.get('/:id', plate.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', plate.update);
    // Supprimer un utilisateur
    router.delete('/:id', plate.delete);

    app.use('/api/plate', router);
}