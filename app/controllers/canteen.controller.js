// Import du canteen model
const Canteen = require('../models/canteen.model');

// Create and Save a new Canteen
exports.create = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }

    const canteen = new Canteen({
        //canteen_id:0,
        canteen_lastName: req.body.canteen_lastName,
        canteen_firstName: req.body.canteen_firstName,
        canteen_mail: req.body.canteen_mail,
        canteen_phone: req.body.canteen_phone,
        canteen_password: req.body.canteen_password,
        role_id: req.body.role_id,
        //canteen_password: bcrypt.hashSync(req.body.canteen_password,8)
    });

    Canteen.create(canteen, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
};

// Retrieve all Canteens from the database (with condition).
exports.findAll = (req, res) => {
    Canteen.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single Canteen with an id
exports.findOne = (req, res) => {
    Canteen.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'cantinière non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la récupération de la cantinière"
                });
            }
        }
        else res.send(data);
    });
};

// Update a Canteen identified by the id in the request
exports.update = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }
    // Affichage des données
    console.log(req.body);

    Canteen.updateById(req.params.id, new Canteen(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'cantinière non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la mise à jour de la cantinière"
                });
            }
        }
        else res.send(data);
    })
};

// Delete a Canteen with the specified id in the request
exports.delete = (req, res) => {
    Canteen.remote(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'cantinière non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la suppression de la cantinière"
                });
            }
        }
        else res.send({message: 'cantinière supprimé'});
    })
};
