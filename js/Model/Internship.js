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
}
