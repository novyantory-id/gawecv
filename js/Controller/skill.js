document.addEventListener("DOMContentLoaded", () => {
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
    if (existingSoftSkills.length === 0) {
      viewWrapperSoft.className = "hidden";
    } else {
      viewWrapperSoftEmpty.className = "hidden";
      existingSoftSkills.forEach((softskill) => {
        const itemSoftSkill = document.createElement("div");
        itemSoftSkill.className = "container";
        itemSoftSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${softskill.softSkill}</h2>
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
        viewWrapperSoft.appendChild(itemSoftSkill);
      });
    }
  }
  allDisplaySoftSkill();

  //view Hard skill
  const existingHardSkills = hardSkillManager.getHardSkills();
  const viewWrapperHard = document.getElementById("viewWrapperHard");
  const viewWrapperHardEmpty = document.getElementById("viewWrapperHardEmpty");

  function allDisplayHardSkill() {
    if (existingHardSkills.length === 0) {
    } else {
      viewWrapperHardEmpty.className = "hidden";
      existingHardSkills.forEach((hardskill) => {
        const itemHardSkill = document.createElement("div");
        itemHardSkill.className = "container";
        itemHardSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${hardskill.hardSkill}</h2>
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
        viewWrapperHard.appendChild(itemHardSkill);
      });
    }
  }
  allDisplayHardSkill();

  // view Language Skill
  const existingLanguageSkills = languageSkillManager.getLanguageSkills();
  const viewWrapperLanguage = document.getElementById("viewWrapperLanguage");
  const viewWrapperLanguageEmpty = document.getElementById(
    "viewWrapperLanguageEmpty"
  );

  function allDisplayLanguageSkill() {
    if (existingLanguageSkills.length === 0) {
      viewWrapperLanguage.className = "hidden";
    } else {
      viewWrapperLanguageEmpty.className = "hidden";
      existingLanguageSkills.forEach((languageskill) => {
        const itemLanguageSkill = document.createElement("div");
        itemLanguageSkill.className = "container";
        itemLanguageSkill.innerHTML = `
            <div class="card-content visual-card">
              <div class="left-side-card margin-bottom-letter-2x">
                <h2 class="title-large">${languageskill.languageSkill}</h2>
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
        viewWrapperLanguage.appendChild(itemLanguageSkill);
      });
    }
  }
  allDisplayLanguageSkill();
});
