
module.exports = app => {
    // Import du departmentController
    const department = require('../controllers/department.controller');
    // Import du router
    const router = require('express').Router();

    // Créer un department
    router.post('/', department.create);
    // Récupérer les départements
   router.get('/', department.findAll);
    // Récupérer un département
    router.get('/:id', department.findOne);
    // Mettre à jour un département
   /*  router.put('/:id', department.update);
    // Supprimer un département
    router.delete('/:id', department.delete);*/

    app.use('/api/department', router);
}