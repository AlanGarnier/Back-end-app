// Import du user model
const User = require('../models/user.model');

// Create and Save a new User
exports.create = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });
    }

    const user = new User({
        //users_id:0,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cagnotte: null,
        rewards: null,
        role_id: 1,
        department_id: req.body.department_id,
        //users_password: bcrypt.hashSync(req.body.users_password,8)
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors la récupération"
            });
        else res.send(data);
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Utilisateur non trouvé'
                });
            }
            else {
                res.status(500).send({
                        message: "Une erreur est survenue lors la récupération de cet utilisateur"
                });
            }
        }
        else res.send(data);
    });
};

exports.duplicateEmail = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (data) {
            res.status(500).send({
                message:
                    "L' email existe déjà !"
            });
        }

    })
}

// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Verifification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });

    }
    // Affichage des données
    console.log(req.body);

    User.updateById(req.params.id, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Utilisateur non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la mise à jour de cet utilisateur"
                });
            }
        }
        else res.send(data);
    })
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.remote(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Utilisateur non trouvé'
                });
            }
            else {
                res.status(500).send({
                    message: "Une erreur est survenue lors la suppression de cet utilisateur"
                });
            }
        }
        else res.send({message: 'Utilisateur supprimer'});
    })
};
