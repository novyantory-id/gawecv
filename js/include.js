function loadHTML(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error("Error loading file: ", err));
}

loadHTML("sidebar", "template-sidebar.html");
loadHTML("footer", "template-footer.html");
