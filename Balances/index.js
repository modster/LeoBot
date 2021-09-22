module.exports = async function (context, myTimer) {

    // import fs module in which writeFile function is defined.
    const fsLibrary  = require('fs')
        
    // Data which will need to add in a file.
    let timeStamp = {
        "schedule":{
        },
        "scheduleStatus": {
            "last":"2016-10-04T10:15:00+00:00",
            "lastUpdated":"2016-10-04T10:16:00+00:00",
            "next":"2016-10-04T10:20:00+00:00"
        },
        "isPastDue":false
    }
    //var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        console.info('JavaScript is running late!');
    }
    

    // Write data in 'timeStamp.txt' .
    //fsLibrary.writeFile('timeStamp.txt', timeStamp, (error) => {
        // In case of a error throw err exception.
    //    if (error) throw err;
    fsLibrary.writeFile("timeStamp.json", JSON.stringify(timeStamp, null, 4), function(err){});
};
