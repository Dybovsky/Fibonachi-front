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

const num = 7;
let answer = find_fib(num);

let newp = document.createElement("p");
newp.id = "answer";
newp.innerText = `Fibbonachi of ${num} is ${answer}`;
document.body.appendChild(newp);
