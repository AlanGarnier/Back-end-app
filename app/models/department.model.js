// Import de la connection
const sql = require('./db');

// Constructeur
const Department = function (department) {
    this.department_name = department.department_name;
}

// Requêtes
Department.create = (newDepartment, result) => {
    sql.query("INSERT INTO DEPARTMENT SET ?", newDepartment, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('DEPARTMENT créé: ', {id: res.insertId, newDepartment});
        result(null, {id: res.insertId, newDepartment})
    });
};

Department.findById = (id, result) => {
    sql.query('SELECT * FROM DEPARTMENT WHERE department_id = ${id}', (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.length) {
            console.log("DEPARTMENT trouvé: ", res[0]);
            result(err, res[0]);
        }
        // DEPARTMENT non trouvé
        result({kind: 'non trouvé'}, null);
    });
};

Department.getAll = (result) => {
    sql.query('SELECT * FROM DEPARTMENT', (err,res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        console.log('Department : ',res);
        result(null, res);
    });
};

Department.updateById = (id, department, result) => {
    sql.query('UPDATE DEPARTMENT SET department_name = ? WHERE department_id = ?',
        [department.department_name,department.id],
        (err,res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            }

            if (res.affectedRows === 0) {
                // Pas DEPARTMENT trouvé pour cet ID
                result({kind: 'Non trouvé'}, null);
            }
        }
    );
};

Department.remote = (id, result) => {
    sql.query('DELETE FROM DEPARTMENT WHERE department_id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        }

        if (res.affectedRows === 0) {
            // Pas DEPARTMENT trouvé pour cet ID
            result({kind: 'Non trouvé'}, null);
        }

        console.log('DEPARTMENT supprimé ');
        result(null, res);
    })
}

module.exports = Department;