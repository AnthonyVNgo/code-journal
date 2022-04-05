/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function saveToLocalStorage(event) {
  var dataModelJSON = JSON.stringify(data);
  localStorage.setItem('data model', dataModelJSON);
}

window.addEventListener('submit', saveToLocalStorage);

// function saveToLocalStorage(event) {
//   var dataModelJSON = JSON.stringify(data);
//   localStorage.setItem('data model', dataModelJSON);
// }

// window.addEventListener('beforeunload', saveToLocalStorage);
