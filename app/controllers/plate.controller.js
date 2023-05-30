// Import du plate model
const Plate = require('../models/plate.model');

// Create and Save a new Plate
exports.create = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }

    const plate = new Plate({
        plate_name: req.body.plate_name,
        plate_description: req.body.plate_description,
        type_plate_id: req.body.type_plate_id,
    });

    Plate.create(plate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
};

// Retrieve all Plates from the database (with condition).
exports.findAll = (req, res) => {
    Plate.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single Plate with an id
exports.findOne = (req, res) => {
    Plate.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Plate non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de ce plate"
                });
            }
        }
        else res.send(data);
    });
};

// Update a Plate identified by the id in the request
exports.update = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }
    // Affichage des données
    console.log(req.body);

    Plate.updateById(req.params.id, new Plate(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Plate non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la mise à jour de ce plate"
                });
            }
        }
        else res.send(data);
    })
};

// Delete a Plate with the specified id in the request
exports.delete = (req, res) => {
    Plate.remote(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Plate non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la suppression de ce plate"
                });
            }
        }
        else res.send({message: 'Plate supprimé'});
    })
};
