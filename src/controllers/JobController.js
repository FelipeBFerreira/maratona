const Job = require('../model/Job');
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

    async create(req, res) {

        const profile = await Profile.get();
        const freeHoures = await Job.gethoursFree();

        if (req.body["daily-hours"] <= ((profile["hours-per-day"]) - freeHoures.FreeHours)) {

            const message = "Você tem "+((profile["hours-per-day"]) - freeHoures.FreeHours) + " Hs Disponiveis"
            return res.render("job", { Mensagem: message })

        } else {

            const message = "Você tem "+((profile["hours-per-day"]) - freeHoures.FreeHours) + " Hs Disponiveis"
            return res.render("job", { Mensagem: message })

        }

        //return res.render('job', { Mensagem: message });
    },

    /** Usa a nova chamada gethoursFree para controlar o valor de horas antes de inserir o valor direto no SQLITE.
     *  Calculando o valor ja usando nos Job e subtraindo do valor total disponivel no perfil, 
     *  e com isso evitasse registra job sem tempo disponivel 
     * Begin
     */
    async save(req, res) {
        const profile = await Profile.get();
        const freeHoures = await Job.gethoursFree();

        if (req.body["daily-hours"] <= ((profile["hours-per-day"]) - freeHoures.FreeHours)) {

            await Job.create({
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
        } else {
            const message = "Voce informou: " + req.body["daily-hours"] + " Hs mais só tem disponivel " + ((profile["hours-per-day"]) - freeHoures.FreeHours)+" Hs"
            return res.render("job", { Mensagem: message })

        }

        return res.redirect('/')
    },
    /** End */

    async show(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get();

        const jobId = req.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));


        if (!job) {
            return res.send('Job not Found!');
        }
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render('job-edit', { job })
    },

    async update(req, res) {

        const jobId = req.params.id;

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    delete(req, res) {

        const jobId = req.params.id;
        Job.delete(jobId)
        res.redirect('/')
    }
};