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
let url = "";
let alert = document.getElementById("alert");

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
  displaySpinner();
  fetch(link).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        addResInTag(data);
      });
    } else {
      showError(response.statusText);
    }
    hideSpinner();
  });
}

function addResInTag(data) {
  answer.innerText = data.result;
}

function displaySpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function showError(textError) {
  userInput.classList.add("text-danger");
  // , "is-invalid");
  alert.style.display = "block";
  alert.style.opacity = "1";
  answer.innerText = "";
  alert.innerText = textError;
  userInput.style.borderColor = "red";
}

function hideError() {
  userInput.classList.remove("text-danger");
  // , "is-invalid");
  alert.style.opacity = "0";
  answer.innerText = "";
  userInput.style.removeProperty("border-color");
}
calculate_btn.addEventListener("click", () => {
  gettingResult();
});

calculate_btn.addEventListener("blur", () => {
  hideError();
});
