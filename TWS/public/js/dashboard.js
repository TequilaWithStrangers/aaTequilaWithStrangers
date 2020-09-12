// localStorage.setItem('TEQ_CURRENT_USER_ID',1);
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


let url = `http://localhost:8080/events/${event.id}`;
console.log(url);
    return `
    <div class='event__details box grid-card dashCard'>

                    <div class="event__city"> Where? ${event.City.name}</div>
                    <div class="event__venue"> 📍 ${event.venue}</div>
                    <div class="event__address"> 🗺 ${event.address}</div>
                    <div class="event__date"> 📅 ${event.date}</div>
                    <div class="event__limit"> ${event.limit - event.numOfGuests} Seats Left</div>
                    <progress class="progress is-success" value='${event.numOfGuests}' max=event.limit)> ${(event.numOfGuests / event.limit) * 100}%</progress>
                    <div class="event__na"> 🤪 Attending ${event.numOfGuests} </div>
                    <a class='event-link' href='http://localhost:8080/events/${event.id}'> check it out</a>

    </div>
    `;

// <div class='event__details box grid-card'>
//         <div>
//                 <div>
//                     <div class="event__city"> Where? ${event.City.name}</p>
//                     <p class="event__venue"> 📍 ${event.venue}</p>
//                     <p class="event__address"> 🗺 ${event.address}</p>
//                     <p class="event__date"> 📅 ${event.date}</p>
//                     <p class="event__limit"> ${event.limit - event.numOfGuests} Seats Left</p>
//                     <progressclass="progress is-success" value='${event.numOfGuests}' max=event.limit)> ${(event.numOfGuests / event.limit) * 100}%</progress>
//                     <p class="event__na"> 🤪 Attending ${event.numOfGuests} </p>
//                     <a class='event-link' href='http://localhost:8080/events/${event.id}'> check it out</a>
//                 </div>
//             </div>
//     </div>
//     `
}
document.addEventListener('DOMContentLoaded',async ()=>{
    let userId = localStorage.getItem('TEQ_CURRENT_USER_ID');
    let data = await fetch('/dashboard/cities/'+`${userId}`)
    let {events, aEvents} = await data.json();
    let cEvents = document.getElementById('eventsInYourCity');
    for(let i =0; i< events.length -1;i++){
        let event = events[i];
        cEvents.innerHTML+= createCard(event);
    }




})
