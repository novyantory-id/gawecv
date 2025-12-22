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
}
