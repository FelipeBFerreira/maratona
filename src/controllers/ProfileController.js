const Profile = require("../model/Profile")
module.exports = {
    
    index(req,res) {
        
         return res.render('profile', { profile : Profile.get() })
    },

    update(req, res){
            const data = req.body;
            //definir quantas semana tem num ano
            const weeksPerYear = 52;
            //remove as semanas de ferias do ano, para pegar quantas semana tem em 1 mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
            //total de horas trabalhadas na semana
            const weeksTotalHour = data["hours-per-day"] * data["days-per-week"];

            const monthlyTotalHours = weeksTotalHour * weeksPerMonth;
            const valueHour = data["monthly-budget"] / monthlyTotalHours;

            Profile.update({ 
                ...Profile.get(),
                ...req.body,
                "value-hour": valueHour
            
            
            })

            return res.redirect('/profile');
    }

} 