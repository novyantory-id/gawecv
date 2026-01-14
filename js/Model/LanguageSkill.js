class LanguageSkill {
  constructor() {
    this.languageskills = this.getLanguageSkills();
  }
  getLanguageSkills() {
    return JSON.parse(localStorage.getItem("languageskills")) || [];
  }

  saveLanguageSkill(languageSkillData) {
    const newLanguageSkillData = {
      id: Date.now(),
      ...languageSkillData,
    };

    this.languageskills.push(newLanguageSkillData);

    localStorage.setItem("languageskills", JSON.stringify(this.languageskills));

    return {
      success: true,
    };
  }

  updateLanguageSkill(id, newData) {
    const languageSkills = this.getLanguageSkills();
    const index = languageSkills.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("Data tidak ditemukan", id);
    }

    languageSkills[index] = newData;

    localStorage.setItem("languageskills", JSON.stringify(languageSkills));
  }
}
