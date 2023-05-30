module.exports = app => {
    // Import du userController
    const users = require('../controllers/user.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un user
    router.post('/', users.create);
    // Récupérer les utilisateurs
    router.get('/', users.findAll);
    // Récupérer un utilisateur
    router.get('/:id', users.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', users.update);
    // Supprimer un utilisateur
    router.delete('/:id', users.delete);

    app.use('/api/users', router);
}