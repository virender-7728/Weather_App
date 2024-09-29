let date = new Date()
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekdays[date.getDay()]
let monthdate = date.getDate()
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[date.getMonth()]
let hours = date.getHours()
let min = date.getMinutes()

let period = "AM"
if(hours > 11)
{
    period = "PM"
    if(hours > 12)
        hours-=12
}
if(min < 10)
{
    min = "0" + min
}

const generatedDate = `${day} | ${monthdate} ${month} | ${hours}:${min} ${period}`

module.exports = generatedDate