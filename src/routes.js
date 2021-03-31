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

            },
        }   
}


const job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 60,
            createdAt: Date.now(),

        }, {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            createdAt: Date.now(),

        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = job.data.map((job) => {
                const remaining = remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress';
                return {
                    ...job,
                    remaining,
                    status,
                    budget: profile.data["value-hour"] * job['total-hours']
                }
            })
            return res.render(views + "index", { profile: profile.data, jobs: updatedJobs })
        },

        create(req, res) {
            return res.render(views + 'job');
        },

        save(req, res) {
            const lastId = job.data[job.data.length - 1]?.id || 1;
            /* ? comparativo para escolha caso o dados não seja encontrado*/
            /* Erro no Maik da aula*/
            job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now()
            });
            return res.redirect('/')
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
        }
    }
}

function remainingDays(job) {
    /* toFixed aredonda o numero */
    const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
    const createdDate = new Date(job.createdAt);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);
    const timeDiffInMs = dueDateInMs - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    return dayDiff;
}

/*Aula 2 da maratona begin Ajuste Job e calculo de hora*/
routes.get('/', job.controllers.index);
/*Aula 2 da maratona End*/
routes.get('/job', job.controllers.create);
/*Aula 2 da maratona begin  job id poderá ser visto usando o Status do javascript*/
routes.post('/job', job.controllers.save);
/*Aula 2 da maratona end */
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/profile', profile.controllers.index );
routes.post('/profile', profile.controllers.index );

module.exports = routes;