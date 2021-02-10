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
let newp = document.getElementById("answer");

calculate_btn.addEventListener("click", () => {
  callServer(`http://localhost:5050/fibonacci/${userInput.value}`);
});

function callServer(link) {
  fetch(link).then((response) => {
    response.json().then((data) => {
      newp.innerText = data.result;
    });
  });
}
