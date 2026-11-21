const params = new URLSearchParams(window.location.search);
const date = new Date(params.get("timestamp"));

document.querySelector("#first-name").textContent = params.get("firstName");
document.querySelector("#last-name").textContent = params.get("lastName");
document.querySelector("#email").textContent = params.get("email");
document.querySelector("#phone").textContent = params.get("phone");
document.querySelector("#organization").textContent = params.get("organization");
document.querySelector("#timestamp").textContent = date.toLocaleString();



console.log(date.toLocaleString());
