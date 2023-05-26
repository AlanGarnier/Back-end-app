// Import de la connection
const sql = require('./db');

// Constructeur
const Menu = function (menu) {
    this.menu_name = menu.menu_name;
    this.menu_price = menu.menu_price;
    this.menu_is_available = menu.menu_is_available;
}

// Requêtes
Menu.create = (newMenu, result) => {
    sql.query("INSERT INTO MENU SET ?", newMenu, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Menu créé: ', {id: res.insertId, newMenu});
        result(null, {id: res.insertId, newMenu})
    });
};

Menu.findById = (id, result) => {
    sql.query('SELECT * FROM MENU WHERE menu_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("Menu trouvé: ", res[0]);
            result(err, res[0]);
        }
        // Menu non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Menu.getAll = (result) => {
    sql.query('SELECT * FROM MENU', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Menus : ',res);
        result(null, res);
    });
};

Menu.updateById = (id, menu, result) => {
    sql.query('UPDATE MENU SET menu_name = ?, menu_price = ?,menu_is_available = ? WHERE menu_id = ?',
        [menu.menu_name,menu.menu_price,menu.menu_is_available,menu.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas Menu trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Menu.remote = (id, result) => {
    sql.query('DELETE FROM MENU WHERE menu_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas Menu trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('Menu supprimé ');
        result(null, res);
    })
}

module.exports = Menu;