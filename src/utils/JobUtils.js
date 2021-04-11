module.exports = {
    remainingDays(job) {
        /* toFixed aredonda o numero */
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
        const createdDate = new Date(job.created_at);
        const dueDay = createdDate.getDate() + Number(remainingDays);
        console.log(createdDate);
        const dueDateInMs = createdDate.setDate(dueDay);
        const timeDiffInMs = dueDateInMs - Date.now();
        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = Math.floor(timeDiffInMs / dayInMs);
        
        return dayDiff;
    },
    calculateBudget: (job , valueHour) => valueHour * job['total-hours'],
                 
}