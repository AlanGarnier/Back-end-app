// Import du procurement model
const Procurement = require('../models/procurement.model');
const moment = require('moment');

// Creer and enregiter a nouvel  "Procurement"
exports.create = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas être vides'
        });
    }
    // Récupération de la date courante
    const fullDate = moment().format('Y-m-d HH:mm:ss');
    function getProcurement(req)
    {
        if (req.body.type === 'credit')
        {
            return new Procurement({
                procurement_amount: req.body.amount,
                procurement_date: fullDate,
                is_cagnotte: 1,
                is_credit: 1,
                users_id: req.body.user,
            });
        }
        else if (req.body.type === 'debit')
        {
            return new Procurement({
                procurement_amount: req.body.amount,
                procurement_date: fullDate,
                is_cagnotte: 1,
                is_debit: 1,
                users_id: req.body.user,
            });
        }
    }


    Procurement.create(getProcurement(req), (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send({
            message: "Approvisionnement effectué"
        });
    });
};

// Retrieve all Procurements from the database (with condition).
exports.getAll = (req, res) => {
    Procurement.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
    });
};

// Find a single Procurement with an id
exports.findCreditByUser = (req, res) => {
    Procurement.findCreditByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'approvisionnement non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de l'approvisionnement"
                });
            }
        }
        else res.send(data);
    });
};
// Find a single Procurement with an id
exports.findDebitByUser = (req, res) => {
    Procurement.findCreditByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'approvisionnement non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de l'approvisionnement"
                });
            }
        }
        else res.send(data);
    });
};

// Update a Procurement identified by the id in the request
exports.update = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }
    // Affichage des données
    console.log(req.body);

    Procurement.updateById(req.params.id, new Procurement(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'approvisionnement non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la mise à jour de l'approvisionnement"
                });
            }
        }
        else res.send(data);
    })
};

// Delete a Procurement with the specified id in the request
exports.delete = (req, res) => {
    Procurement.remote(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'approvisionnement non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la suppression de l'approvisionnement"
                });
            }
        }
        else res.send({message: 'approvisionnement supprimé'});
    })
};
