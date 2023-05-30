// Import du menu model
const Menu = require('../models/menu.model');

// Create and Save a new Menu
exports.create = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }

    const menu = new Menu({
        menu_name: req.body.menu_name,
        menu_price: req.body.menu_price,
        menu_is_available: 1,
    });

    Menu.create(menu, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
};

// Retrieve all Menus from the database (with condition).
exports.findAll = (req, res) => {
    Menu.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
    Menu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Menu non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de ce menu"
                });
            }
        }
        else res.send(data);
    });
};

// Update a Menu identified by the id in the request
exports.update = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }
    // Affichage des données
    console.log(req.body);

    Menu.updateById(req.params.id, new Menu(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Menu non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la mise à jour de ce menu"
                });
            }
        }
        else res.send(data);
    })
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
    Menu.remote(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Menu non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la suppression de ce menu"
                });
            }
        }
        else res.send({message: 'Menu supprimé'});
    })
};
