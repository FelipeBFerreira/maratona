const Database = require('../db/config');

module.exports = {

    async getVerificarion(login, password) {
        const db = await Database();
        
        await db.close

        const matching = await db.get(`SELECT * FROM USERS  WHERE  name="${login}" AND password="${password}"`);

        await db.close
        return matching

    }




}