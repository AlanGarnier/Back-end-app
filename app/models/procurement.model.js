// Import de la connection
const sql = require('./db');

// Constructeur
const Procurement = function (procurement) {
    this.procurement_amount = procurement.procurement_amount;
    this.procurement_date = procurement.procurement_date;
    this.is_cagnotte = procurement.is_cagnotte;
    this.is_rewards = procurement.is_rewards;
    this.is_credit = procurement.is_credit;
    this.is_debit = procurement.is_debit;
    this.users_id = procurement.users_id;
}

// Requêtes
Procurement.create = (newProcurement, result) => {
    sql.query("INSERT INTO PROCUREMENT SET ?", newProcurement, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        result(null, 'Aprovisionnement créé')
    });
};

Procurement.findByType = (type, result) => {
    sql.query('SELECT * FROM PROCUREMENT WHERE procurement_id = ${type}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("Aprovisionnement trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Aprovisionnement non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Procurement.findCreditByUser = (id, result) => {
    sql.query('SELECT * FROM PROCUREMENT WHERE is_cagnotte = 1 AND is_credit = 1 AND id_user = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }
        if (res.length) {
            console.log("Aprovisionnement trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Aprovisionnement non trouvé
        result({kind: 'non trouvé'}, null);
    });
}


Procurement.getAll = (result) => {
    sql.query('SELECT * FROM PROCUREMENT WHERE is_cagnotte = 1', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Procurements : ',res);
        result(null, res);
    });
};

/*
Procurement.remote = (id, result) => {
    sql.query('DELETE FROM PROCUREMENT WHERE procurement_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Aprovisionnement trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('Aprovisionnement supprimé ');
        result(null, res);
    })
}*/

module.exports = Procurement;