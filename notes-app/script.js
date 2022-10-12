const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote() {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class='notes'>
    <div class='tools'>
      <button class='edit'>
        <i class='fas fa-edit'></i>
      </button>
      <button class='delete'>
        <i class='fas fa-trash-alt'></i>
      </button>
    </div>
    <div class='main hidden'></div>

    <textarea></textarea>
  </div>
`;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const notesEl = note.querySelector(".notes");

  const mainEl = notesEl.querySelector(".main");
  const textArea = notesEl.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    console.log(value);
    mainEl.innerHTML = `<h3>${value}</h3>`;
  });
  document.body.appendChild(note);
}
