const id = Number(localStorage.getItem("id"));
const request = document.querySelector(".request");

let xhr = new XMLHttpRequest();

const url = `http://localhost:3000/requests`;

function getMyRequest() {
  const user = JSON.parse(localStorage.getItem('id'));
  if(!user) {
    window.location.href = './login.html';
  }
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

const update = (event) => {
  event.preventDefault();
  const leaveType = document.getElementById("mod-leave-type");

  
  const type = leaveType.options[leaveType.selectedIndex].value;
  const description = document.getElementById("mod-description");

  
  const url = `http://localhost:3000/requests/${id}`;

  const xhr = new XMLHttpRequest();
    
  xhr.open("PATCH", url, true);

  xhr.setRequestHeader("content-Type", "application/json");

  xhr.onload = function() {
    if (this.status === 200) {
      modal.style.display = "none";
      modal.style.display = "flex";
      reqEdit.classList.add("hidden");
      noReq.classList.remove("hidden");
      noReq.innerHTML = "Update Successful";
    }
  };
  const data = JSON.stringify({
    type: type,
    description: description.value,
  });
  xhr.send(data);
}

const closeModal = document.getElementById("close-modal");

closeModal.onclick = () => {
  modal.style.display = "none";
};

const del = () => {
   
  const url = `http://localhost:3000/requests/${id}`;

  const xhr = new XMLHttpRequest();
    
  xhr.open("DELETE", url, true);

  xhr.setRequestHeader("content-Type", "application/json");

  xhr.onload = function() {
    if (this.status === 200) {
      modal.style.display = "none";
      modal.style.display = "flex";
      reqModal.classList.add("hidden");
      noReq.classList.remove("hidden");
      noReq.innerHTML = "Request deleted successfully";
    }
  };
  xhr.send();
}