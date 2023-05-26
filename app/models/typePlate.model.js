// Import de la connection
const sql = require('./db');

// Constructeur
const TypePlate = function (type_plate) {
    this.type_plate_libelle = type_plate.type_plate_libelle;
}

// Requêtes
TypePlate.create = (newTypePlate, result) => {
    sql.query("INSERT INTO TYPE_PLATE SET ?", newTypePlate, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('TYPE_PLATE créé: ', {id: res.insertId, newTypePlate});
        result(null, {id: res.insertId, newTypePlate})
    });
};

TypePlate.findById = (id, result) => {
    sql.query('SELECT * FROM TYPE_PLATE WHERE type_plate_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("TYPE_PLATE trouvé: ", res[0]);
            result(err, res[0]);
        }
        // TYPE_PLATE non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

TypePlate.getAll = (result) => {
    sql.query('SELECT * FROM TYPE_PLATE', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('TypePlates : ',res);
        result(null, res);
    });
};

TypePlate.updateById = (id, type_plate, result) => {
    sql.query('UPDATE TYPE_PLATE SET type_plate_libelle = ? WHERE type_plate_id = ?',
        [type_plate.type_plate_libelle,type_plate.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas TYPE_PLATE trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

TypePlate.remote = (id, result) => {
    sql.query('DELETE FROM TYPE_PLATE WHERE type_plate_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas TYPE_PLATE trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('TYPE_PLATE supprimé ');
        result(null, res);
    })
}

module.exports = TypePlate;