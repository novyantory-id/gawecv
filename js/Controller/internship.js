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
    addTask(".task-list", "task-item", "internship-task", "btn-remove-task");
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

  const internshipForm = document.getElementById("internshipForm");
  const internshipManager = new Internship();

  internshipForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const internshipTasks = [];
    document.querySelectorAll(".internship-task").forEach((input) => {
      const nilaiTask = input.value;

      if (nilaiTask !== "") {
        internshipTasks.push(nilaiTask);
      }
    });

    const internshipData = {
      companyInternship: document.getElementById("company_internship").value,
      positionInternship: document.getElementById("position_internship").value,
      addressInternship: document.getElementById("address_internship").value,
      yearInternship: document.getElementById("year_internship").value,
      tasksInternship: internshipTasks,
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

  function displayAllInternships(internships = existingInternship) {
    viewWrapper.innerHTML = "";
    if (internships.length === 0) {
      viewWrapper.className = "hidden";
      viewWrapperEmpty.className = "";
      // console.log("tidak ada course tersedia");
    } else {
      viewWrapperEmpty.className = "hidden";
      internships.forEach((internship) => {
        const tasksHTML = internship.tasksInternship
          .map(
            (task) => `
        <li class="body-medium">${task.trim()}</li>
        `
          )
          .join("");

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
              <ul class="task-list-view card-text">
                ${tasksHTML}
              </ul>
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${internship.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${internship.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
          </div>
        `;

        viewWrapper.appendChild(itemInternship);
      });

      console.log("beberapa course tersedia dan siap ditampilkan");
    }
  }

  displayAllInternships();

  //---------------------Edit Internship----------------------------------

  // 1. open & close Modal
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
    // console.log("btn berhasi diklik ", btn);

    // 4. check data-id
    const id = btn.dataset.id;
    console.log("ID yang diklik: ", id);

    // 5. find id in model
    const internships = internshipManager.getInternships();
    const data = internships.find((item) => item.id == id);

    // 6. matches data id
    if (!data) {
      console.log("Data tidak ditemukan: ", data);
    }
    console.log(data);

    // 7. open & view in modal

    document
      .getElementById("btn-add-taskModal")
      .addEventListener("click", () => {
        addTask(
          ".task-listModal",
          "task-itemModal",
          "internship-taskModal",
          "btn-remove-taskModal"
        );
      });

    removeTask(".btn-remove-taskModal", ".task-itemModal", "task-listModal");

    openModal();

    document.getElementById("company_internshipModel").value =
      data.companyInternship;
    document.getElementById("position_internshipModel").value =
      data.positionInternship;
    document.getElementById("address_internshipModel").value =
      data.addressInternship;
    document.getElementById("year_internshipModel").value = data.yearInternship;

    const taskListModal = document.getElementById("taskListModal");
    taskListModal.innerHTML = "";

    const tasks = data.tasksInternship || [];

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
                        class="input-field margin-bottom-input internship-taskModal"
                      >${task}</textarea>
                      <button type="button" class="btn btn-remove-taskModal">X</button>
      `;
        taskListModal.appendChild(taskItem);
      });
    }

    // 8. set Editing ID
    localStorage.setItem("editingInternshipId", data.id);
  });

  // 9. Update Data
  document.getElementById("btnUpdate").addEventListener("click", function () {
    const id = localStorage.getItem("editingInternshipId");

    //Ambil semua tugas dari modal
    const internshipTasksModal = [];
    document.querySelectorAll(".internship-taskModal").forEach((input) => {
      const nilaiTask = input.value;

      if (nilaiTask !== "") {
        internshipTasksModal.push(nilaiTask);
      }
    });

    if (internshipTasksModal === 0) {
      alert("Minimal isi 1 tugas!");
    }

    const newData = {
      id: id,
      companyInternship: document.getElementById("company_internshipModel")
        .value,
      positionInternship: document.getElementById("position_internshipModel")
        .value,
      addressInternship: document.getElementById("address_internshipModel")
        .value,
      yearInternship: document.getElementById("year_internshipModel").value,
      tasksInternship: internshipTasksModal,
    };

    internshipManager.updateInternship(id, newData);
    closeModal();
    localStorage.removeItem("editingInternshipId");

    const internship = internshipManager.getInternships();
    displayAllInternships(internship);
  });

  // ----------------------Delete Data-------------------------------
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
        const result = internshipManager.deleteInternship(idDelete);

        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");

          const internships = internshipManager.getInternships();
          displayAllInternships(internships);

          if (internships.length === 0) {
            localStorage.removeItem("internships");
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
