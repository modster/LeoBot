module.exports = async function (context, myTimer) {

    
    // Data which will need to add in a file.
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        console.info('JavaScript is running late!');
    }

    
};
