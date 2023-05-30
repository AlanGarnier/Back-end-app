// Import du role
const Role = require('../models/role.model');

// Créer et enregistrer un nouveau rôle
exports.create = (req, res) => {
    // Vérification de la requete
    if(!req.body) {
        res.status(400).send({
            message: 'Les champs ne peuvent pas etre vides'
        });
    }

    const role = new Role({
        role_name: req.body.role_name,
    });

    Role.create(role, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors le création"
            });
        else res.send(data);
    })
}