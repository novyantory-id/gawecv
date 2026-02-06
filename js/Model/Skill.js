class Skill {
  constructor() {
    this.skills = this.getSkills();
  }
  getSkills() {
    return JSON.parse(localStorage.getItem("skills")) || [];
  }

  saveSkill(SkillData) {
    const newSkillData = {
      id: Date.now(),
      ...SkillData,
    };

    this.skills.push(newSkillData);

    localStorage.setItem("skills", JSON.stringify(this.skills));

    return {
      success: true,
    };
  }

  updateSkill(id, newData) {
    const Skills = this.getSkills();
    const index = Skills.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("Data tidak ditemukan", id);
    }

    this.skills[index] = newData;

    this.updateLocalStorage();
  }

  deleteSkill(idDelete) {
    const skills = this.getSkills();
    const index = skills.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan ", idDelete);
      return {
        success: false,
        message: "Skill tidak ditemukan",
      };
    }

    this.skills.splice(index, 1);
    this.updateLocalStorage();

    return {
      success: true,
      message: "Skill berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("skills", JSON.stringify(this.skills));
  }
}
