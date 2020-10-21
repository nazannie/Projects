const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.7}s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};
navSlide();

const call = document.querySelector("#call");

call.addEventListener("click", () => {
  alert("Ani: +37496500056 Hayk: +37493155973");
});

let i = 0;
let title = "WE ARE THE TEAM";

function typingTitle() {
  if (i < title.length) {
    document.getElementById("team-title").innerHTML += title.charAt(i);
    i++;
    setTimeout(typingTitle, 100);
  }
}
typingTitle();

document.getElementById("");
