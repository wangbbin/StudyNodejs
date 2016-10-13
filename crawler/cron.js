var cronJob = require('cron').CronJob;
console.log(process.platform);
console.log(process.execPath);//当前 Node.js 进程的可执行文件路径
var job1 = new cronJob('* * * * * *', function(){
    console.log('每秒执行一次');
});
job1.start();

var job2 = new cronJob('*/5 * * * * *', function(){
    console.log('  每5秒执行一次');
});
job2.start();