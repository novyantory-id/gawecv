class Internship {
  constructor() {
    this.internships = this.getInternships();
  }

  getInternships() {
    return JSON.parse(localStorage.getItem("internships")) || [];
  }

  saveInternship(internshipData) {
    const newInternshipData = {
      id: Date.now(),
      ...internshipData,
    };

    this.internships.push(newInternshipData);

    localStorage.setItem("internships", JSON.stringify(this.internships));

    return {
      success: true,
    };
  }

  updateInternship(id, newData) {
    const internships = this.getInternships();
    const index = internships.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("data tidak ditemukan: ", id);
    }

    this.internships[index] = newData;
    this.updateLocalStorage();
  }

  deleteInternship(idDelete) {
    const internships = this.getInternships();
    const index = internships.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan: ", idDelete);
      return {
        success: false,
        message: "Internship tidak ditemukan",
      };
    }

    this.internships.splice(index, 1);
    this.updateLocalStorage();

    return {
      success: true,
      message: "Internship berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("internships", JSON.stringify(this.internships));
  }
}
