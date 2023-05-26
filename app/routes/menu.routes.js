const menu = require("../controllers/menu.controller");
module.exports = app => {
    // Import du menuController
    const menu = require('../controllers/menu.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un menu
    router.post('/', menu.create);
    // Récuper les utilisateurs
    router.get('/', menu.findAll);
    // Récuper un utilisateur
    router.get('/:id', menu.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', menu.update);
    // Supprimer un utilisateur
    router.delete('/:id', menu.delete);

    app.use('/api/menu', router);
}