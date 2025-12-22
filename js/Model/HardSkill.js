class HardSkill {
  constructor() {
    this.hardskills = this.getHardSkills();
  }
  getHardSkills() {
    return JSON.parse(localStorage.getItem("hardskills")) || [];
  }

  saveHardSkill(hardSkillData) {
    const newHardSkillData = {
      id: Date.now(),
      ...hardSkillData,
    };

    this.hardskills.push(newHardSkillData);

    localStorage.setItem("hardskills", JSON.stringify(this.hardskills));

    return {
      success: true,
    };
  }
}
