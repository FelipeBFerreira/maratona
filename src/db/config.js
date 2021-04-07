const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

/* Realizando a conexão com banco de dados*/


/** arroyfunction */

module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});

