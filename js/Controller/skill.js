document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  //save languageskill
  const skillManager = new Skill();
  const skillForm = document.getElementById("skillForm");

  skillForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const skillData = {
      titleSkill: document.getElementById("title_skill").value,
      skillValue: document.getElementById("skill_value").value,
    };

    const result = skillManager.saveSkill(skillData);

    if (result.success) {
      return (window.location.href = "../skill.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  // view Skill
  const existingskills = skillManager.getSkills();
  const viewWrapperSkill = document.getElementById("viewWrapperSkill");
  const viewWrapperSkillEmpty = document.getElementById(
    "viewWrapperSkillEmpty"
  );

  function allDisplaySkill(skills = existingskills) {
    viewWrapperSkill.innerHTML = "";
    if (skills.length === 0) {
      viewWrapperSkill.className = "hidden";
    } else {
      viewWrapperSkillEmpty.className = "hidden";
      skills.forEach((skill) => {
        const itemskill = document.createElement("div");
        itemskill.className = "container";
        itemskill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-medium">${skill.titleSkill}</h2>
              </div>
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-small">${skill.skillValue}</h2>
              </div>
              
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${skill.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button href="#" class="action-link btn-delete" data-id=${skill.id}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
          </div>
        `;
        viewWrapperSkill.appendChild(itemskill);
      });
    }
  }
  allDisplaySkill();

  //---------------------------EDIT SKILL--------------------------------

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

    // 4. check data-id
    const id = btn.dataset.id;
    console.log("id yang diklik: ", id);

    // 5. find id in model
    const skill = skillManager.getSkills();
    const data = skill.find((item) => item.id == id);

    // 6. matches data id
    if (!data) {
      console.log("data tidak ditemukan dengan id: ", data);
    }
    console.log(data);

    // 7. open & view in modal
    openModal();

    document.getElementById("title_skillModal").value = data.titleSkill;
    document.getElementById("skill_valueModal").value = data.skillValue;

    // 8. set Editing ID
    localStorage.setItem("editingSkillId", data.id);
  });

  // 9. Update Data
  document.getElementById("btnUpdate").addEventListener("click", function () {
    const skillModel = new Skill();

    const id = localStorage.getItem("editingSkillId");

    const newData = {
      id: id,
      titleSkill: document.getElementById("title_skillModal").value,
      skillValue: document.getElementById("skill_valueModal").value,
    };

    skillModel.updateSkill(id, newData);
    closeModal();
    localStorage.removeItem("editingSkillId");

    const skill = skillModel.getSkills();
    allDisplaySkill(skill);
  });

  // -------------------------DELETE SKILL---------------------------------
  let idDelete = null;
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-delete");
    if (!btn) return;
    console.log(btn);

    idDelete = btn.dataset.id;

    openDeleteModal();
  });

  const btnConfirm = document.getElementById("btnDelete");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      if (idDelete) {
        const result = skillManager.deleteSkill(idDelete);
        if (result.success) {
          alert(result.message || "Berhasil menghapus data!");

          const skills = skillManager.getSkills();
          allDisplaySkill(skills);

          if (skills.length === 0) {
            localStorage.removeItem("skills");
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
