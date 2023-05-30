
module.exports = app => {
    // Import du procurementController
    const procurement = require('../controllers/procurement.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un approvisonnement
    router.post('/', procurement.create);
    // Récupérerer les approvisonnements
    router.get('/', procurement.getAll);
    // Récupérerer un approvisonnement
    router.get('/findCredit/:id', procurement.findCreditByUser);
    // Récupérerer un approvisonnement
    router.get('/findDebit/:id', procurement.findDebitByUser);

    app.use('/api/procurement', router);
}