// Import express validator

const { check, body, validationResult} = require('express-validator');
const users = require("../controllers/user.controller");

/*const  confirmPassword = (req) => {
    return req.body.password;
}*/

signUpValidation =  [

    check('firstname','Le champ prénom ne peut pas être vide et doit ne contenir que des lettre').notEmpty().isString().escape(),
    check('lastname','Le champ nom ne peut pas être vide et doit ne contenir que des lettre').notEmpty().isString().escape(),
    check('email','Le champ email ne peut pas être vide et doit être un email valide').notEmpty().isEmail().normalizeEmail({gmail_remove_dots: false}).escape(),
    check('phone','Le champ téléphone ne peut pas être vide et doit contenir 10 caractères').notEmpty().isLength({min: 10,max: 10}).escape(),
    check('password','Le champ mot de passe ne peut pas être vide et doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial ').notEmpty().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).escape(),
    check('confirmPassword')
        .trim()
        .notEmpty()
        .escape()
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;

            if(password !== confirmPassword){
                throw new Error('Les 2 mots de passe doivent être identiques')
            }
        }),
]

/*validateConfirmPassword = [
    check('confirmPassword')
        .trim()
        .notEmpty()
        .escape()
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;

            if(password !== confirmPassword){
                throw new Error('Passwords must be same')
            }
        })
]*/

signInValidation = [
    check('email','Le champ email ne peut pas être vide et doit être un email valide').notEmpty().isEmail().normalizeEmail({gmail_remove_dots: false}).escape(),
    check('password','Le champ mot de passe ne peut pas être vide et doit contenir au minimum 8 caractères').notEmpty().isLength({min: 8}).escape(),


]


/*
validated = (req, res, next) => {

    const result = validationResult(req);

    if (result.isEmpty() === true) {
        return next;
    }

    const extractedErrors = []
    result.array().map(err => extractedErrors.push({ [err.type]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
        // data: result.isEmpty(),
        // data2: result,
    })
}
*/



const validate = {
    signUpValidation: signUpValidation,
    signInValidation: signInValidation,
   // validated: validated
};

module.exports = validate;
