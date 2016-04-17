var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('db/qdb.db');
exports = module.exports

exports.add = function(table, data) {
    console.log("Adding something");
    /*var cols = Object.keys(data).join(',');
    var query = "INSERT INTO " + table + "(";
    query += cols;
    query += ") VALUES "*/
    db.all("PRAGMA table_info(" + table + ")", function(err, cols) {
        /*cols = cols.map(function (col) {
            return col.name
        });

        var newData = cols.reduce(function(newObj, colName) {
            colName = colName.lower();
            newObj[colName] = data[colName];
            return newObj;
        }, {});
*/
        //INSERT INTO users (firstname, lastname) VALUES (firstnameValue, lastnameValue)
        db.exec("INSERT INTO users (firstname, lastname) VALUES ('Enrique', 'De Diego')", function(err, result) {
            console.log("DONE");
        });

    });
};

exports.select = function(table, where) {
    db.all("SELECT * FROM " + table + " WHERE fastname = 'Enrique' AND lastname = 'De Diego'", function(err, rows) {
        return rows;
    });
};

exports.update = function(table, where, update) {
    //UPDATE table SET firstname = 'Enrique' WHERE firstname = 'Alexa';
    db.run("UPDATE " + table + " SET firstname = 'Enrique' WHERE firstname = 'Alexa'", function(err, result) {
        return true;
    });
};


