const Database = require('../db/config');
const Profile = require("../model/Profile")

module.exports = {
    async get() {
        const db = await Database();
        /** RETORNA TODOS OS VALORES DO BANCO DE DADOS */
        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close

        return jobs.map((job) => ({

            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at,

        }));
    },
    async update(updatedJob, jobId) {
        const db = await Database();

        await db.run(`
        UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = "${updatedJob["daily-hours"]}",
        total_hours = "${updatedJob["total-hours"]}"

        WHERE id = ${jobId}

        `)

        await db.close();

    },
    async delete(id) {
        const db = await Database();

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close();

    },

    /*Pendencia do inicio da aula*/
    async create(newJob) {

        const db = await Database();

        await db.run(`INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at) VALUES( 
                "${newJob.name}", 
                ${newJob["daily-hours"]},
                ${newJob["total-hours"]},
                ${newJob.created_at}
                )`);


        await db.close();

    },
    
/** Implementado um controle do valor de disponivel de horas para registrar novo job com base no que foi definido no perfil do usuario 
 * Begin
 */
    async gethoursFree() {

        const db = await Database();
        /** RETORNA TODOS OS VALORES DO BANCO DE DADOS */
       const Hours = await db.get(`SELECT SUM(daily_hours) as "FreeHours" FROM jobs WHERE total_hours >= 1`);

        await db.close
        return Hours

    }
/** End */
}