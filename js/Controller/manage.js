document.addEventListener("DOMContentLoaded", () => {
  //Educations View
  const myEducations = new Education();

  const existingEducations = myEducations.getEducations();

  const viewWrapper = document.getElementById("educationList");
  const viewWrapperEmpty = document.getElementById("educationListEmpty");

  function displayAllEducations() {
    if (existingEducations.length === 0) {
      console.log("tidak ada education tersedia");
    } else {
      console.log("beberapa education tersedia dan siap ditampilkan");

      existingEducations.forEach((education) => {
        const itemEducation = document.createElement("ul");
        itemEducation.className = "educationList";
        itemEducation.innerHTML = `
            <li class="resume-item">
                <div class="resume-card">
                <span class=d-flex>
                    <p class="body-large">
                        ${education.pendidikan}
                    </p>
                    <p>-</p>
                    <p class="body-large">${education.lokasipendidikan}
                    </p>
                </span>

                    <p class="body-medium">
                        ${education.jurusan}
                    </p>
                

                    <span class="label-medium card-subtitle">${education.lamapendidikan}
                    </span>
                </div>
            </li>
        `;

        viewWrapper.appendChild(itemEducation);
      });
    }
  }

  displayAllEducations();

  //Courses View
  const myCourse = new Course();

  const existingCourses = myCourse.getCourses();

  const viewWrapperCourse = document.getElementById("courseList");

  function displayAllCourses() {
    if (existingCourses.length === 0) {
    } else {
      existingCourses.forEach((course) => {
        const itemCourse = document.createElement("ul");
        itemCourse.className = "courseList";
        itemCourse.innerHTML = `
            <li class="resume-item">
                <div class="resume-card">
                <span class=d-flex>
                    <p class="body-large">
                        ${course.kursus}
                    </p>
                    <p>-</p>
                    <p class="body-large">${course.lokasiKursus}
                    </p>
                </span>

                    <p class="body-medium">
                        ${course.bidangKursus}
                    </p>
                

                    <span class="label-medium card-subtitle">${course.tahunKursus}
                    </span>
                </div>
            </li>
        `;
        viewWrapperCourse.appendChild(itemCourse);
      });
    }
  }
  displayAllCourses();

  //Internship View
  const myInternship = new Internship();

  const existingInternships = myInternship.getInternships();

  const viewWrapperInternship = document.getElementById("internshipList");

  function displayAllInternships() {
    if (existingInternships.length === 0) {
    } else {
      existingInternships.forEach((internship) => {
        const itemInternship = document.createElement("ul");
        itemInternship.className = "internshipList";

        itemInternship.innerHTML = `
            <li class="resume-item">
                    <div class="resume-card">
                        <span class=d-flex>
                    <p class="body-large">
                        ${internship.companyInternship}
                    </p>
                    <p>-</p>
                    <p class="body-large">${internship.addressInternship}
                    </p>
                </span>

                    <p class="body-medium">
                        ${internship.positionInternship}
                    </p>
                

                    <span class="label-medium card-subtitle">${internship.yearInternship}
                    </span>
                    </div>
                  </li>
        `;
        viewWrapperInternship.appendChild(itemInternship);
      });
    }
  }
  displayAllInternships();

  //Organization View
  const myOrganization = new Organization();
  const existingOrganizations = myOrganization.getOrganizations();
  const viewWrapperOrganization = document.getElementById("organizationList");

  function displayAllOrganizations() {
    if (existingOrganizations.length === 0) {
    } else {
      existingOrganizations.forEach((organization) => {
        const itemOrganization = document.createElement("ul");
        itemOrganization.className = "organizationList";

        itemOrganization.innerHTML = `
        <li class="resume-item">
            <div class="resume-card">
                <span class=d-flex>
                    <p class="body-large">
                        ${organization.organizationName}
                    </p>
                    <p>-</p>
                    <p class="body-large">${organization.organizationLocation}
                    </p>
                </span>

                <p class="body-medium">
                    ${organization.organizationPosition}
                </p>
                

                <span class="label-medium card-subtitle">${organization.organizationDuring}
                </span>
            </div>
        </li>
      `;
        viewWrapperOrganization.appendChild(itemOrganization);
      });
    }
  }
  displayAllOrganizations();

  //Experience
  const experienceManager = new Experience();
  const existingExperiences = experienceManager.getExperiences();
  const viewWrapperExperience = document.getElementById("experienceList");

  function displayAllExperiences() {
    if (existingExperiences.length === 0) {
    } else {
      existingExperiences.forEach((experience) => {
        const itemExperience = document.createElement("ul");
        itemExperience.className = "experienceList";
        itemExperience.innerHTML = `
          <li class="resume-item">
                    <div class="resume-card">
                      <p class="body-large">
                        ${experience.companyPosition}, ${experience.companyName}
                      </p>

                      <span class="label-medium card-subtitle"
                        >${experience.companyDuring}</span
                      >

                      <span class="body-medium card-text"
                        >${experience.companyTask}</span
                      >
                    </div>
                  </li>
        `;
        viewWrapperExperience.appendChild(itemExperience);
      });
    }
  }
  displayAllExperiences();

  // view Soft Skill
  const softSkillManager = new SoftSkill();
  const existingSoftSkills = softSkillManager.getSoftSkills();
  const viewWrapperSoftSkill = document.getElementById("softSkillList");

  function allDisplaySoftSkill() {
    if (existingSoftSkills.length === 0) {
    } else {
      existingSoftSkills.forEach((softskill) => {
        const itemSoftSkill = document.createElement("div");
        itemSoftSkill.className = "softSkillList";
        itemSoftSkill.innerHTML = `
          <span class="body-medium card-text">${softskill.softSkill}</span>
        `;
        viewWrapperSoftSkill.appendChild(itemSoftSkill);
      });
    }
  }
  allDisplaySoftSkill();

  // view Hard Skill
  const hardSkillManager = new HardSkill();
  const existingHardSkills = hardSkillManager.getHardSkills();
  const viewWrapperHardSkill = document.getElementById("hardSkillList");

  function allDisplayHardSkill() {
    if (existingHardSkills.length === 0) {
    } else {
      existingHardSkills.forEach((hardskill) => {
        const itemHardSkill = document.createElement("div");
        itemHardSkill.className = "hardSkillList";
        itemHardSkill.innerHTML = `
          <span class="body-medium card-text">${hardskill.hardSkill}</span>
        `;
        viewWrapperHardSkill.appendChild(itemHardSkill);
      });
    }
  }
  allDisplayHardSkill();

  // view Language Skill
  const languageSkillManager = new LanguageSkill();
  const existingLanguageSkills = languageSkillManager.getLanguageSkills();
  const viewWrapperLanguageSkill = document.getElementById("languageSkillList");

  function allDisplayLanguageSkill() {
    if (existingLanguageSkills.length === 0) {
    } else {
      existingLanguageSkills.forEach((languageskill) => {
        const itemLanguageSkill = document.createElement("div");
        itemLanguageSkill.className = "languageSkillList";
        itemLanguageSkill.innerHTML = `
          <span class="body-medium card-text">${languageskill.languageSkill}</span>
        `;
        viewWrapperLanguageSkill.appendChild(itemLanguageSkill);
      });
    }
  }
  allDisplayLanguageSkill();
});
