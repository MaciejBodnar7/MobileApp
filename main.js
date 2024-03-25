import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
  if (snapshot.exists()) {
    let listArray = Object.entries(snapshot.val()); //get list from firebase and covert to arrray and store in variable
    console.log(listArray);

    clearRenderedInput();

    let renderQ = "";
    //for loop for listArray
    for (let i = 0; i < listArray.length; i++) {
      renderQ = listArray[i]; //Keys and Value here becuse Object is set up to entries | let listArray = Object.entries(snapshot.val());
      let currentItemId = renderQ[0]; //first item in array is key
      let currentItemValue = renderQ[1]; //second item in array is value eg. Bread, eggs

      renderInput(renderQ); //render all items from array
    }
  } else {
    ulEl.innerHTML = "No item here... Yet";
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

function renderInput(item) {
  // ulEl.innerHTML += `<li>${itemInputEl}</li>`;
  let itemId = item[0]; //item in this case is renderQ that contain array and on index 0 has keys and on index 1 has values
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  //remove on doubleclick
  newEl.addEventListener("dblclick", function () {
    let locationOfItemInDB = ref(database, `shoppingList/${itemId}`);

    remove(locationOfItemInDB);
  });

  ulEl.append(newEl);
}

function clearRenderedInput() {
  ulEl.innerHTML = "";
}

function clearinputEl() {
  inputEl.value = "";
}
