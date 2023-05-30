// Import du status
const Status = require('../models/status.model');

// Créer et enregistrer un nouveau rôle
exports.create = (req, res) => {
    // Vérification de la requete
    if(!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });
    }

    const status = new Status({
        status_libelle: req.body.status_libelle,
    });

    Status.create(status, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
}

// Retrieve all statuss from the database (with condition).
exports.findAll = (req, res) => {
    Status.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single status with an id
exports.findOne = (req, res) => {
    Status.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'statut non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération du statut choisis"
                });
            }
        }
        else res.send(data);
    });
};