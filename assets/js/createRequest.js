const leaveType = document.getElementById("leave-type");
const description = document.getElementById("description");
const alert = document.querySelector(".alert");


document.querySelector(".request-form").addEventListener("submit", event => {
    event.preventDefault();
    
  alert.innerHTML = "";

  const url = `http://localhost:3000/requests`;

  const xhr = new XMLHttpRequest();
    const type = leaveType.options[leaveType.selectedIndex].value;
    
    xhr.open("POST", url, true);

    xhr.setRequestHeader("content-Type", "application/json");

    xhr.onload = function() {
      if (this.status === 201) {
          alert.style.color = "green";
          alert.innerHTML = "Request received";
      }
    };
    const data = JSON.stringify({
      type: type,
      description: description.value,
      status: "pending"
    });
    xhr.send(data);
});