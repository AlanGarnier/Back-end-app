// Import du TypePlate
const TypePlate = require('../models/TypePlate.model');

// Créer et enregistrer un nouveau rôle
exports.create = (req, res) => {
    // Vérification de la requete
    if(!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });
    }
    
    const typePlate = new TypePlate({
        TypePlate_libelle: req.body.TypePlate_libelle,
    });
    

    TypePlate.create(typePlate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
}

// Retrieve all TypePlates from the database (with condition).
exports.findAll = (req, res) => {
    TypePlate.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single TypePlate with an id
exports.findOne = (req, res) => {
    TypePlate.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Type non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération du type choisis"
                });
            }
        }
        else res.send(data);
    });
};