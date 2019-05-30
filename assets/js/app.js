const alert = document.querySelector(".alert");
const users = document.querySelector(".users");
const email = document.getElementById("email");
const signupBtn = document.getElementById("signup-btn");

let xhr = new XMLHttpRequest();

const url = `http://localhost:3000/users`;

function getUsers() {
  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status === 200) {
      users.innerHTML = this.responseText;
    }
  };
  xhr.send();
}

function validateEmail() {
  const employees = JSON.parse(users.innerHTML);
  console.log(employees);
  const emails = [];
  employees.forEach(employee => {
    emails.push(employee["email"]);
  });
  if ((emails.includes(email.value))) {
    alert.innerHTML = "Email is already taken";
    signupBtn.disabled = false;
  } else {
    alert.innerHTML = "";
    signupBtn.disabled = false;
  }
}
