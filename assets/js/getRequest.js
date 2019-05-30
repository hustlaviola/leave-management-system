const id = localStorage.getItem("id");
const request = document.querySelector(".request");

let xhr = new XMLHttpRequest();

const url = `http://localhost:3000/requests`;

function getMyRequest() {
    xhr.open("GET", url, true);
  
    xhr.onload = function() {
      if (this.status === 200) {
        request.innerHTML = this.responseText;
      }
    };
    xhr.send();
}
