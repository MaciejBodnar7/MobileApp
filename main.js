import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://mobileapp-shoppingbasket-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const ulEl = document.getElementById("ul-el");

btnEl.addEventListener("click", function () {
  if (inputEl.value === "") {
    console.log("empty");
  } else {
    let input = inputEl.value;
    push(shoppingListInDB, input);
    console.log(input);

    renderInput(input);
    clearinputEl();
  }
});

function renderInput(itemInputEl) {
  ulEl.innerHTML += `<li>${itemInputEl}</li>`;
}

function clearinputEl() {
  inputEl.value = "";
}
