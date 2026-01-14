class Education {
  constructor() {
    this.educations = this.getEducations();
  }

  getEducations() {
    return JSON.parse(localStorage.getItem("educations")) || [];
  }

  saveEducation(educationData) {
    const newEducationData = {
      id: Date.now(),
      ...educationData,
    };

    this.educations.push(newEducationData);

    localStorage.setItem("educations", JSON.stringify(this.educations));

    return {
      success: true,
    };
  }

  updateEducation(id, newData) {
    const educations = this.getEducations();

    const index = educations.findIndex((item) => item.id == id);
    if (index === -1) {
      console.log("ID tidak ditemukan ", id);
      return;
    }

    this.educations[index] = newData;

    this.updateLocalStorage();
  }

  deleteEducation(idDelete) {
    const educations = this.getEducations();
    const index = educations.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan ", idDelete);
      return {
        success: false,
        message: "Education tidak ditemukan!",
      };
    }

    this.educations.splice(index, 1);
    this.updateLocalStorage();

    return {
      success: true,
      message: "Education berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("educations", JSON.stringify(this.educations));
  }
}
