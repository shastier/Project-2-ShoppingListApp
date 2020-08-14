console.log('main.js is connected!');

function mouseOver(e){
    e.target.classList.add('colored_in');    
}
function mouseOut(e){
    e.target.classList.remove('colored_in');    
}

window.onload = function(){
    document.querySelector('#about').addEventListener('mouseover', mouseOver);
    document.querySelector('#about').addEventListener('mouseout', mouseOut);
    document.querySelector('#all').addEventListener('mouseover', mouseOver);
    document.querySelector('#all').addEventListener('mouseout', mouseOut);
    document.querySelector('#home').addEventListener('mouseover', mouseOver);
    document.querySelector('#home').addEventListener('mouseout', mouseOut);
};