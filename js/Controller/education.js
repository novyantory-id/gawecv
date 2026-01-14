document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

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
      const educations = educationManager.getEducations();
      displayAllEducations(educations);
      educationForm.reset();
    } else {
      console.log("proses simpan data gagal");
    }

    // console.log("berhasil tersubmit");
  });

  // load education

  //   make variable form get all education
  const existingEducations = educationManager.getEducations();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllEducations(educations = existingEducations) {
    viewWrapper.innerHTML = "";
    if (educations.length === 0) {
      viewWrapper.className = "hidden";
      viewWrapperEmpty.className = "";
      console.log("tidak ada education tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      viewWrapper.className = "";
      // console.log("beberapa education tersedia dan siap ditampilkan");

      educations.forEach((education) => {
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
                <button href="#" class="action-link btn-edit" data-id=${education.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${education.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
        </div>
      `;

        viewWrapper.appendChild(itemEducation);
      });
    }
  }

  displayAllEducations();

  //EDIT EDUCATION
  function openModal() {
    document.getElementById("editModal").classList.remove("hidden");
    document.querySelector("article").classList.add("blur");
  }

  function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
    document.querySelector("article").classList.remove("blur");
  }

  function openDeleteModal() {
    document.getElementById("deleteModal").classList.remove("hidden");
    document.querySelector("article").classList.add("blur");
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").classList.add("hidden");
    document.querySelector("article").classList.remove("blur");
  }

  //klik close modal
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-close")) {
      closeModal();
      closeDeleteModal();
    }

    if (e.target.id === "editModal") {
      closeModal();
    }
  });

  // tampil edit data
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-edit");
    if (!btn) return;

    const id = btn.dataset.id;
    console.log("id yang diklik: ", id);

    const educations = educationManager.getEducations();

    const data = educations.find((item) => item.id == id);

    if (!data) {
      console.log("data tidak ditemukan untuk ID: ", id);
      return;
    }

    console.log(data);

    openModal();

    document.getElementById("pendidikanModal").value = data.pendidikan;
    document.getElementById("jurusanModal").value = data.jurusan;
    document.getElementById("lamapendidikanModal").value = data.lamapendidikan;
    document.getElementById("lokasipendidikanModal").value =
      data.lokasipendidikan;

    localStorage.setItem("editingEducationId", data.id);
  });

  document.getElementById("btnUpdate").addEventListener("click", function () {
    const educationModel = new Education();
    const id = localStorage.getItem("editingEducationId");

    const newData = {
      id: id,
      pendidikan: document.getElementById("pendidikanModal").value,
      jurusan: document.getElementById("jurusanModal").value,
      lamapendidikan: document.getElementById("lamapendidikanModal").value,
      lokasipendidikan: document.getElementById("lokasipendidikanModal").value,
    };

    educationModel.updateEducation(id, newData);

    closeModal();
    localStorage.removeItem("editingEducationId");
    // window.location.href = "../education.html";
    // existingEducations = educationModel.getEducations();
    // displayAllEducations();
    const updateEducations = educationModel.getEducations();
    displayAllEducations(updateEducations);
  });

  // -----------------------------Delete Data---------------------------------------
  let idDelete = null;
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;

    idDelete = btn.dataset.id;
    openDeleteModal();
  });

  const btnConfirm = document.getElementById("btnDelete");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      if (idDelete) {
        const result = educationManager.deleteEducation(idDelete);

        // console.log(result);

        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");

          const educations = educationManager.getEducations();
          displayAllEducations(educations);

          if (educations.length === 0) {
            localStorage.removeItem("educations");
          }

          closeDeleteModal();
          idDelete = null;
        } else {
          alert(result.success || "Gagal menghapus data!");
          closeDeleteModal();
        }
      }
    });
  }
});


