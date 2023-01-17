const products = [
  {
    iconName: "box",
    productName: "Caja",
    bin: "blue",
  },
  {
    iconName: "milk",
    productName: "Leche",
    bin: "yellow",
  },
  {
    iconName: "organic",
    productName: "Restos",
    bin: "grey",
  },
  {
    iconName: "waterbottle",
    productName: "Agua",
    bin: "yellow",
  },
  {
    iconName: "newspaper",
    productName: "Periodico",
    bin: "blue",
  },
  {
    iconName: "jar",
    productName: "Bote de cristal",
    bin: "green",
  },
  {
    iconName: "winebottle",
    productName: "Vino",
    bin: "green",
  },
];

// TODO: contar maxItems automático
const bins = [
  { name: "Amarillo", color: "yellow", maxItems: 2 },
  { name: "Azul", color: "blue", maxItems: 2 },
  { name: "Gris", color: "grey", maxItems: 1 },
  { name: "Verde", color: "green", maxItems: 2 },
];
let correct = 0;
let total = 0;

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainButton = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const droppableBins = document.querySelector(".droppable-bins");
let draggableElements;
let droppableElements;

startGame();

function startGame() {
  // Crear productos
  // TODO: coger los productos en orden aleatorio
  for (let i = 0; i < products.length; i++) {
    draggableItems.insertAdjacentHTML(
      "beforeend",
      `<img 
        class="draggable"
        draggable="true"
        src="assets/${products[i].iconName}.png"
        id="${products[i].iconName}"
        productName="${products[i].iconName}"
        productBin="${products[i].bin}"
        />`
    );
  }

  // Crear contenedores
  for (let i = 0; i < bins.length; i++) {
    droppableBins.insertAdjacentHTML(
      "beforeend",
      `
      <div class="droppable-bin">
        <span class="label">
          <img draggable="false" src="assets/bins/${bins[i].color}.png" />
        </span>
        <span class="droppable" data-bin="${bins[i].color}" maxItems="${bins[i].maxItems}"></span>
      </div>
    `
    );
  }

  // Añadir eventos de drag n drop
  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");

  draggableElements.forEach((elem) => {
    elem.addEventListener("dragstart", dragStart);
  });

  droppableElements.forEach((elem) => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// Event al coger un producto

function dragStart(event) {
  event.dataTransfer.setData("productId", event.target.id);
  event.dataTransfer.setData("productBin", event.target.getAttribute("productBin"));
}

// Events al soltar un producto

function dragEnter(event) {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");

  const draggableElementId = event.dataTransfer.getData("productId");
  const draggableElementBin = event.dataTransfer.getData("productBin");
  const droppableElementBin = event.target.getAttribute("data-bin");

  const isCorrectMatching = draggableElementBin === droppableElementBin;
  total++;

  if (isCorrectMatching) {
    // Obtiene el draggable y le incluye la imagen
    const draggableElement = document.getElementById(draggableElementId);
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `${event.target.innerHTML} <img src="assets/${draggableElement.id}.png"/>`;

    // Si ya hemos arrastrado todos los productos de esa bin
    const maxItems = event.target.getAttribute("maxItems");
    const currentItems = event.target.querySelectorAll("img").length;
    if (currentItems >= maxItems) {
      event.target.classList.add("dropped");
    }
    correct++;
  }

  // Actualiza el resultado
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);

  // Si ya ha movido todos
  if (correct === products.length) {
    playAgainButton.style.display = "block";
    setTimeout(() => {
      playAgainButton.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Volver a empezar
playAgainButton.addEventListener("click", playAgainButtonClick);
function playAgainButtonClick() {
  playAgainButton.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  droppableBins.style.opacity = 0;

  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);

  setTimeout(() => {
    playAgainButton.style.display = "none";
    while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
    while (droppableBins.firstChild) droppableBins.removeChild(droppableBins.firstChild);
    startGame();

    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    droppableBins.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}
