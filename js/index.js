function find_fib(n) {
  let prev = 0,
    next = 1;
  for (let i = 0; i < n; i++) {
    let temp = next;
    next = prev + next;
    prev = temp;
  }
  return prev;
}

// function find_fib(n) {
//   const a = (1 + 5 ** 0.5) / 2;
//   return Math.round(a ** n / 5 ** 0.5);
// }

let calculate_btn = document.getElementById("calculate");
let userInput = document.getElementById("user_input");
let answer = document.getElementById("answer");

let spinner = document.getElementById("spinner");
let spinner2 = document.getElementById("spinner2");
let url = "";
let alert = document.getElementById("alert");

let resultsUrl = "http://localhost:5050/getFibonacciResults";
let resultsUl = document.getElementById("results");
let isSaveRes = document.getElementById("saveRes");

let listOfResults = [];

let numAsc = document.getElementById("numAsc");
let numDesc = document.getElementById("numDesc");
let dateAsc = document.getElementById("dateAsc");
let dateDesc = document.getElementById("dateDesc");

function gettingResult() {
  url = `http://localhost:5050/fibonacci/${userInput.value}`;

  if (userInput.value > 50) {
    showError("Can`t be larger than 50");
    //userInput.value = "";
  } else {
    callServer(url);
  }
}
function callServer(link) {
  displaySpinner(spinner);
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        response.text().then((data) => {
          showError(data);
        });
        throw new Error(response.statusText);
      }
      response.json().then((data) => {
        addResInTag(data);
      });
    })
    .catch((error) => console.error("Houston, we have a problem: ", error));
  hideSpinner(spinner);
}

function addResInTag(data) {
  answer.innerText = data.result;
}

function displaySpinner(name) {
  name.style.display = "block";
}

function hideSpinner(name) {
  name.style.display = "none";
}

function showError(textError) {
  userInput.classList.add("text-danger");
  alert.style.display = " flex";
  alert.style.transition = "all 0.4s linear";
  alert.style.opacity = "1";
  answer.innerText = "";
  alert.innerText = textError;
  userInput.style.borderColor = "red";
}

function hideError() {
  userInput.classList.remove("text-danger");
  // , "is-invalid";
  alert.style.opacity = "0";
  alert.style.transition = "all 1s linear";
  answer.innerText = "";
  userInput.style.removeProperty("border-color");
}

function displayResults(obj) {
  const historyItem = document.createElement("li");
  const resDate = new Date(obj.createdDate);
  historyItem.innerHTML = `The Fibonacci of <strong>${obj.number}</strong>
   is <strong>${obj.result}</strong>. Calculated at: ${resDate} `;
  resultsUl.appendChild(historyItem);
}

function callList(url) {
  displaySpinner(spinner2);
  fetch(url).then((response) => {
    response.json().then((data) => {
      for (let item of data.results) {
        listOfResults.push(item);
        displayResults(item); // console.log(item);  answer <-
      }
    });
    hideSpinner(spinner2);
  });
}

calculate_btn.addEventListener("click", () => {
  if (isSaveRes.checked) {
    gettingResult();
    callList(resultsUrl);
  } else {
    answer.innerText = find_fib(userInput.value);
  }
});

calculate_btn.addEventListener("blur", () => {
  hideError();
});

window.onload = function () {
  callList(resultsUrl);
};

numAsc.addEventListener("click", (x) => sortMyData("numAsc"));
numDesc.addEventListener("click", (x) => sortMyData("numDesc"));
dateAsc.addEventListener("click", (x) => sortMyData("dateAsc"));
dateDesc.addEventListener("click", (x) => sortMyData("dateDesc"));

// function compareNumbers(a, b) {
//   // cases
//   return a.number - b.number;
// }
function sortMyData(howSort) {
  switch (howSort) {
    case "numAsc":
      listOfResults = listOfResults.sort((a, b) => a.number - b.number);
      break;
    case "numDesc":
      listOfResults = listOfResults.sort((a, b) => b.number - a.number);
      break;
    case "dateAsc":
      listOfResults = listOfResults.sort(
        (a, b) => a.createdDate - b.createdDate
      );
      break;
    case "dateDesc":
      listOfResults = listOfResults.sort(
        (a, b) => b.createdDate - a.createdDate
      );
      break;
  }

  console.log(listOfResults);
  let elem = document.getElementById("results");
  elem.textContent = "";

  listOfResults.forEach(displayResults);
}
