document.addEventListener("DOMContentLoaded", () => {
  const experienceForm = document.getElementById("experienceForm");
  const experienceManager = new Experience();

  experienceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const experienceData = {
      companyName: document.getElementById("company_name").value,
      companyPosition: document.getElementById("company_position").value,
      companyLocation: document.getElementById("company_location").value,
      companyDuring: document.getElementById("company_during").value,
      companyTask: document.getElementById("company_task").value,
    };

    const result = experienceManager.saveExperience(experienceData);

    if (result.success) {
      return (window.location.href = "../experience.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  //Experience View
  const existingExperiences = experienceManager.getExperiences();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllExperiences() {
    if (existingExperiences.length === 0) {
    } else {
      viewWrapperEmpty.className = "hidden";
      existingExperiences.forEach((experience) => {
        const itemExperience = document.createElement("div");
        itemExperience.className = "container";
        itemExperience.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card">
                <h2 class="title-large">${experience.companyName}</h2>
                <p class="label-large">${experience.companyLocation}</p>
              </div>
              <div class="right-side-card margin-bottom-letter">
                <p class="body-large">${experience.companyPosition}</p>
                <p class="title-small">${experience.companyDuring}</p>
              </div>
              <span class="body-medium card-text">
                Led the development of a customer management system,
                resulting in improved efficiency and streamlined
                processes.
                </span>
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
        viewWrapper.appendChild(itemExperience);
      });
    }
  }
  displayAllExperiences();
});
