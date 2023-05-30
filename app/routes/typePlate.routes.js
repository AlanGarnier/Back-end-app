
module.exports = app => {
    // Import du typePlateController
    const typePlate = require('../controllers/typePlate.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un typePlate
    router.post('/', typePlate.create);
    // Récupérer les utilisateurs
    router.get('/', typePlate.findAll);
    // Récupérer un utilisateur
    router.get('/:id', typePlate.findOne);
    // Mettre à jour un utilisateur
   /* router.put('/:id', typePlate.update);
    // Supprimer un utilisateur
    router.delete('/:id', typePlate.delete);*/

    app.use('/api/typePlate', router);
}