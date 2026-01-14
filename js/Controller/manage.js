document.addEventListener("DOMContentLoaded", () => {
  //About View
  const userManager = new User();
  const myEducations = new Education();
  const email = userManager.getLogins();

  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  const user = userManager.getUserByEmail(email);
  const educationsAbout = myEducations.getEducations();

  const nameAbout = document.getElementById("nameAbout");
  const lulusanAbout = document.getElementById("lulusanAbout");
  const emailAbout = document.getElementById("emailAbout");
  const addressAbout = document.getElementById("addressAbout");
  const regionalAbout = document.getElementById("regionalAbout");
  const nohpAbout = document.getElementById("nohpAbout");
  const descAbout = document.getElementById("descAbout");
  const socialMediaAbout = document.getElementById("socialMediaAbout");
  const jurusanAbout = document.getElementById("jurusanAbout");

  if (user) {
    nameAbout.innerText = user.nama || nameAbout.innerText;
    lulusanAbout.innerText = user.lulusan || lulusanAbout.innerHTML;
    emailAbout.innerHTML = user.email || emailAbout.innerHTML;
    addressAbout.innerHTML = user.alamat || addressAbout.innerHTML;
    regionalAbout.innerHTML = user.regional || regionalAbout.innerHTML;
    nohpAbout.innerHTML = user.nohp || nohpAbout.innerHTML;
    descAbout.innerHTML = user.about || descAbout.innerHTML;
    socialMediaAbout.innerHTML = user.socialmedia || socialMediaAbout.innerHTML;
    jurusanAbout.innerHTML =
      educationsAbout[0].jurusan || jurusanAbout.innerHTML;
  }

  //Educations View

  const existingEducations = myEducations.getEducations();

  const viewWrapperEducation = document.getElementById("educationList");
  const viewWrapperEducationEmpty =
    document.getElementById("educationListEmpty");

  function displayAllEducations() {
    if (existingEducations.length === 0) {
      viewWrapperEducation.className = "hidden";
      // console.log("tidak ada education tersedia");
    } else {
      viewWrapperEducationEmpty.className = "hidden";
      // console.log("beberapa education tersedia dan siap ditampilkan");

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

        viewWrapperEducation.appendChild(itemEducation);
      });
    }
  }

  displayAllEducations();

  //Courses View
  const myCourse = new Course();

  const existingCourses = myCourse.getCourses();

  const viewWrapperCourse = document.getElementById("courseList");
  const viewWrapperCourseEmpty = document.getElementById("courseListEmpty");

  function displayAllCourses() {
    if (existingCourses.length === 0) {
      viewWrapperCourse.className = "hidden";
    } else {
      viewWrapperCourseEmpty.className = "hidden";
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
  const viewWrapperInternshipEmpty = document.getElementById(
    "internshipListEmpty"
  );

  function displayAllInternships() {
    if (existingInternships.length === 0) {
      viewWrapperInternship.className = "hidden";
    } else {
      viewWrapperInternshipEmpty.className = "hidden";
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
  const viewWrapperOrganizationEmpty = document.getElementById(
    "organizationListEmpty"
  );

  function displayAllOrganizations() {
    if (existingOrganizations.length === 0) {
      viewWrapperOrganization.className = "hidden";
    } else {
      viewWrapperOrganizationEmpty.className = "hidden";
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
  const viewWrapperExperienceEmpty = document.getElementById(
    "experienceListEmpty"
  );

  function displayAllExperiences() {
    if (existingExperiences.length === 0) {
      viewWrapperExperience.className = "hidden";
    } else {
      viewWrapperExperienceEmpty.className = "hidden";
      existingExperiences.forEach((experience) => {
        const tasksHTML = experience.companyTasks
          .map(
            (task) => `
        <li class="body-medium">${task.trim()}</li>
        `
          )
          .join("");

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

                      <ul class="task-list-view card-text">
                        ${tasksHTML}
                      </ul>
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
  const viewWrapperSoftSkillEmpty =
    document.getElementById("softSkillListEmpty");

  function allDisplaySoftSkill() {
    if (!existingSoftSkills || !existingSoftSkills.softSkill) {
      viewWrapperSoftSkill.className = "hidden";
    } else {
      viewWrapperSoftSkillEmpty.className = "hidden";
      const itemSoftSkill = document.createElement("div");
      itemSoftSkill.className = "softSkillList";
      itemSoftSkill.innerHTML = `
          <span class="body-medium card-text">${existingSoftSkills.softSkill}</span>
        `;
      viewWrapperSoftSkill.appendChild(itemSoftSkill);
    }
  }
  allDisplaySoftSkill();

  // view Hard Skill
  const hardSkillManager = new HardSkill();
  const existingHardSkills = hardSkillManager.getHardSkills();
  const viewWrapperHardSkill = document.getElementById("hardSkillList");
  const viewWrapperHardSkillEmpty =
    document.getElementById("hardSkillListEmpty");

  function allDisplayHardSkill() {
    if (!existingHardSkills || !existingHardSkills.hardSkill) {
      viewWrapperHardSkill.className = "hidden";
    } else {
      viewWrapperHardSkillEmpty.className = "hidden";
      const itemHardSkill = document.createElement("div");
      itemHardSkill.className = "hardSkillList";
      itemHardSkill.innerHTML = `
          <span class="body-medium card-text">${existingHardSkills.hardSkill}</span>
        `;
      viewWrapperHardSkill.appendChild(itemHardSkill);
    }
  }
  allDisplayHardSkill();

  // view Language Skill
  const languageSkillManager = new LanguageSkill();
  const existingLanguageSkills = languageSkillManager.getLanguageSkills();
  const viewWrapperLanguageSkill = document.getElementById("languageSkillList");
  const viewWrapperLanguageSkillEmpty = document.getElementById(
    "languageSkillListEmpty"
  );

  function allDisplayLanguageSkill() {
    if (existingLanguageSkills.length === 0) {
      viewWrapperLanguageSkill.className = "hidden";
    } else {
      existingLanguageSkills.forEach((languageskill) => {
        viewWrapperLanguageSkillEmpty.className = "hidden";
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
