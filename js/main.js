/* global data */
/* exported data */

var inputElement = document.querySelector('#url');
// console.log(inputElement);

var imgSource = document.querySelector('img');

function input(event) {
  // console.log(inputElement.value);
  imgSource.setAttribute('src', inputElement.value);
}

inputElement.addEventListener('input', input);

var formElement = document.querySelector('form');

var titleEl = document.querySelector('#title');
var urlEl = document.querySelector('#url');
var notesEl = document.querySelector('#notes');

var entryNumber = data.nextEntryId;

var inputValue = {
  title: '',
  url: '',
  notes: '',
  ID: entryNumber
};

function submit(event) {
  inputValue.title = titleEl.value;
  inputValue.url = urlEl.value;
  inputValue.notes = notesEl.value;
  // inputValue.ID = entryNumber;
  inputValue.ID = data.nextEntryId;
  // entryNumber++;
  // console.log(entryNumber);
  // console.log(inputValue);
  data.entries.push(inputValue);
  // console.log(data);
  // event.preventDefault();
  data.nextEntryId++;
  formElement.reset();
}

document.addEventListener('submit', submit);
