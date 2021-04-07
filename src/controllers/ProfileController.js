const Profile = require("../model/Profile")

module.exports = {
    
   async index(req,res) {
        /** Utilizando o await para aguarda o retorno do Profile Get e mudando agora o index para async para espera o retorno do get */
         return res.render('profile', { profile : await Profile.get() })
    },

    async update(req, res){
            const data = req.body;
            //definir quantas semana tem num ano
            const weeksPerYear = 52;
            //remove as semanas de ferias do ano, para pegar quantas semana tem em 1 mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
            //total de horas trabalhadas na semana
            const weeksTotalHour = data["hours-per-day"] * data["days-per-week"];

            const monthlyTotalHours = weeksTotalHour * weeksPerMonth;
            const valueHour = data["monthly-budget"] / monthlyTotalHours;

           await Profile.update({ 
                ...await Profile.get(),
                ...req.body,
                "value-hour": valueHour
            
            
            })

            return res.redirect('/profile');
    }

} 