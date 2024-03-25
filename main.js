import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://mobileapp-shoppingbasket-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const ulEl = document.getElementById("ul-el");

//reading from firebase
onValue(shoppingListInDB, function (snapshot) {
  let listArray = Object.values(snapshot.val()); //get list from firebase and covert to arrray and store in variable
  console.log(listArray);
  clearRenderedInput();
  let renderQ = "";
  //for loop for listArray
  for (let i = 0; i < listArray.length; i++) {
    console.log(listArray[i]);
    renderQ = listArray[i];

    renderInput(renderQ); //render all items from array
  }
});

btnEl.addEventListener("click", function () {
  if (inputEl.value === "") {
    console.log("empty");
  } else {
    let input = inputEl.value;
    push(shoppingListInDB, input);
    // console.log(input); //we dont want to logout 2x times, we do this in for loop in onValue

    // renderInput(input); //we dont need this becouse we rendering from database
    clearinputEl();
  }
});

function renderInput(itemInputEl) {
  ulEl.innerHTML += `<li>${itemInputEl}</li>`;
}

function clearRenderedInput() {
  ulEl.innerHTML = "";
}

function clearinputEl() {
  inputEl.value = "";
}
