
module.exports = app => {
    // Import du plateController
    const plate = require('../controllers/plate.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un plate
    router.post('/', plate.create);
    // Récupérer les plats
    router.get('/', plate.findAll);
    // Récupérer un plat
    //router.get('/:id', plate.findOne);
    // Récupérer un plat
    router.get('/entree', plate.findEntree);
    // Récupérer un plat
    router.get('/plat', plate.findPlat);
    // Récupérer un plat
    router.get('/dessert', plate.findDessert);
    // Mettre à jour un plat
    router.put('/:id', plate.update);
    // Supprimer un plat
    router.delete('/:id', plate.delete);

    app.use('/api/plate', router);
}