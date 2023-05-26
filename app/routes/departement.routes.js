const department = require("../controllers/department.controller");
module.exports = app => {
    // Import du departmentController
    const department = require('../controllers/department.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un department
    router.post('/', department.create);
    // Récuper les utilisateurs
    router.get('/', department.findAll);
    // Récuper un utilisateur
    router.get('/:id', department.findOne);
    // Mettre à jour un utilisateur
    router.put('/:id', department.update);
    // Supprimer un utilisateur
    router.delete('/:id', department.delete);

    app.use('/api/department', router);
}