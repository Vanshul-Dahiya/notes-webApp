const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

//  get all notes from local storage and populate all notes
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  //  insert note one after another and before add button
  appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
  //  create a textarea and add class , placeholder and content to it
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "empty note";
  element.value = content;

  // delete the element when it is double clicked
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");

    if (warning) {
      deleteNote(id, element);
    }
  });

  //  update the note
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });
  return element;
}

function deleteNote(id, element) {
  // keep every note except for the one that is to be deleted
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}
function updateNote(id, content) {
  // first get all notes , then update
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];

  target.content = content;

  saveNote(notes);
}

function addNote() {
  //  instead of initializing an empty array, get all notes from inside local storage
  const notes = getNotes();

  //  create a object which contains a unique id and content of note
  const noteObj = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);

  //  insert the note in the DOM -> div tag in html
  appEl.insertBefore(noteEl, btnEl);

  // saves note in an array of notes
  notes.push(noteObj);

  // save in local storage
  saveNote(notes);
}

function saveNote(notes) {
  //  to save in local storage ,use setItem and give key - "note"
  localStorage.setItem("note", JSON.stringify(notes));
}

function getNotes() {
  //  local storage has string , convert it into an array
  //  if local storage is empty , return empty array
  return JSON.parse(localStorage.getItem("note") || "[]");
}

// add note button is pressed
btnEl.addEventListener("click", addNote);
