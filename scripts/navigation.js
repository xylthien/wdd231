const hamburger = document.querySelector("#ham-btn");
const navigation = document.querySelector("#nav-bar");

hamburger.addEventListener("click", () => {
    navigation.classList.toggle("show");
    hamburger.classList.toggle("show");
    hamburger.setAttribute("aria-expanded", navigation.classList.contains("show"));
})