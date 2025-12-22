document.addEventListener("DOMContentLoaded", () => {
  const organizationForm = document.getElementById("organizationForm");
  const organizationManager = new Organization();

  organizationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const organizationData = {
      organizationName: document.getElementById("organization_name").value,
      organizationPosition: document.getElementById("organization_position")
        .value,
      organizationLocation: document.getElementById("organization_location")
        .value,
      organizationDuring: document.getElementById("organization_during").value,
    };

    const result = organizationManager.saveOrganization(organizationData);

    if (result.success) {
      return (window.location.href = "../organization.html");
    } else {
      console.log("gagal simpan data!");
    }

    console.log("berhasil tersubmit");
  });

  // view organization
  const existingOrganizations = organizationManager.getOrganizations();
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");
  const viewWrapper = document.getElementById("viewWrapper");

  function allDisplayOrganizations() {
    if (existingOrganizations.length === 0) {
      viewWrapper.className = "hidden";
    } else {
      viewWrapperEmpty.className = "hidden";
      existingOrganizations.forEach((organization) => {
        const itemOrganization = document.createElement("div");
        itemOrganization.className = "container";
        itemOrganization.innerHTML = `
          <div class="card-content visual-card">
              <div class="left-side-card">
                <h2 class="title-large">${organization.organizationName}</h2>
                <p class="label-large">${organization.organizationPosition}</p>
              </div>
              <div class="right-side-card">
                <p class="body-large">${organization.organizationDuring}</p>
                <p class="title-small">${organization.organizationLocation}</p>
              </div>
              <div class="btn-action">
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">edit</span>
                </a>
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
        `;
        viewWrapper.appendChild(itemOrganization);
      });
    }
  }
  allDisplayOrganizations();
});
