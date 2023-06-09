
module.exports = app => {
    // Import du statusController
    const status = require('../controllers/status.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un status
    router.post('/', status.create);
    // Récupérer les utilisateurs
    router.get('/', status.findAll);
    // Récupérer un utilisateur
    router.get('/:id', status.findOne);
    // Mettre à jour un utilisateur
   /* router.put('/:id', status.update);
    // Supprimer un utilisateur
    router.delete('/:id', status.delete);*/

    app.use('/api/status', router);
}