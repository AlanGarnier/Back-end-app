// Import du department
const Department = require('../models/department.model');

// Créer et enregistrer un nouveau département
exports.create = (req, res) => {
    // Vérification de la requete
    if(!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });
    }

    const department = new Department({
        department_name: req.body.department_name,
    });

    Department.create(department, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
}

// Retrieve all Departments from the database (with condition).
exports.findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single Department with an id
exports.findOne = (req, res) => {
    Department.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Département non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de ce département"
                });
            }
        }
        else res.send(data);
    });
};