let data2 = {
    name: "Felipe Ferreira",
    avatar: "https://github.com/FelipebFerreira.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 10,
    "vacation-per-year": 4,
    "value-hour": 75
};

const Database = require('../db/config');




module.exports = {
    async get() {
        const db = await Database();

        const data = await db.get(`SELECT * FROM profile`);

        await db.close();
        /** Realizando a normalização do registro e enviado para banco */


        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour

        };
    },
    /* atualizar o valor vindo no controllers*/
    update(newData) {
        data = newData;
    }
}