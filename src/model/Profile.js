let data = {
    name: "Felipe Ferreira",
    avatar: "https://github.com/FelipebFerreira.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 10,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports = {
        get(){
            return data;
        },
        /* atualizar o valor vindo no controllers*/
        update(newData){
            data = newData;
        }
}