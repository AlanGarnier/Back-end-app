
module.exports = app => {
    // Import du menuController
    const menu = require('../controllers/menu.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un menu
    router.post('/', menu.create);
    // Récupérer les menus
    router.get('/', menu.findAll);
    // Récupérer un menu
    router.get('/:id', menu.findOne);
    // Mettre à jour un menu
    router.put('/:id', menu.update);
    // Supprimer un menu
    router.delete('/:id', menu.delete);

    app.use('/api/menu', router);
}