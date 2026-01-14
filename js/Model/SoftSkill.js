class SoftSkill {
  constructor() {
    this.softskills = this.getSoftSkills();
  }
  getSoftSkills() {
    return JSON.parse(localStorage.getItem("softskills")) || [];
  }

  saveSoftSkill(softSkillData) {
    const newSoftSkillData = {
      id: Date.now(),
      ...softSkillData,
    };

    // this.softskills.push(newSoftSkillData);

    // localStorage.setItem("softskills", JSON.stringify(this.softskills));

    localStorage.setItem("softskills", JSON.stringify(newSoftSkillData));

    return {
      success: true,
    };
  }
}
