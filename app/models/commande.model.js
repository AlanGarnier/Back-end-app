// Import de la connexion
const sql = require('./db');


// Constructeur
const Order = function (order) {
    this.users_id = order.userId;
    this.menu_id = order.menuId;
    this.commande_date = order.date;
    this.status_id = order.statusId;
}


// Requêtes
Order.create = (newOrder, result) => {
    sql.query("INSERT INTO COMMANDE SET ?",newOrder, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        result(null, 'Commande créé')
    });
};

Order.findByUser = (user, result) => {
    sql.query("SELECT * FROM COMMANDE WHERE users_id = ${user}", (err, res) => {
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

Order.getAll = (result) => {
    sql.query('SELECT * FROM COMMANDE', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Commandes : ',res);
        result(null, res);
    })
}

Order.canceled = (numCom, result) => {
    sql.query('UPDATE COMMANDE SET status_id = 1 WHERE num_com = ?', numCom, (err, res) => {

        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Utilisateur trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }
    });
}

module.exports = Order;