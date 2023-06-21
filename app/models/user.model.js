// Import de la connection
const sql = require('./db');

// Constructeur
const User = function (user) {
    this.users_lastName = user.lastname;
    this.users_firstName = user.firstname;
    this.users_mail = user.email;
    this.users_phone = user.phone;
    this.users_password = user.password;
    this.users_cagnotte = user.cagnotte;
    this.users_rewards = user.rewards;
    this.role_id = user.role_id;
    this.department_id = user.department_id;
};

// Requêtes
User.create = (newUser, result) => {
    sql.query("INSERT INTO USERS SET ?", newUser, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Utilisateur créé: ', {id: res.insertId, newUser});
        result(null, {id: res.insertId, newUser})
    });
};

User.findById = (id, result) => {
    sql.query('SELECT * FROM USERS WHERE users_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("Utilisateur trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Utilisateur non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

User.findByEmail = (email, result) => {
    sql.query('SELECT * FROM USERS WHERE users_mail = ?', [email], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé: ", res[0]);
            result(err, res[0]);
            return;
        }
        // Utilisateur non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

User.getCredentials = (email , result) => {
    sql.query('SELECT users_mail, users_password, users_id, role_id FROM USERS WHERE users_mail = ?', [email], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé: ", res[0]);
            result(err, res[0]);
            return;
        }
        // Utilisateur non trouvé
        result({kind: 'non trouvé'}, null);
    });
}

User.getAll = (result) => {
    sql.query('SELECT * FROM USERS', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Users : ',res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query('UPDATE USERS SET users_lastName = ?, users_firstName = ?,users_mail = ?,users_phone = ?,users_password = ? WHERE users_id = ?',
        [user.users_lastName,user.users_firstName,user.users_mail,user.users_phone,user.users_password,user.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas Utilisateur trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

User.remote = (id, result) => {
    sql.query('DELETE FROM USERS WHERE users_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Utilisateur trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('Utilisateur supprimé ');
        result(null, res);
    })
}

module.exports = User;