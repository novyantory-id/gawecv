class Experience {
  constructor() {
    this.experiences = this.getExperiences();
  }
  getExperiences() {
    return JSON.parse(localStorage.getItem("experiences")) || [];
  }

  saveExperience(experienceData) {
    const newExperienceData = {
      id: Date.now(),
      ...experienceData,
    };

    this.experiences.push(newExperienceData);

    localStorage.setItem("experiences", JSON.stringify(this.experiences));

    return {
      success: true,
    };
  }

  updateExperience(id, newData) {
    const experiences = this.getExperiences();
    const index = experiences.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("ID tidak ditemukan: ", id);
      return;
    }

    this.experiences[index] = newData;
    this.updateLocalStorage();
  }

  deleteExperience(idDelete) {
    const experiences = this.getExperiences();
    const index = experiences.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan: ", idDelete);
      return {
        success: false,
        message: "Experience tidak ditemukan",
      };
    }

    this.experiences.splice(index, 1);
    this.updateLocalStorage();

    return {
      success: true,
      message: "Experience berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("experiences", JSON.stringify(this.experiences));
  }
}
