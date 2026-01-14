document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  //Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  const courseForm = document.getElementById("courseForm");
  const courseManager = new Course();

  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const courseData = {
      kursus: document.getElementById("kursus").value,
      bidangKursus: document.getElementById("bidangkursus").value,
      tahunKursus: document.getElementById("tahunkursus").value,
      lokasiKursus: document.getElementById("lokasikursus").value,
    };

    console.log("berhasil diinput", courseData);

    const result = courseManager.saveCourse(courseData);

    if (result.success) {
      return (window.location.href = "../course.html");
    } else {
      console.log("proses simpan gagal.");
    }

    console.log("berhasil tersubmit");
  });

  // -------------------------View Courses---------------------------

  //   make variable form get all education
  const existingCourses = courseManager.getCourses();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllCourses(courses = existingCourses) {
    viewWrapper.innerHTML = "";
    if (courses.length === 0) {
      viewWrapper.className = "hidden";
      console.log("tidak ada course tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      // console.log("beberapa course tersedia dan siap ditampilkan");

      courses.forEach((course) => {
        const itemCourse = document.createElement("div");
        itemCourse.className = "container";

        itemCourse.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card">
                <h2 class="title-large">${course.kursus}</h2>
                <p class="label-large">${course.bidangKursus}</p>
              </div>
              <div class="right-side-card">
                <p class="body-large">${course.tahunKursus}</p>
                <p class="title-small">${course.lokasiKursus}</p>
              </div>
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${course.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${course.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
        </div>
        `;

        viewWrapper.appendChild(itemCourse);
      });
    }
  }

  displayAllCourses();

  //------------------------Edit Course--------------------------------
  function openModal() {
    document.getElementById("editModal").classList.remove("hidden");
    document.querySelector("article").classList.add("blur");
  }

  function openDeleteModal() {
    document.getElementById("deleteModal").classList.remove("hidden");
    document.querySelector("article").classList.add("blur");
  }

  function closeDeleteModal() {
    document.getElementById("deleteModal").classList.add("hidden");
    document.querySelector("article").classList.remove("blur");
  }

  function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
    document.querySelector("article").classList.remove("blur");
  }

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-close")) {
      closeModal();
      closeDeleteModal();
    }

    if (e.target.id === "editModal") {
      closeModal();
    }
  });

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-edit");
    if (!btn) return;

    const id = btn.dataset.id;
    // console.log("id diklik : ", id);

    const courses = courseManager.getCourses();
    const data = courses.find((item) => item.id == id);

    if (!data) {
      console.log("Data tidak ditemukan untuk: ", id);
      return;
    }

    // console.log(data);

    openModal();

    document.getElementById("kursusModal").value = data.kursus;
    document.getElementById("bidangkursusModal").value = data.bidangKursus;
    document.getElementById("tahunkursusModal").value = data.tahunKursus;
    document.getElementById("lokasikursusModal").value = data.lokasiKursus;
    localStorage.setItem("editingCourseId", data.id);
  });

  document.getElementById("btnUpdate").addEventListener("click", function () {
    const courseModel = new Course();

    const id = localStorage.getItem("editingCourseId");

    const newData = {
      id: id,
      kursus: document.getElementById("kursusModal").value,
      bidangKursus: document.getElementById("bidangkursusModal").value,
      tahunKursus: document.getElementById("tahunkursusModal").value,
      lokasiKursus: document.getElementById("lokasikursusModal").value,
    };

    courseModel.updateCourse(id, newData);

    closeModal();
    localStorage.removeItem("editingCourseId");
    // window.location.href = "../course.html";
    const course = courseModel.getCourses();
    displayAllCourses(course);
  });

  // -------------------------Delete Data--------------------------

  let idDelete = null;
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-delete");

    if (!btn) return;

    idDelete = btn.dataset.id;

    console.log(idDelete);

    openDeleteModal();
  });

  const btnConfirm = document.getElementById("btnDelete");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      if (idDelete) {
        const result = courseManager.deleteCourse(idDelete);

        console.log(result);

        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");
          closeDeleteModal();

          const courses = courseManager.getCourses();
          displayAllCourses(courses);

          if (courses.length === 0) {
            localStorage.removeItem("courses");
          }
        } else {
          alert(result.success || "Gagal menghapus data!");
        }
      }
    });
  }

});
