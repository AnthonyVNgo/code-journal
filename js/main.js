/* global data */
/* exported data */

var inputElement = document.querySelector('#url');
// console.log(inputElement);

var imgSource = document.querySelector('img');

function input() {
  // console.log(inputElement.value);
  imgSource.setAttribute('src', inputElement.value);
}

inputElement.addEventListener('input', input);
