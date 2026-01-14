document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  const softSkillManager = new SoftSkill();
  const softSkillForm = document.getElementById("softSkillForm");

  softSkillForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const softSkillData = {
      softSkill: document.getElementById("softskill").value,
    };

    const result = softSkillManager.saveSoftSkill(softSkillData);

    if (result.success) {
      return (window.location.href = "../skill.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  //save hardskill
  const hardSkillManager = new HardSkill();
  const hardSkillForm = document.getElementById("hardSkillForm");

  hardSkillForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const hardSkillData = {
      hardSkill: document.getElementById("hardskill").value,
    };

    const result = hardSkillManager.saveHardSkill(hardSkillData);

    if (result.success) {
      return (window.location.href = "../skill.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  //save languageskill
  const languageSkillManager = new LanguageSkill();
  const languageSkillForm = document.getElementById("languageSkillForm");

  languageSkillForm.addEventListener("submit", (e) => {
    const languageSkillData = {
      languageSkill: document.getElementById("languageskill").value,
    };

    const result = languageSkillManager.saveLanguageSkill(languageSkillData);

    if (result.success) {
      return (window.location.href = "../skill.html");
    } else {
      console.log("proses simpan data gagal");
    }
  });

  //view Soft skill
  const existingSoftSkills = softSkillManager.getSoftSkills();
  const viewWrapperSoft = document.getElementById("viewWrapperSoft");
  const viewWrapperSoftEmpty = document.getElementById("viewWrapperSoftEmpty");

  function allDisplaySoftSkill() {
    if (!existingSoftSkills || !existingSoftSkills.softSkill) {
      viewWrapperSoft.className = "hidden";
      // viewWrapperSoftEmpty.className = "";
      return;
    } else {
      viewWrapperSoftEmpty.className = "hidden";
      const itemSoftSkill = document.createElement("div");
      itemSoftSkill.className = "container";
      itemSoftSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${existingSoftSkills.softSkill}</h2>
              </div>
              <div class="btn-action">
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
          </div>
          
        `;
      viewWrapperSoft.appendChild(itemSoftSkill);
    }
  }
  allDisplaySoftSkill();

  //view Hard skill
  const existingHardSkills = hardSkillManager.getHardSkills();
  const viewWrapperHard = document.getElementById("viewWrapperHard");
  const viewWrapperHardEmpty = document.getElementById("viewWrapperHardEmpty");

  function allDisplayHardSkill() {
    if (!existingHardSkills || !existingHardSkills.hardSkill) {
      viewWrapperHard.className = "hidden";
      // viewWrapperHardEmpty.className = "";
    } else {
      viewWrapperHardEmpty.className = "hidden";
      const itemHardSkill = document.createElement("div");
      itemHardSkill.className = "container";
      itemHardSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${existingHardSkills.hardSkill}</h2>
              </div>
              <div class="btn-action">
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
          </div>
        `;
      viewWrapperHard.appendChild(itemHardSkill);
    }
  }
  allDisplayHardSkill();

  // view Language Skill
  const existingLanguageSkills = languageSkillManager.getLanguageSkills();
  const viewWrapperLanguage = document.getElementById("viewWrapperLanguage");
  const viewWrapperLanguageEmpty = document.getElementById(
    "viewWrapperLanguageEmpty"
  );

  function allDisplayLanguageSkill(languageskills = existingLanguageSkills) {
    viewWrapperLanguage.innerHTML = "";
    if (languageskills.length === 0) {
      viewWrapperLanguage.className = "hidden";
    } else {
      viewWrapperLanguageEmpty.className = "hidden";
      languageskills.forEach((languageskill) => {
        const itemLanguageSkill = document.createElement("div");
        itemLanguageSkill.className = "container";
        itemLanguageSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${languageskill.languageSkill}</h2>
              </div>
              <div class="btn-action">
                <button href="#" class="action-link btn-edit" data-id=${languageskill.id}>
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <a href="#" class="action-link">
                  <span class="material-symbols-outlined">delete</span>
                </a>
              </div>
          </div>
        `;
        viewWrapperLanguage.appendChild(itemLanguageSkill);
      });
    }
  }
  allDisplayLanguageSkill();

  //Edit Language Skill

  // 1. open & close Modal
  function openModal() {
    document.getElementById("editModal").classList.remove("hidden");
    document.querySelector("article").classList.add("blur");
  }

  function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
    document.querySelector("article").classList.remove("blur");
  }

  // 2. Close Modal

  document.addEventListener("click", function (e) {
    // 3. check btn-edit
    const btn = e.target.closest(".btn-edit");
    if (!btn) return;

    // 4. check data-id
    const id = btn.dataset.id;
    console.log("id yang diklik: ", id);

    // 5. find id in model
    const languageSkill = languageSkillManager.getLanguageSkills();
    const data = languageSkill.find((item) => item.id == id);

    // 6. matches data id
    if (!data) {
      console.log("data tidak ditemukan dengan id: ", data);
    }
    console.log(data);

    // 7. open & view in modal
    openModal();

    document.getElementById("languageskillModal").value = data.languageSkill;

    // 8. set Editing ID
    localStorage.setItem("editingLanguageSkillId", data.id);
  });

  // 9. Update Data
  document.getElementById("btnUpdate").addEventListener("click", function () {
    const languageSkillModel = new LanguageSkill();

    const id = localStorage.getItem("editingLanguageSkillId");

    const newData = {
      id: id,
      languageSkill: document.getElementById("languageskillModal").value,
    };

    languageSkillModel.updateLanguageSkill(id, newData);
    closeModal();
    localStorage.removeItem("editingLanguageSkillId");

    const languageskill = languageSkillModel.getLanguageSkills();
    allDisplayLanguageSkill(languageskill);
  });
});
