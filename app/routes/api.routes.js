// Import des paramètres de route
const router = require('express').Router();
// Import des middleware
const validateMiddleware = require('../middleware/validate');
const { validationResult } = require('express-validator')

// Import du userController
const users = require('../controllers/user.controller');
const User = require("../models/user.model");

// Import de bcerypt
const bcrypt = require('bcryptjs');
const { authJwt } = require("../middleware");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth.config");



// Auth routes
router.post('/signup',validateMiddleware.signUpValidation, (req, res) => {
    // On récupère le tableau des erreurs
    const result = validationResult(req);

    if (result.isEmpty()) {
        // Création d'unutilisateur
        const user = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password,8),
            cagnotte: null,
            rewards: null,
            role_id: 1,
            department_id: req.body.department_id,
            //users_password: bcrypt.hashSync(req.body.users_password,8)
        });

        User.findByEmail(req.body.email, (err, data) => {
            if (data) {
                res.status(500).send({
                    message:
                    "L' email existe déjà !"
                });
            }
            else {
                User.create(user, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message:
                            err.message || "Une erreur est survenue lors le création"
                        });
                    }
                    else res.send(data);
                });
            }
        });
    }
    else {
        res.send({ errors: result.array() });
    }
});

router.post('/login',validateMiddleware.signInValidation, (req, res) => {
    // On récupère le tableau des erreurs
    const result = validationResult(req);

    if (result.isEmpty()) {
        User.getCredentials(req.body.email, (err, data) => {
            //res.send(data);
            if (!data) {
                res.status(400).send({
                    message: "Votre email ou mot de passe est incorrect"

                });
            }
            else if (data['users_mail'] !== (req.body.email)) {
                res.status(400).send({
                    message: "Veuillez véfier votre email"

                });
            }
            else {
               const passwordIsValid =  bcrypt.compareSync(req.body.password, data['users_password']);

               console.log(req.body.password, data['users_password'], passwordIsValid)

               if (passwordIsValid === false) {
                   res.status(400).send({
                       message: "Mot de passe incorrect"
                   })
               }
               else {
                   let token = jwt.sign({id: data['users_id']}, auth.secret, {expiresIn: '1h'} )
                   res.send({
                       message: "Vous êtes cnnecté",
                       authToken: token
                   })
               }
            }



        })
    }
    else {
        res.send({ errors: result.array() });
    }
});

/*app.use('/api/users', router)
    .post('/users', users.create);*/







// Export du module router
module.exports = router;