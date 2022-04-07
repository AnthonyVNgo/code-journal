/* global data */
/* exported data */

function createEntry(entry) {
  // var entriesListEl = document.querySelector('#entries-list');
  var liEl = document.createElement('li');
  var divImgEl = document.createElement('div');
  var imgEl = document.createElement('img');
  var divEl = document.createElement('div');
  var ptitleEl = document.createElement('p');
  var ptextEl = document.createElement('p');

  liEl.setAttribute('class', 'row');
  divImgEl.setAttribute('class', 'column-half');
  imgEl.setAttribute('src', entry.url);
  divEl.setAttribute('class', 'column-half');
  ptitleEl.setAttribute('class', 'title');
  ptitleEl.textContent = entry.title;
  ptextEl.setAttribute('class', 'text');
  ptextEl.textContent = entry.notes;

  liEl.appendChild(divImgEl);
  divImgEl.appendChild(imgEl);
  liEl.appendChild(divEl);
  divEl.appendChild(ptitleEl);
  divEl.appendChild(ptextEl);
  return liEl;
}

var entriesListEl = document.querySelector('#entries-list');

function showpage(dataview) {
  if (data.view === 'entries') {
    var entriesDivEl = document.querySelector('#entries-container');
    entriesDivEl.setAttribute('class', 'container');

    var entriesFormEl = document.querySelector('#entries-form-container');
    entriesFormEl.setAttribute('class', 'hidden');
  } else if (data.view === 'entry-form') {
    entriesDivEl = document.querySelector('#entries-container');
    entriesDivEl.setAttribute('class', 'hidden');

    entriesFormEl = document.querySelector('#entries-form-container');
    entriesFormEl.setAttribute('class', 'container');
  }
}

function contentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var addingToList = createEntry(data.entries[i]);
    entriesListEl.appendChild(addingToList);
  }

  showpage(data.view);

}

document.addEventListener('DOMContentLoaded', contentLoaded);

var newEntryButton = document.querySelector('.new-button');

function viewSwap(event) {
  data.view = 'entry-form';
  event.preventDefault();

  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'hidden');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'container');
}

newEntryButton.addEventListener('click', viewSwap);

var entriesNavEl = document.querySelector('.entries-nav');

function homeScreenViewSwap(event) {
  data.view = 'entries';

  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'container');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'hidden');
}

entriesNavEl.addEventListener('click', homeScreenViewSwap);

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
var newEntryImgEl = document.querySelector('#new-entry-image');

function save(event) {
  event.preventDefault();

  var inputValue = {
    title: titleEl.value,
    url: urlEl.value,
    notes: notesEl.value,
    ID: data.nextEntryId
  };

  data.entries.unshift(inputValue);
  data.nextEntryId++;
  newEntryImgEl.setAttribute('src', 'images/placeholder-image-square.jpg');
  formElement.reset();

  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'container');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'hidden');

  entriesListEl.prepend(createEntry(data.entries[0]));
  data.view = 'entries';
}

document.addEventListener('submit', save);
