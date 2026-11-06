document.getElementById("lastModified").innerHTML = document.lastModified;

const year = document.getElementById("currentYear");

const today = new Date();
year.innerHTML = today.getFullYear();