const goldBtn = document.querySelector("#gold-btn");
const goldDialog = document.querySelector("#gold-dialog");
goldBtn.addEventListener("click", function() {
    goldDialog.showModal();
});

const silverBtn = document.querySelector("#silver-btn");
const silverDialog = document.querySelector("#silver-dialog");
silverBtn.addEventListener("click", function() {
    silverDialog.showModal();
});

const bronzeBtn = document.querySelector("#bronze-btn");
const bronzeDialog = document.querySelector("#bronze-dialog");
bronzeBtn.addEventListener("click", function() {
    bronzeDialog.showModal();
});

const nonprofitBtn = document.querySelector("#nonprofit-btn");
const nonprofitDialog = document.querySelector("#nonprofit-dialog");
nonprofitBtn.addEventListener("click", function() {
    nonprofitDialog.showModal();
});

const closeButtons = document.querySelectorAll(".close");

function closeDialog(event) {
    event.currentTarget.closest("dialog").close();
}

closeButtons.forEach(button=> {
    button.addEventListener("click", closeDialog);
});