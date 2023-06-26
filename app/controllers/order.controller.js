// Import du model
const Order = require('../models/commande.model');
const moment = require('moment');

// Récupération de la date courante
const fullDate = moment().format('Y-m-d HH:mm:ss');

exports.create = (req, res) => {
    // Verification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas être vides'
        });
    }



    const order = new Order({
        userId: req.body.userId,
        menuId: req.body.menuId,
        date: fullDate,
        statusId: 0,
    });

    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la création de la commande"
            });
        else res.send(data);
    });
}

// Retrieve all Orders from the database (with condition).
exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération des commandes"
            });
        else res.send(data);
    });
};


// Find a single Menu with an id
exports.findOne = (req, res) => {
    Order.findByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Commande non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération des commandes"
                });
            }
        }
        else res.send(data);
    });
};

exports.dailyOrder = (req, res) => {
    Order.getAllOfDay(fullDate, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: "Pas de commande aujourd'hui "
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération des commandes du jour"
                });
            }
        }
        else res.send(data);
    })
}

exports.customerDailyOrder = (req, res) => {
    Order.getAllByUserByDay(req.params.id, fullDate, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: "Pas de commande aujourd'hui "
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération des commandes du jour"
                });
            }
        }
        else res.send(data);
    })
}

exports.cancelOrder =  (req, res) => {
    Order.canceled(req.body.numCom, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Commande non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors de lannulation de la commande"
                });
            }
        }
        else res.send(data);
    });
}