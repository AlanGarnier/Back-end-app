

module.exports = app => {
    // Import du role controller
    const role = require("../controllers/role.controller");
    // Import du router
    const router = require('express').Router();

    // Créer un role
    router.post('/', role.create);
    // Récupérer les utilisateurs
   /* router.get('/', role.findAll);
    // Récupérer un utilisateur
    router.get('/:id', role.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', role.update);
    // Supprimer un utilisateur
    router.delete('/:id', role.delete);*/

    app.use('/api/role', router);
}