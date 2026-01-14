document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  // ---------------------------------Add Data----------------------------------------

  function addTask(
    selectorTaskList,
    classTaskItem,
    textAreaTask,
    btnRemoveTask
  ) {
    const taskList = document.querySelector(selectorTaskList);

    const newTaskItem = document.createElement("div");
    newTaskItem.className = classTaskItem;
    newTaskItem.innerHTML = `
      <textarea      
        cols="6"
        rows="2"
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sint harum tempora facilis, hic fugiat libero aspernatur similique quod itaque tempore animi nam porro quam. Harum sit non est beatae."
        required
        class="input-field margin-bottom-input ${textAreaTask}"></textarea>
      <button type="button" class="btn ${btnRemoveTask}">X</button>
    `;
    taskList.appendChild(newTaskItem);
  }
  document.getElementById("btn-add-task").addEventListener("click", () => {
    addTask(".task-list", "task-item", "organization-task", "btn-remove-task");
  });

  function removeTask(selectorBtn, selectorItem) {
    document.addEventListener("click", function (e) {
      const removeBtn = e.target.closest(selectorBtn);
      if (!removeBtn) return;

      const taskItem = removeBtn.closest(selectorItem);
      if (!taskItem) return;

      const taskList = taskItem.parentNode;

      const taskItemCount = taskList.querySelectorAll(selectorItem).length;

      if (taskItemCount > 1) {
        taskItem.remove();
      } else {
        alert("Hanya boleh minimal 1 tugas tersedia");
      }
    });
  }
  removeTask(".btn-remove-task", ".task-item");

  const organizationForm = document.getElementById("organizationForm");
  const organizationManager = new Organization();

  organizationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const organizationTasks = [];
    document.querySelectorAll(".organization-task").forEach((input) => {
      const nilaiTask = input.value;

      if (nilaiTask !== "") {
        organizationTasks.push(nilaiTask);
      }
    });

    const organizationData = {
      organizationName: document.getElementById("organization_name").value,
      organizationPosition: document.getElementById("organization_position")
        .value,
      organizationLocation: document.getElementById("organization_location")
        .value,
      organizationDuring: document.getElementById("organization_during").value,
      organizationTasks: organizationTasks,
    };

    const result = organizationManager.saveOrganization(organizationData);

    if (result.success) {
      return (window.location.href = "../organization.html");
    } else {
      console.log("gagal simpan data!");
    }

    console.log("berhasil tersubmit");
  });

  // ------------------------------view organization-----------------------------------

  const existingOrganizations = organizationManager.getOrganizations();
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");
  const viewWrapper = document.getElementById("viewWrapper");

  function allDisplayOrganizations(organizations = existingOrganizations) {
    viewWrapper.innerHTML = "";
    if (organizations.length === 0) {
      viewWrapper.className = "hidden";
      viewWrapperEmpty.className = "";
    } else {
      viewWrapperEmpty.className = "hidden";
      organizations.forEach((organization) => {
        const tasksHTML = organization.organizationTasks
          .map(
            (task) => `
            <li class="body-medium">${task.trim()}</li>
          `
          )
          .join("");

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
              <ul class="task-list-view card-text">
                ${tasksHTML}
              </ul>
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${organization.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${organization.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
        `;
        viewWrapper.appendChild(itemOrganization);
      });
    }
  }
  allDisplayOrganizations();

  //----------------------Edit Organization------------------------------

  // 1. open & close Modal
  function openModel() {
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

  // 2. Close Modal
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
    // 3. check btn-edit
    const btn = e.target.closest(".btn-edit");
    if (!btn) return;

    // 4. check data-id
    const id = btn.dataset.id;
    console.log("ID yang diklik ", id);

    // 5. find id in model
    const organizations = organizationManager.getOrganizations();
    const data = organizations.find((item) => item.id == id);

    // 6. matches data id
    if (!data) {
      console.log("Data tidak ditemukan: ", data);
    }
    console.log(data);

    // 7. open & view in modal
    openModel();

    document
      .getElementById("btn-add-taskModal")
      .addEventListener("click", () => {
        addTask(
          ".task-listModal",
          "task-itemModal",
          "organization-taskModal",
          "btn-remove-taskModal"
        );
      });

    removeTask(".btn-remove-taskModal", ".task-itemModal");

    document.getElementById("organization_nameModel").value =
      data.organizationName;
    document.getElementById("organization_positionModel").value =
      data.organizationPosition;
    document.getElementById("organization_locationModel").value =
      data.organizationLocation;
    document.getElementById("organization_duringModel").value =
      data.organizationDuring;

    const taskListModal = document.getElementById("taskListModal");
    taskListModal.innerHTML = "";

    const tasks = data.organizationTasks || [];

    if (tasks.length === 0) {
    } else {
      tasks.forEach((task) => {
        const taskItemModal = document.createElement("div");
        taskItemModal.className = "task-itemModal";
        taskItemModal.innerHTML = `
          <textarea
              cols="6"
              rows="2"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sint harum tempora facilis, hic fugiat libero aspernatur similique quod itaque tempore animi nam porro quam. Harum sit non est beatae."
              required
              class="input-field margin-bottom-input organization-taskModal">${task}</textarea>
          <button type="button" class="btn btn-remove-taskModal">X</button>
        `;
        taskListModal.appendChild(taskItemModal);
      });
    }

    // 8. set Editing ID
    localStorage.setItem("editingOrganizationId", data.id);
  });

  // 9. Update Data
  document.getElementById("btnUpdate").addEventListener("click", function () {
    id = localStorage.getItem("editingOrganizationId");

    const organizationModel = new Organization();

    const organizationTasksModal = [];

    document.querySelectorAll(".organization-taskModal").forEach((input) => {
      const nilaiTask = input.value;

      if (nilaiTask !== "") {
        organizationTasksModal.push(nilaiTask);
      }
    });
    if (organizationTasksModal === 0) {
      alert("Minimal isi 1 tugas!");
    }

    const newData = {
      id: id,
      organizationName: document.getElementById("organization_nameModel").value,
      organizationPosition: document.getElementById(
        "organization_positionModel"
      ).value,
      organizationLocation: document.getElementById(
        "organization_locationModel"
      ).value,
      organizationDuring: document.getElementById("organization_duringModel")
        .value,
      organizationTasks: organizationTasksModal,
    };

    organizationModel.updateOrganization(id, newData);
    closeModal();

    localStorage.removeItem("editingOrganizationId");

    const organization = organizationModel.getOrganizations();
    allDisplayOrganizations(organization);
  });

  // ------------------------Delete Data---------------------------------------

  let idDelete = null;
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;

    idDelete = btn.dataset.id;

    // console.log(idDelete);
    openDeleteModal();
  });

  const btnConfirm = document.getElementById("btnDelete");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      if (idDelete) {
        const result = organizationManager.deleteOrganization(idDelete);

        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");

          const organizations = organizationManager.getOrganizations();
          allDisplayOrganizations(organizations);

          if (organizations.length === 0) {
            localStorage.removeItem("organizations");
          }

          closeDeleteModal();
          idDelete = null;
        } else {
          alert(result.message || "Gagal menghapus data!");
        }
      }
    });
  }
});
