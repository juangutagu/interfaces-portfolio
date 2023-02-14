const projectsData = [
  { id: 2, path: "drag_n_drop", name: "Reciclaje (Drag and Drop)", image: "drag_n_drop" },
  { id: 1, path: "animations", name: "Animaciones", image: "animations" },
  { id: 3, path: "video", name: "Vídeo", image: "video" },
  { id: 4, path: "canvas", name: "Canvas", image: "canvas" },
  { id: 5, path: "arkanoid", name: "Arkanoid", image: "arkanoid" },
  { id: 6, path: "canvas_images", name: "Canvas imágenes", image: "canvas_images" },
];

const projectList = document.querySelector("#projectList");

projectsData.forEach((project) => {
  const projectItem = document.createElement("li");
  const projectLink = document.createElement("a");
  projectLink.setAttribute("class", "projectLink");
  projectLink.setAttribute("href", `/routes/proyectos/${project.path}`);
  projectLink.innerHTML = `
  <h3>${project.name}</h3>
  <img 
  src="/assets/proyectos/${project.image}.png" 
  alt="${project.name}" 
  width="225px" 
  height="250px"
  />
  `;
  projectItem.appendChild(projectLink);
  projectList.appendChild(projectItem);
});
