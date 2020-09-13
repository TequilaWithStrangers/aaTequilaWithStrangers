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
    if (hEvents) {
        hostEvents.innerHTML += `<h2 class= 'div-events color-me size-me'> Here are the Events you are hosting</h>`
    }
    for (let i = 0; i < hEvents.length; i++) {
        let event = hEvents[i];
        hostEvents.innerHTML += createCard(event);
    }
    console.log(attEv);

    for (let i = 0; i < attEv.length; i++) {
        let event = attEv[i];
        attendEvents.innerHTML += createCard(event);
    }


})
