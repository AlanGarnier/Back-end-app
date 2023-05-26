// Import de la connection
const sql = require('./db');

// Constructeur
const Canteen = function (canteen) {
    this.canteen_lastName = canteen.canteen_lastName;
    this.canteen_firstName = canteen.canteen_firstName;
    this.canteen_mail = canteen.canteen_mail;
    this.canteen_phone = canteen.canteen_phone;
    this.canteen_password = canteen.canteen_password;
}

// Requêtes
Canteen.create = (newCanteen, result) => {
    sql.query("INSERT INTO CANTEEN SET ?", newCanteen, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Cantinière créé: ', {id: res.insertId, newCanteen});
        result(null, {id: res.insertId, newCanteen})
    });
};

Canteen.findById = (id, result) => {
    sql.query('SELECT * FROM CANTEEN WHERE canteen_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("Cantinière trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Cantinière non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Canteen.getAll = (result) => {
    sql.query('SELECT * FROM CANTEEN', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Canteens : ',res);
        result(null, res);
    });
};

Canteen.updateById = (id, canteen, result) => {
    sql.query('UPDATE CANTEEN SET canteen_lastName = ?, canteen_firstName = ?,canteen_mail = ?,canteen_phone = ?,canteen_password = ? WHERE canteen_id = ?',
        [canteen.canteen_lastName,canteen.canteen_firstName,canteen.canteen_mail,canteen.canteen_phone,canteen.canteen_password,canteen.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas Cantinière trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Canteen.remote = (id, result) => {
    sql.query('DELETE FROM CANTEEN WHERE canteen_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Cantinière trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('Cantinière supprimé ');
        result(null, res);
    })
}

module.exports = Canteen;