/* global data */
/* exported data */

var formElement = document.querySelector('form');
var titleEl = document.querySelector('#title');
var urlEl = document.querySelector('#url');
var notesEl = document.querySelector('#notes');
var newEntryImgEl = document.querySelector('#new-entry-image');
var entryHeadingEl = document.querySelector('.entry');
var formHeadingEl = document.querySelector('#form-heading');
var entriesListEl = document.querySelector('#entries-list');
var newEntryButton = document.querySelector('.new-button');
var entriesNavEl = document.querySelector('.entries-nav');
var inputElement = document.querySelector('#url');
var imgSource = document.querySelector('img');
var deleteButtonElement = document.querySelector('#delete-button');

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
  data.editing = null;
  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'container');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'hidden');
  entryHeadingEl.textContent = 'Entries';
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

function newEntryViewSwap(event) {
  data.view = 'entry-form';
  event.preventDefault();

  formView();
  deleteButtonDisplay();
  newEntryImgEl.setAttribute('src', 'images/placeholder-image-square.jpg');
  formHeadingEl.textContent = 'New Entry';
  formElement.reset();
}

newEntryButton.addEventListener('click', newEntryViewSwap);

function homeScreenViewSwap(event) {
  homeView();
}

entriesNavEl.addEventListener('click', homeScreenViewSwap);

function input(event) {
  imgSource.setAttribute('src', inputElement.value);
}

inputElement.addEventListener('input', input);

function save(event) {
  event.preventDefault();

  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].ID.toString() === data.editing) {
        data.entries[i].url = urlEl.value;
        data.entries[i].title = titleEl.value;
        data.entries[i].notes = notesEl.value;
        entriesListEl.children[i].replaceWith(createEntry(data.entries[i]));
      }
    }
    data.editing = null;

  } else if (data.editing === null) {
    var inputValue = {
      title: titleEl.value,
      url: urlEl.value,
      notes: notesEl.value,
      ID: data.nextEntryId
    };
    data.entries.unshift(inputValue);
    data.nextEntryId++;

    entriesListEl.prepend(createEntry(data.entries[0]));
  }
  newEntryImgEl.setAttribute('src', 'images/placeholder-image-square.jpg');
  formElement.reset();

  var entriesDivEl = document.querySelector('#entries-container');
  entriesDivEl.setAttribute('class', 'container');

  var entriesFormEl = document.querySelector('#entries-form-container');
  entriesFormEl.setAttribute('class', 'hidden');
  data.view = 'entries';
}

document.addEventListener('submit', save);

function editButtonClickEvent(event) {
  if (event.target.tagName === 'I') {
    data.editing = event.target.closest('li').getAttribute('data-entry-id');
    formView();
    deleteButtonDisplay();

    var titleEl = event.target.parentNode.querySelector('.title');
    formElement.title.value = titleEl.textContent;

    var imgEl = event.target.closest('li').querySelector('img');
    formElement.url.value = imgEl.currentSrc;

    var notesEl = event.target.parentNode.querySelector('.text');
    formElement.notes.value = notesEl.textContent;

    var urlSrc = formElement.querySelector('#url');
    newEntryImgEl.setAttribute('src', urlSrc.value);

    formHeadingEl.textContent = 'Edit Entry';
  }
}

entriesListEl.addEventListener('click', editButtonClickEvent);

function deleteButtonDisplay() {
  if (data.editing === null) {
    deleteButtonElement.className = 'hidden';
  } else if (data.editing !== null) {
    deleteButtonElement.className = 'delete-button-styles';
  }
}

function deleteButtonClickEvent(event) {
  event.preventDefault();
  document.querySelector('#modal').className = 'modal-overlay';
}

deleteButtonElement.addEventListener('click', deleteButtonClickEvent);

var modalCancelButton = document.querySelector('.modal-cancel-button');

function modalCancelButtonClickEvent(event) {
  event.preventDefault();
  document.querySelector('#modal').className = 'hidden';
}

modalCancelButton.addEventListener('click', modalCancelButtonClickEvent);

var modalConfirmButton = document.querySelector('.modal-confirm-button');

function modalConfirmButtonClickEvent(event) {
  document.querySelector('#modal').className = 'hidden';

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].ID.toString() === data.editing) {
      entriesListEl.children[i].remove();
      data.entries.splice(i, 1);
    }
  }
  homeView();
}

modalConfirmButton.addEventListener('click', modalConfirmButtonClickEvent);
