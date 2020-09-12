let button = document.querySelector('.sign-up-button')
let shotGlass = document.querySelector('.shot-glass-1');

button.addEventListener('mouseover', event =>{
    shotGlass.classList.remove('shot-glass-1')
    document.querySelector('.shot-glass-2').src = '../public/images/shot-glass.gif'
    shotGlass.classList.add('viewed');
})

button.addEventListener('mouseout', event => {
    shotGlass.classList.remove('viewed')
    shotGlass.classList.add('shot-glass-1');
    document.querySelector('.shot-glass-2').src='../public/images/shot-glass.gif'

})

