/* global data */
/* exported data */

var entriesListEl = document.querySelector('#entries-list');

function createEntry(entry) {
  var liEl = document.createElement('li');
  var divImgEl = document.createElement('div');
  var imgEl = document.createElement('img');
  var divEl = document.createElement('div');
  var ptitleEl = document.createElement('p');
  var ptextEl = document.createElement('p');
  var editIconEl = document.createElement('i');

  liEl.setAttribute('class', 'row');
  liEl.setAttribute('data-entry-id', entry.ID);
  divImgEl.setAttribute('class', 'column-half');
  imgEl.setAttribute('src', entry.url);
  divEl.setAttribute('class', 'column-half position-relative');
  ptitleEl.setAttribute('class', 'title');
  ptitleEl.textContent = entry.title;
  ptextEl.setAttribute('class', 'text');
  ptextEl.textContent = entry.notes;
  editIconEl.setAttribute('class', 'fa-solid fa-pencil');

  liEl.appendChild(divImgEl);
  divImgEl.appendChild(imgEl);
  liEl.appendChild(divEl);
  divEl.appendChild(ptitleEl);
  divEl.appendChild(ptextEl);
  divEl.appendChild(editIconEl);
  return liEl;
}

function homeView() {
  data.view = 'entries';
  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'container');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'hidden');
}

function formView() {
  data.view = 'entry-form';
  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'hidden');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'container');
}

function pageLoad(dataview) {
  if (data.view === 'entries') {
    homeView();
  } else if (data.view === 'entry-form') {
    formView();
  }
}

function contentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var addingToList = createEntry(data.entries[i]);

    entriesListEl.appendChild(addingToList);
  }

  pageLoad(data.view);

}

document.addEventListener('DOMContentLoaded', contentLoaded);

var newEntryButton = document.querySelector('.new-button');

function viewSwap(event) {
  data.view = 'entry-form';
  event.preventDefault();

  formView();
}

newEntryButton.addEventListener('click', viewSwap);

var entriesNavEl = document.querySelector('.entries-nav');

function homeScreenViewSwap(event) {
  homeView();
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

function clicksOnParentOfEntriesList(event) {
  if (event.target.tagName === 'I') {
    // console.log(event.target.parentNode.parentNode);
    // console.log(event.target.parentNode.parentNode.getAttribute('data-entry-id'));
    data.editing = event.target.closest('li').getAttribute('data-entry-id');
    // var entryID = event.target.closest('li').getAttribute('data-entry-id');
    // console.log(entryID);
    // console.log(event.target.previousSiblingElement);
    // console.log(event.target);
    //  console.log(event.target.parentNode.childNodes[0].textContent);
    // console.log(event.target.closest('li').childNodes[0].childNodes[0].currentSrc);
    formView();

    formElement['0'].value = event.target.parentNode.childNodes[0].textContent;
    formElement['1'].value = event.target.closest('li').childNodes[0].childNodes[0].currentSrc;
    formElement['2'].value = event.target.parentNode.childNodes[1].textContent;
  }
}

entriesListEl.addEventListener('click', clicksOnParentOfEntriesList);
