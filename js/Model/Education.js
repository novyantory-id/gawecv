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
}
