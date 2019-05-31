const requests = document.querySelector(".reqs");

const xhr = new XMLHttpRequest();

const url = `http://localhost:3000/requests`;

function getRequests() {
    xhr.open("GET", url, true);
  
    xhr.onload = function() {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        let output = "";

        response.forEach( data => {
            output += `
            <br>
            <div><span class="current">Type: </span>${data["type"]}</div>
            <div><span class="current">Description: </span>${data["description"]}</div>
             <div class="two-btn mt-2">
            <button onclick="" class="btn-small btn-primary mb-1">
            Approve
        </button>
        <button onclick="" class="btn-small btn-danger mb-1">
          Decline
        </button>
      </div>
            <br>
            <hr>`
        });
        requests.innerHTML = output
      }
    };
    xhr.send();
  }