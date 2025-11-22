document.addEventListener("DOMContentLoaded", () => {
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

  // load courses

  //    make instance from object education
  const myCourses = new Course();

  //   make variable form get all education
  const existingCourses = myCourses.getCourses();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllCourses() {
    if (existingCourses.length === 0) {
      viewWrapper.className = "hidden";
      console.log("tidak ada course tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      console.log("beberapa course tersedia dan siap ditampilkan");

      existingCourses.forEach((course) => {
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
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">edit</span>
                </a>
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
        </div>
        `;

        viewWrapper.appendChild(itemCourse);
      });
    }
  }

  displayAllCourses();
});
