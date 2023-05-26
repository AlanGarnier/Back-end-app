// Import de la connection
const sql = require('./db');

// Constructeur
const Status = function (status) {
    this.status_libelle = status.status_libelle;
}

// Requêtes
Status.create = (newStatus, result) => {
    sql.query("INSERT INTO STATUS SET ?", newStatus, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('STATUS créé: ', {id: res.insertId, newStatus});
        result(null, {id: res.insertId, newStatus})
    });
};

Status.findById = (id, result) => {
    sql.query('SELECT * FROM STATUS WHERE status_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("STATUS trouvé: ", res[0]);
            result(err, res[0]);
        }
        // STATUS non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Status.getAll = (result) => {
    sql.query('SELECT * FROM STATUS', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Statuss : ',res);
        result(null, res);
    });
};

Status.updateById = (id, status, result) => {
    sql.query('UPDATE STATUS SET status_libelle = ? WHERE status_id = ?',
        [status.status_libelle,status.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas STATUS trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Status.remote = (id, result) => {
    sql.query('DELETE FROM STATUS WHERE status_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas STATUS trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('STATUS supprimé ');
        result(null, res);
    })
}

module.exports = Status;