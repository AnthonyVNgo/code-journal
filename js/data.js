/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var savedDataModelJSON = localStorage.getItem('data model');

if (savedDataModelJSON !== null) {
  data = JSON.parse(savedDataModelJSON);
}

function saveToLocalStorage(event) {
  var dataModelJSON = JSON.stringify(data);
  localStorage.setItem('data model', dataModelJSON);
}

window.addEventListener('beforeunload', saveToLocalStorage);
