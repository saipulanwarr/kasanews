const getDateTime = (gmt)=>{
    let today = new Date(gmt);
    let monthsName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    let date = ('0'+today.getDate()).slice(-2)+'-'+monthsName[today.getMonth()]+'-'+today.getFullYear();
    let time = ('0'+today.getHours()).slice(-2) + ':' + ('0'+today.getMinutes()).slice(-2) + ':' + ('0'+today.getSeconds()).slice(-2);
    let dateTime = date+' '+time;
    return dateTime;
};

export default getDateTime;