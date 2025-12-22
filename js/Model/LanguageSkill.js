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
}
