function transitionToPage(href) {
  document.querySelector("body").style.opacity = 0;
  document.querySelector("body").style.transition = ".5s";
  setTimeout(function () {
    window.location.href = href;
  }, 500);
}

function markActive(current) {
  if (document.querySelector(".active"))
    document.querySelector(".active").classList.remove("active");
  document.querySelector(`.${current}`).classList.add("active");
}
