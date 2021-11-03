function memorize(current, next) {
  localStorage.setItem("current", current);
  localStorage.setItem("next", next);
}

function transitionToPage(href) {
  document.querySelector("body").style.opacity = 0;
  document.querySelector("body").style.transition = ".5s";
  setTimeout(function () {
    window.location.href = href;
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").style.opacity = 1;
  document.querySelector("body").style.transition = ".5s";
  if (document.URL != localStorage.getItem("current")) {
    document
      .querySelector(localStorage.getItem("next"))
      .classList.add("active");
    document
      .querySelector(
        `.${localStorage.getItem("current").slice(57).replace(".html", "")}`
      )
      .classList.remove("active");
  }
});
