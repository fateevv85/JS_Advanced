function check() {

var name = document.querySelector('#name').value;
var tel = document.querySelector('#tel').value;



var nameRE = new RegExp('^[A-Za-zА-Яа-яЁё]*$', 'gi');
var telRe = new RegExp('7(\d{3})\d{3}-\d{4}', 'gi');
//[0-9]{3}
var inputName = document.querySelector('input#name');

//if check is false, red border appears
if (!nameRE.test(name)) {
    inputName.classList.add('false');
}
// console.log(name);
// console.log(nameRE.test(name));
console.log(tel);
console.log(telRe.test(tel));

document.querySelector('input[type="reset"]').addEventListener('click', reset);
//button 'reset' clears all classes 'false'
    function reset() {
        inputName.classList.remove('false');
    }
}

