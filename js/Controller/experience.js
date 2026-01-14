document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  // Btn + add task
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
    addTask(".task-list", "task-item", "company-task", "btn-remove-task");
  });

  // Button - Remove Task
  function removeTask(buttonSelector, itemSelector, listSelector) {
    document.addEventListener("click", function (e) {
      // Cari tombol yang punya class btn-remove-task
      const removeBtn = e.target.closest(buttonSelector);
      if (!removeBtn) return;

      // alert("tombol hapus terdeteksi!");

      // Ambil baris tugas (div.task-item)
      const taskItem = removeBtn.closest(itemSelector);
      if (!taskItem) return;

      // Ambil container daftar tugas
      const tasksList = taskItem.parentNode; // Langsung parent, lebih cepat lebih pasti

      // Hitung jumlah baris tugas
      const taskItemsCount = tasksList.querySelectorAll(itemSelector).length;

      //dont delete if only one task(min 1)
      if (taskItemsCount > 1) {
        taskItem.remove();
      } else {
        alert("Minimal harus ada 1 tugas!");
      }
    });
  }
  removeTask(".btn-remove-task", ".task-item", "task-list");

  // ---------------------------------------------------------------------------------

  const experienceForm = document.getElementById("experienceForm");
  const experienceManager = new Experience();

  experienceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const companyTasks = [];
    document.querySelectorAll(".company-task").forEach((input) => {
      const nilaiTask = input.value;

      if (nilaiTask !== "") {
        companyTasks.push(nilaiTask);
      }
    });

    const experienceData = {
      companyName: document.getElementById("company_name").value,
      companyPosition: document.getElementById("company_position").value,
      companyLocation: document.getElementById("company_location").value,
      companyDuring: document.getElementById("company_during").value,
      companyTasks: companyTasks,
    };

    const result = experienceManager.saveExperience(experienceData);

    if (result.success) {
      return (window.location.href = "../experience.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  //--------------------------Experience View------------------------------

  const existingExperiences = experienceManager.getExperiences();

  const viewWrapper = document.getElementById("viewWrapper");
  const viewWrapperEmpty = document.getElementById("viewWrapperEmpty");

  function displayAllExperiences(experiences = existingExperiences) {
    viewWrapper.innerHTML = "";
    if (experiences.length === 0) {
      viewWrapper.className = "hidden";
      viewWrapperEmpty.className = "";
    } else {
      viewWrapperEmpty.className = "hidden";
      experiences.forEach((experience) => {
        const tasksHTML = experience.companyTasks
          .map(
            (task) => `
        <li class="body-medium">${task.trim()}</li>
        `
          )
          .join("");
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
              <ul class="task-list-view card-text">
                ${tasksHTML}
              </ul>
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${experience.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${experience.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
        </div>
        `;
        viewWrapper.appendChild(itemExperience);
      });
    }
  }
  displayAllExperiences();

  //------------------------Edit Experience--------------------------------

  //open & close Modal
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

  //Close Modal
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
    //check btn-edit
    const btn = e.target.closest(".btn-edit");
    if (!btn) return;

    //check data-id
    const id = btn.dataset.id;
    console.log("ID yang diklik: ", id);

    //find id in model
    const experiences = experienceManager.getExperiences();
    const data = experiences.find((item) => item.id == id);

    //matches data id
    if (!data) {
      console.log("Data tidak ditemukan: ", data);
    }
    console.log(data);

    //open & view in modal

    document
      .getElementById("btn-add-taskModal")
      .addEventListener("click", () => {
        addTask(
          ".task-listModal",
          "task-itemModal",
          "company-taskModal",
          "btn-remove-taskModal"
        );
      });

    removeTask(".btn-remove-taskModal", ".task-itemModal", "task-listModal");

    openModal();

    document.getElementById("company_nameModal").value = data.companyName;
    document.getElementById("company_positionModal").value =
      data.companyPosition;
    document.getElementById("company_locationModal").value =
      data.companyLocation;
    document.getElementById("company_duringModal").value = data.companyDuring;
    // document.getElementById("company_taskModal").value = data.companyTask;

    const taskListModal = document.getElementById("taskListModal");
    taskListModal.innerHTML = "";

    const tasks = data.companyTasks || [];

    if (tasks.length === 0) {
      // jika kosong, tambah satu field kosong (kemungkinan masih bug
    } else {
      // isi tugas lama
      tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.classList = "task-itemModal";
        taskItem.innerHTML = `
                      <textarea
                        cols="6"
                        rows="2"
                        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sint harum tempora facilis, hic fugiat libero aspernatur similique quod itaque tempore animi nam porro quam. Harum sit non est beatae."
                        required
                        class="input-field margin-bottom-input company-taskModal"
                      >${task}</textarea>
                      <button type="button" class="btn btn-remove-taskModal">X</button>
      `;
        taskListModal.appendChild(taskItem);
      });
    }

    //set Editing ID
    localStorage.setItem("editingCompanyId", data.id);

    //------------------------Update Data---------------------------------
    document.getElementById("btnUpdate").addEventListener("click", function () {
      const id = localStorage.getItem("editingCompanyId");

      //Ambil semua tugas dari modal
      const companyTasksModal = [];
      document.querySelectorAll(".company-taskModal").forEach((input) => {
        const nilaiTask = input.value;

        if (nilaiTask !== "") {
          companyTasksModal.push(nilaiTask);
        }
      });

      if (companyTasksModal === 0) {
        alert("Minimal isi 1 tugas!");
      }

      const newData = {
        id: id,
        companyName: document.getElementById("company_nameModal").value,
        companyPosition: document.getElementById("company_positionModal").value,
        companyLocation: document.getElementById("company_locationModal").value,
        companyDuring: document.getElementById("company_duringModal").value,
        companyTasks: companyTasksModal,
      };

      experienceManager.updateExperience(id, newData);
      closeModal();
      localStorage.removeItem("editingCompanyId");

      const experience = experienceManager.getExperiences();
      displayAllExperiences(experience);
    });
  });

  // -----------------------------Delete Data-----------------------------------
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
        const result = experienceManager.deleteExperience(idDelete);

        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");

          const experiences = experienceManager.getExperiences();
          displayAllExperiences(experiences);

          if (experiences.length === 0) {
            localStorage.removeItem("experiences");
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
