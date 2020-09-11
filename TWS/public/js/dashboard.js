localStorage.setItem('TEQ_CURRENT_USER_ID',1);
let createCard = (event)=>{

    // div(class="event__details box grid-card")
    //         div(class="event__city") Where? #{event.City.name}
    //         div(class="event__venue") 📍 #{event.venue}
    //         div(class="event__address") 🗺 #{event.address}
    //         div(class="event__date") 📅 #{event.date}
    //         div(class="event__limit") #{event.limit - event.numOfGuests} Seats Left
    //         progress(class="progress is-success" value=`${event.numOfGuests}` max=event.limit) #{(event.numOfGuests / event.limit) * 100}%
    //         div(class="event__na") 🤪 Attending #{event.numOfGuests}
    //         div
    //             a(href=`http://localhost:8080/events/${event.id}`) check it out



    return `
    <div class='event__details box grid-card'>
        <div(class="event__city")> Where? ${event.City.name}</div>
        <div(class="event__venue")> 📍 ${event.venue}</div>
        <div(class="event__address")> 🗺 ${event.address}</div>
        <div(class="event__date")> 📅 ${event.date}</div>
        <div(class="event__limit")> ${event.limit - event.numOfGuests} Seats Left</div>
        <progress(class="progress is-success" value='${event.numOfGuests}' max=event.limit)> ${(event.numOfGuests / event.limit) * 100}%</progress>
        <div(class="event__na")> 🤪 Attending ${event.numOfGuests} </div>
        <div><a(href=\`http://localhost:8080/events/${event.id}\`)> check it out</a></div>
    </div>
    `

}
document.addEventListener('DOMContentLoaded',async ()=>{
    let userId = localStorage.getItem('TEQ_CURRENT_USER_ID');
    let events = await fetch('/dashboard/cities/'+`${userId}`)
    .then(res=>res.json());
    let cEvents = document.getElementById('eventsInYourCity');
    for(let i =0; i< events.length -1;i++){
        let event = events[i];
        cEvents.innerHTML+= createCard(event);
    }
    console.log(cEvents.innerHTML);




})