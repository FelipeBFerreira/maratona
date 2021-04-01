const express = require('express');
const routes = express.Router();


const views = __dirname + '/views/';


const profile = {
    data:{
        name: "Felipe Ferreira",
        avatar: "https://github.com/FelipebFerreira.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
     },

     controllers: {
            index(req,res) {
                
                 return res.render(views + 'profile', { profile : profile.data })
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
                    profile.data = {
                        ...profile.data,
                        ...req.body,
                        "value-hour": valueHour
                    }

                    return res.redirect('/profile');
            }

        }   
}


const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            createdAt: Date.now()
            

        }, {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            createdAt: Date.now()
         
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress';
                
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job , profile.data["value-hour"])
                }
                
            })
               
                
                return res.render(views + "index", { profile: profile.data, jobs: updatedJobs})
        },

        create(req, res) {
            return res.render(views + 'job');
        },

        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            /* ? comparativo para escolha caso o dados não seja encontrado*/
            /* Erro no Maik da aula*/
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now()
            });
            return res.redirect('/')
        },

        show(req, res) {

            const jobId = req.params.id;
            const job = Job.data.find(job => Number(job.id) === Number(jobId));
            

            if(!job){
                return res.send('Job not Found!');
            }
            job.budget = Job.services.calculateBudget(job , profile.data["value-hour"]);

            return res.render(views + 'job-edit' , { job })
        },

        update(req, res) {

            const jobId = req.params.id;
            const job = Job.data.find(job => Number(job.id) === Number(jobId));
            

            if(!job){
                return res.send('Job not Found!');
            }

            const updatedJob = {
                ...job,/* Joga os valores espalhados */
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }  
            Job.data = Job.data.map( job => {

                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }

                return job;
            })     
            
            res.redirect('/job/'+ jobId)
        },

        delete(req, res) {

            const jobId = req.params.id;

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));
                            
            res.redirect('/')
        }
    },

    /* Corrigir novamente o services para funcionar */
    services: {
        remainingDays(job) {
            /* toFixed aredonda o numero */
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
            const createdDate = new Date(job.createdAt);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);
            const timeDiffInMs = dueDateInMs - Date.now();
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);

            return dayDiff;
        },
        calculateBudget: (job , valueHour) => valueHour * job['total-hours'],

                         
    }
    
}


routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', profile.controllers.index );
routes.post('/profile', profile.controllers.update);

module.exports = routes;


