document.addEventListener("DOMContentLoaded", () => {
  const educationForm = document.getElementById("educationForm");
  const educationManager = new Education();

  educationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const educationData = {
      pendidikan: document.getElementById("pendidikan").value,
      jurusan: document.getElementById("jurusan").value,
      lamapendidikan: document.getElementById("lamapendidikan").value,
      lokasipendidikan: document.getElementById("lokasipendidikan").value,
    };

    const result = educationManager.saveEducation(educationData);

    if (result.success) {
      return (window.location.href = "../education.html");
    } else {
      console.log("proses simpan data gagal");
    }

    console.log("berhasil tersubmit");
  });

  // load education

  //    make instance from object education
  const myEducations = new Education();

  //   make variable form get all education
  const existingEducations = myEducations.getEducations();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllEducations() {
    if (existingEducations.length === 0) {
      viewWrapper.className = "hidden";
      console.log("tidak ada education tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      console.log("beberapa education tersedia dan siap ditampilkan");

      existingEducations.forEach((education) => {
        const itemEducation = document.createElement("div");
        itemEducation.className = "container";
        itemEducation.innerHTML = `
        <div class="card-content visual-card">
              <div class="left-side-card">
                <h2 class="title-large">${education.pendidikan}</h2>
                <p class="label-large">${education.jurusan}</p>
              </div>
              <div class="right-side-card">
                <p class="body-large">${education.lokasipendidikan}</p>
                <p class="title-small">${education.lamapendidikan}</p>
              </div>
              <div class="btn-action">
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">edit</span>
                </a>
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
        </div>
      `;

        viewWrapper.appendChild(itemEducation);
      });
    }
  }

  displayAllEducations();
});
