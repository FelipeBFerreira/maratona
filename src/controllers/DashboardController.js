const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
/**Açterando o retorno da function Get para receber um await e sempre que haver o uso do await necessitará do async */
   async index(req, res) {
        /** importando os valores de get e jogando na variavel criado */
        const jobs = Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";

            /** Somando a quantidade de status analisado vindo do map*/
            statusCount[status] += 1;

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            return { ...job, remaining, status, budget: JobUtils.calculateBudget(job, profile["value-hour"]) }
        })
        /**  Quantidade de horas disponivel para trabalhar em projeto em andamento ou em novos */
        const freeHours = profile['hours-per-day'] - jobTotalHours;

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount, freeHours: freeHours })
    }
}
