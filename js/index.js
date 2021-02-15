// function find_fib(n) {
//   let prev = 0,
//     next = 1;
//   for (let i = 0; i < n; i++) {
//     let temp = next;
//     next = prev + next;
//     prev = temp;
//   }
//   return prev;
// }

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

function gettingResult() {
  url = `http://localhost:5050/fibonacci/${userInput.value}`;
  console.log(userInput.value);
  if (userInput.value > 50) {
    showError("Can`t be larger than 50");
    //userInput.value = "";
  } else {
    callServer(url);
  }
}

function callServer(link) {
  displaySpinner(spinner);
  fetch(link).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        addResInTag(data);
      });
    } else {
      showError(response.statusText);
    }
    hideSpinner(spinner);
  });
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
  alert.style.display = "block";
  alert.style.opacity = "1";
  answer.innerText = "";
  alert.innerText = textError;
  userInput.style.borderColor = "red";
}

function hideError() {
  userInput.classList.remove("text-danger");
  // , "is-invalid";
  alert.style.opacity = "0";
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
        displayResults(item); // console.log(item);  answer <-
      }
    });
    hideSpinner(spinner2);
  });
}

calculate_btn.addEventListener("click", () => {
  gettingResult();
  callList(resultsUrl);
});

calculate_btn.addEventListener("blur", () => {
  hideError();
});

window.onload = function () {
  callList(resultsUrl);
};
