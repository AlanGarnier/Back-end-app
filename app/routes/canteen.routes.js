
module.exports = app => {
    // Import du canteenController
    const canteen = require('../controllers/canteen.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un canteen
    router.post('/', canteen.create);
    // Récupérer les utilisateurs
    router.get('/', canteen.findAll);
    // Récupérer un utilisateur
    router.get('/:id', canteen.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', canteen.update);
    // Supprimer un utilisateur
    router.delete('/:id', canteen.delete);

    app.use('/api/canteen', router);
}