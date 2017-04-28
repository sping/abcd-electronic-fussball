const CronJob = require('cron').CronJob
const StatHelper = require('./helpers/StatHelper')

// Run it every day at midnight
const cronPattern = '0 0 0 * * *';
const job = new CronJob(cronPattern, StatHelper.calculateAllStats)
job.start()
