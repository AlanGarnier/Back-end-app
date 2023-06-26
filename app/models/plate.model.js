// Import de la connection
const sql = require('./db');

// Constructeur
const Plate = function (plate) {
    this.plate_name = plate.plate_name;
    this.plate_description = plate.plate_description;
    this.type_plate_id = plate.type_plate_id;
    //this.plate_is_available = plate.plate_is_available;
}

// Requêtes
Plate.create = (newPlate, result) => {
    sql.query("INSERT INTO PLATE SET ?", newPlate, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Plate créé: ', {id: res.insertId, newPlate});
        result(null, {id: res.insertId, newPlate})
    });
};

Plate.findById = (id, result) => {
    sql.query('SELECT * FROM PLATE WHERE plate_id = ?', [id] , (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("Plate trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Plate non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Plate.getEntree = (result) => {
    sql.query('SELECT plate_id, plate_name FROM PLATE WHERE type_plate_id = 1', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Plates : ',res);
        result(null, res);

    });
}


Plate.getPlat = (result) => {
    sql.query('SELECT plate_id, plate_name FROM PLATE WHERE type_plate_id = 2', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Plates : ',res);
        result(null, res);

    });
}


Plate.getDessert = (result) => {
    sql.query('SELECT plate_id, plate_name FROM PLATE WHERE type_plate_id = 3', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Plates : ',res);
        result(null, res);

    });
}

Plate.getAll = (result) => {
    sql.query('SELECT * FROM PLATE', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Plates : ',res);
        result(null, res);
    });
};

Plate.updateById = (id, plate, result) => {
    sql.query('UPDATE PLATE SET plate_name = ?, plate_description = ?,type_plate_id = ? WHERE plate_id = ?',
        [plate.plate_name,plate.plate_description,plate.type_plate_id,plate.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas Plate trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Plate.remote = (id, result) => {
    sql.query('DELETE FROM PLATE WHERE plate_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Plate trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('Plate supprimé ');
        result(null, res);
    })
}

module.exports = Plate;