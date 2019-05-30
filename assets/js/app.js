const alert = document.querySelector(".alert");
const users = document.querySelector(".users");

let xhr = new XMLHttpRequest();

const url = `http://localhost:3000/users`;

function getUsers() {
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if(this.status === 200) {
      users.innerHTML = this.responseText;
    }
  }
  xhr.send()
}
