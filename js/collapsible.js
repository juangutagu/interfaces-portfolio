let coll = document.getElementsByClassName("collapsible");
let i;

function toggleActiveStyle(element) {
  let content = element.nextElementSibling;
  if (content.style.height) {
    content.style.height = null;
    element.style.setProperty("--transformDeg", "rotate(360deg)");
  } else {
    element.style.setProperty("--transformDeg", "rotate(450deg)");
    content.style.height = content.scrollHeight + "px";
    setTimeout(() => {
      content.style.height = "auto";
    }, 200);
  }
}

function checkActiveStyles() {
  for (let i = 0; i < $(".collapsible").length; i++) {
    const element = $(".collapsible")[i];

    if (element.classList.contains("active")) toggleActiveStyle(element);
  }
}

// on document ready -> comprobar clases
$(document).ready(() => {
  checkActiveStyles();
});

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    toggleActiveStyle(this);
  });
}
