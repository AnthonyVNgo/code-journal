/* global data */
/* exported data */

var inputElement = document.querySelector('#url');
var imgSource = document.querySelector('img');

function input(event) {
  imgSource.setAttribute('src', inputElement.value);
}

inputElement.addEventListener('input', input);

var formElement = document.querySelector('form');
var titleEl = document.querySelector('#title');
var urlEl = document.querySelector('#url');
var notesEl = document.querySelector('#notes');

function submit(event) {
  event.preventDefault();

  var inputValue = {
    title: titleEl.value,
    url: urlEl.value,
    notes: notesEl.value,
    ID: data.nextEntryId
  };

  data.entries.unshift(inputValue);
  data.nextEntryId++;
  formElement.reset();
}

document.addEventListener('submit', submit);
