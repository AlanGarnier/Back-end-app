// Import de la connection
const sql = require('./db');

// Constructeur
const Role = function (role) {
    this.role_name = role.role_name;
}

// Requêtes
Role.create = (newRole, result) => {
    sql.query("INSERT INTO ROLE SET ?", newRole, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('ROLE créé: ', {id: res.insertId, newRole});
        result(null, {id: res.insertId, newRole})
    });
};

Role.findById = (id, result) => {
    sql.query('SELECT * FROM ROLE WHERE role_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("ROLE trouvé: ", res[0]);
            result(err, res[0]);
        }
        // ROLE non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Role.getAll = (result) => {
    sql.query('SELECT * FROM ROLE', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Roles : ',res);
        result(null, res);
    });
};

Role.updateById = (id, role, result) => {
    sql.query('UPDATE ROLE SET role_name = ? WHERE role_id = ?',
        [role.role_name,role.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas ROLE trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Role.remote = (id, result) => {
    sql.query('DELETE FROM ROLE WHERE role_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas ROLE trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('ROLE supprimé ');
        result(null, res);
    })
}

module.exports = Role;