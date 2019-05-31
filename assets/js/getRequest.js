const id = Number(localStorage.getItem("id"));
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

const modal = document.getElementById("modal");
const reqModal = document.getElementById("req-modal");
const reqType = document.getElementById("req-type");
const reqDescription = document.getElementById("req-description");
const reqStatus = document.getElementById("req-status");
const noReq = document.getElementById("no-req");
const reqEdit = document.getElementById("req-edit");

const reset = () => {
  if (!reqModal.classList.contains("hidden")) {
    reqModal.classList.add("hidden");
  }
  if (!noReq.classList.contains("hidden")) {
    noReq.classList.add("hidden");
  }
  reqType.innerHTML = "";
  reqDescription.innerHTML = "";
  reqStatus.innerHTML = "";
};

const getRequest = () => {
  reset();
  modal.style.display = "flex";
  const reqs = JSON.parse(request.innerHTML);

  const ids = [];
  reqs.forEach(req => {
    ids.push(req["requester"]);
  });
  if (!ids.includes(id)) {
    noReq.classList.remove("hidden");
    noReq.innerHTML = "You have no leave request";
  } else {
    reqs.forEach(req => {
      if (req["requester"] === id) {
        reqModal.classList.remove("hidden");
        reqType.innerHTML = req["type"];
        reqDescription.innerHTML = req["description"];
        reqStatus.innerHTML = req["status"];
      }
    });
  }
};

const edit = () => {
  reset();
  modal.style.display = "flex";
  reqEdit.classList.remove("hidden");
}

