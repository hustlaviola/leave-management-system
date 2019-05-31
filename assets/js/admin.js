const requests = document.querySelector(".reqs");

const xhr = new XMLHttpRequest();
const users = [];

const url = `http://localhost:3000/requests`;

function getRequests() {
  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = "";

      response.forEach(data => {
        users.push(data);
        output += `
            <br>
            <div><span class="current">Type: </span>${data["type"]}</div>
            <div><span class="current">Description: </span>${
              data["description"]
            }</div>
            <div><span class="current">Status: </span>${data["status"]}</div>
             <div  id="${ data["id"]}"class="two-btn mt-2">
            <button onclick="approve(event)" class="btn-small btn-primary mb-1">
            Approve
        </button>
        <button onclick="decline(event)" class="btn-small btn-danger mb-1">
          Decline
        </button>
      </div>
            <br>
            <hr>`;
      });
      requests.innerHTML = output;
    }
  };
  xhr.send();
}

const approve = event => {
  const target = event.target;
  const id = target.parentNode.id;
  const url = `http://localhost:3000/requests/${id}`;


  xhr.open("PATCH", url, true);

  xhr.setRequestHeader("content-Type", "application/json");

  xhr.onload = function() {
    if (this.status === 200) {
    }
  };
  const data = JSON.stringify({
    status: "approved"
  });
  xhr.send(data);
};
