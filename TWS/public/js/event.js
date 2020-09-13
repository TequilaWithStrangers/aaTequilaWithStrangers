document.addEventListener('DOMContentLoaded', async ()=>{
    const loggedInUser = localStorage.getItem('TEQ_CURRENT_USER_ID');
    const container = document.querySelector('.event__host-picture-container');
    const randomNum = Math.floor(Math.random()*8);
    const image = document.createElement('img');
    const thisEvent = whatEvent();
    
    //Rendering Random Profile Cartoon
    image.setAttribute('src', `../public/images/char-${randomNum}.png`);
    image.setAttribute('class', 'event__host-picture');
    container.appendChild(image);
    
    //Passing Logged in user id for Join Button
    const passer = document.getElementById('hidden-form-user-id');
    passer.value = loggedInUser;

    //Finds the event id via url
    function whatEvent() {
        let index;
        for (let i = window.location.href.length -1; i > 0; i --) {
            if (window.location.href[i] === '/') {
                return window.location.href.slice(i + 1)
            }
        }
    }
    //determines button is join or leave event
    const attending = await fetch(`/events/who-is-logged/${loggedInUser}/${thisEvent}`)
    .then(res => res.json())
    // .then(res=> console.log(res))
    console.log(attending[1].numOfGuests >= attending[1].limit)
    if (attending[1].numOfGuests >= attending[1].limit){
    const joinButton = document.querySelector('.event-join-button');
    joinButton.innerHTML = 'Tequila Time Full';
    joinButton.setAttribute('class', 'event-join-button button is-large disabled');
    joinButton.disabled = true;
    joinForm.setAttribute('href', './events')
    }else if (attending[0][0].id){
            const joinButton = document.querySelector('.event-join-button');
            joinButton.innerHTML = 'Leave Tequila Time';
            joinForm = document.querySelector('.join-button-form');
            joinForm.setAttribute('action', `/events/leave/${loggedInUser}/${thisEvent}`)
    }
})


