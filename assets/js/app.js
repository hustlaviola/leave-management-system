const alert = document.querySelector(".alert");
const users = document.querySelector(".users");
const email = document.getElementById("email");
const signupBtn = document.getElementById("signup-btn");

const fName = document.getElementById("firstname");
const lName = document.getElementById("lastname");
const password = document.getElementById("password");
const cPassword = document.getElementById("confirmpassword");

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

document.querySelector(".auth-form").addEventListener("submit", event => {
  event.preventDefault();
  
  alert.innerHTML = "";

  if (password.value !== cPassword.value) {
    alert.innerHTML = "mismatch password";
    return;
  }
  const url = `http://localhost:3000/users`;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("content-Type", "application/json");

  xhr.onload = function() {
    if (this.status === 201) {
      window.location.href = './login.html';
    }
  };
  const data = JSON.stringify({firstname: fName.value, lastname: lName.value, email: email.value, password: password.value, role: "employee" });
  xhr.send(data);
});

