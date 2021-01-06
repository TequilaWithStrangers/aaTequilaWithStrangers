let createCard = (event) => {
    return `
    <div class='event__details box grid-card dashCard'>

                    <div class="event__city"> Where? ${event.City.name}</div>
                    <div class="event__venue"> 📍 ${event.venue}</div>
                    <div class="event__address"> 🗺 ${event.address}</div>
                    <div class="event__date"> 📅 ${event.date}</div>
                    <div class="event__limit"> ${event.limit - event.numOfGuests} Seats Left</div>
                    <progress class="progress is-success" value='${event.numOfGuests}' max='${event.limit}'> ${(event.numOfGuests / event.limit) * 100}%</progress>
                    <div class="event__na"> 🤪 Attending ${event.numOfGuests} </div>
                    <a class='event-link button1' href='/events/${event.id}'> check it out</a>

    </div>
    `;
}

window.addEventListener("DOMContentLoaded", async () => {
    let token = localStorage.getItem('TEQ_ACCESS_TOKEN');
    if (!token) {
        window.location.href = "/log-in";
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    let userId = localStorage.getItem('TEQ_CURRENT_USER_ID');
    let data = await fetch('/dashboard/cities/' + `${userId}`)
    let { events, attEv, hEvents } = await data.json();
    let cEvents = document.getElementById('eventsInYourCity');
    let hostEvents = document.getElementById('host');
    let attendEvents = document.getElementById('attend');
    for (let i = 0; i < events.length - 1; i++) {
        let event = events[i];

        cEvents.innerHTML += createCard(event);
    }

    // if (cEvents.length > 0) {
    //     // cEvents.innerHTML += `<h2 class='eventsInCity'> Here are the Events in your city</h>`
    //     for (let i = 0; i < cEvents.length; i++) {
    //         let event = cEvents[i];
    //         cEvents.innerHTML += createCard(event);
    //     }
    // }
    if (hEvents.length > 0) {
        //hostEvents.innerHTML += `<h2 class='eventsHosting'> Here are the Events you are hosting</h>`
        for (let i = 0; i < hEvents.length; i++) {
            let event = hEvents[i];
            hostEvents.innerHTML += createCard(event);
        }
    }

    if(attEv.length > 0) {
        //attendEvents.innerHTML += `<h2 class= 'eventsAttending'> These are the Tequila Times you are currently attending</h>`
        for (let i = 0; i < attEv.length; i++) {
            let event = attEv[i];
            attendEvents.innerHTML += createCard(event);
        }
    }
    


})
