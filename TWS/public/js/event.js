// const {Event, User, City, Attendee} = require('../../models')
localStorage.setItem('TEQ_CURRENT_USER_ID', 1)
const loggedInUser = localStorage.getItem('TEQ_CURRENT_USER_ID');
const eventId = event();

document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.querySelector('.event__host-picture-container');
    const randomNum = Math.floor(Math.random()*8);
    const image = document.createElement('img');
    image.setAttribute('src', `../public/images/char-${randomNum}.png`);
    image.setAttribute('class', 'event__host-picture');
    container.appendChild(image);
    const passer = document.getElementById('hidden-form-user-id')
    passer.value = loggedInUser;
    // console.log(passer.value)

})


function event() {
    let index;
    for (let i = window.location.href.length -1; i > 0; i --) {
        if (window.location.href[i] === '/') {
            
            return window.location.href.slice(i + 1)
        }
    }
}