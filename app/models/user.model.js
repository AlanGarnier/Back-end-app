// Import de la connection
const sql = require('./db');

// Constructeur
const User = function (user) {
    this.users_lastName = user.users_lastName;
    this.users_firstName = user.users_firstName;
    this.users_mail = user.users_mail;
    this.users_phone = user.users_phone;
    //this.users_login = user.users_login;
    this.users_password = user.users_password;
    this.users_cagnotte = user.users_cagnotte;
    this.users_rewards = user.users_rewards;
}

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

User.getAll = (result) => {
    sql.query('SELECT * FROM USERS', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
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