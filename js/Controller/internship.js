document.addEventListener("DOMContentLoaded", () => {
  const internshipForm = document.getElementById("internshipForm");
  const internshipManager = new Internship();

  internshipForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const internshipData = {
      companyInternship: document.getElementById("company_internship").value,
      positionInternship: document.getElementById("position_internship").value,
      addressInternship: document.getElementById("address_internship").value,
      yearInternship: document.getElementById("year_internship").value,
    };

    const result = internshipManager.saveInternship(internshipData);

    if (result.success) {
      return (window.location.href = "../internship.html");
    } else {
      console.log("proses simpan gagal");
    }
  });

  // load internship

  //    make instance from object education
  //   make variable form get all internship
  const existingInternship = internshipManager.getInternships();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllInternships() {
    if (existingInternship.length === 0) {
      viewWrapper.className = "hidden";
      console.log("tidak ada course tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      existingInternship.forEach((internship) => {
        const itemInternship = document.createElement("div");
        itemInternship.className = "container";

        itemInternship.innerHTML = `
          <div class="card-content visual-card">
              <div class="left-side-card">
                <h2 class="title-large">${internship.companyInternship}</h2>
                <p class="label-large">${internship.positionInternship}</p>
              </div>
              <div class="right-side-card">
                <p class="title-small">${internship.yearInternship}</p>
                <p class="body-large">${internship.addressInternship}</p>
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

        viewWrapper.appendChild(itemInternship);
      });

      console.log("beberapa course tersedia dan siap ditampilkan");
    }
  }

  displayAllInternships();
});
