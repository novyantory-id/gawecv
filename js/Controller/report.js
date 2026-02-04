function directReportTab() {
  if (
    typeof window.jspdf === "undefined" ||
    typeof window.jspdf.jsPDF === "undefined"
  ) {
    console.log("jsPDF belum load");
    alert("PDF Library belum siap");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  registerCustomFont(
    doc,
    "Lato-Regular",
    "normal",
    "Lato-Regular-normal.ttf",
    latoBase64
  );

  registerCustomFont(doc, "times", "normal", "times-normal.ttf", timesBase64);

  registerCustomFont(
    doc,
    "times-new-roman-bold",
    "bold",
    "times-new-roman-bold-bold.ttf",
    timesBoldBase64
  );

  console.log("Daftar font setelah new jsPDF: ", doc.getFontList());
  console.log("Font saat ini sebelum set: ", doc.getFont());

  const userManager = new User();
  const educationManager = new Education();
  const experienceManager = new Experience();
  const organizationManager = new Organization();
  const internshipManager = new Internship();
  const courseManager = new Course();

  const email = userManager.getLogins();
  const user = userManager.getUserByEmail(email);
  const educations = educationManager.getEducations();
  const experiences = experienceManager.getExperiences();
  const organizations = organizationManager.getOrganizations();
  const internships = internshipManager.getInternships();
  const courses = courseManager.getCourses();

  // ----------------------SET STYLE-------------------------------
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;
  const marginLeft = 15;
  const centerText = 105;
  const contentWidth = pageWidth - marginLeft - marginLeft; //210 - 15 - 15 = 180
  const marginRight = 195;

  // ----------------------FULL NAME-------------------------------
  doc.setFont("times-new-roman-bold", "bold");
  console.log("Font saat ini sebelum set: ", doc.getFont());
  console.log("Font saat ini setelah set: ", doc.getFont());
  doc.setFontSize(24);
  doc.text(user.nama || "YOUR FULLNAME", centerText, y, { align: "center" });

  // --------------------ADDRESS, lINK------------------------------
  y += 10;
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  // doc.text(
  //   user.regional ||
  //     "Depok City" + " | " + user.nohp ||
  //     "+6289876543210" + " | " + user.email ||
  //     "fufufafa@gmail.com" + " | " + user.socialmedia ||
  //     "linkedin.com/in/fufufafa27321003",
  //   centerText,
  //   y,
  //   { align: "center", maxWidth: contentWidth }
  // );
  doc.text(
    user.regional +
      " | " +
      user.nohp +
      " | " +
      user.email +
      " | " +
      user.socialmedia,
    centerText,
    y,
    { align: "center", maxWidth: contentWidth }
  );

  // -----------------------------SUMMARY-----------------------------
  y += 15;
  doc.setFont("times-new-roman-bold", "bold");
  doc.setFontSize(17);
  doc.text("SUMMARY", marginLeft, y);

  y += 2;
  doc.line(marginLeft, y, marginRight, y);

  y += 5;
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  const paragraphText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus suscipit vel ex perferendis facilis! Odio commodi est neque architecto nisi assumenda non saepe quam eaque natus dignissimos in enim sed vel distinctio necessitatibus, mollitia voluptates harum ea laboriosam corrupti at eveniet. Adipisci et ipsam pariatur?";
  doc.text(paragraphText, marginLeft, y, {
    align: "justify",
    maxWidth: contentWidth,
  });

  const height = doc.getTextDimensions(paragraphText, {
    maxWidth: contentWidth,
  }).h;
  y += height + 8;

  // -------------------------EDUCATION------------------------------------
  doc.setFont("times-new-roman-bold", "bold");
  doc.setFontSize(17);
  doc.text("EDUCATION", marginLeft, y);

  y += 2;
  doc.line(marginLeft, y, marginRight, y);

  if (educations.length === 0) {
  } else {
    educations.forEach((education) => {
      y += 5;
      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(education.pendidikan, marginLeft, y);

      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(education.lokasipendidikan, marginRight, y, {
        align: "right",
      });

      y += 5;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(education.jurusan, marginLeft, y);

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(education.lamapendidikan, marginRight, y, { align: "right" });
      y += 5;
    });
  }

  // -------------------------EXPERIENCES------------------------------------
  if (experiences.length === 0) {
  } else if (experiences.length === 1) {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("EXPERIENCE", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  } else {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("EXPERIENCES", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  }

  if (experiences.length === 0) {
  } else {
    experiences.forEach((experience) => {
      y += 5;
      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(experience.companyName, marginLeft, y);

      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(experience.companyLocation, marginRight, y, {
        align: "right",
      });

      y += 5;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(experience.companyPosition, marginLeft, y);

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(experience.companyDuring, marginRight, y, { align: "right" });

      y += 8;

      experience.companyTasks.forEach((task) => {
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text("-", marginLeft, y);
        doc.text(task, marginLeft + 3, y, {
          maxWidth: contentWidth,
        });

        const taskHeight = doc.getTextDimensions(task, {
          maxWidth: contentWidth,
        }).h;
        y += taskHeight + 1;
      });
    });
  }

  // -------------------------ORGANIZATIONS------------------------------------
  if (organizations.length === 0) {
  } else if (organizations.length === 1) {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("ORGANIZATION", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  } else {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("ORGANIZATIONS", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  }

  if (organizations.length === 0) {
  } else {
    organizations.forEach((organization) => {
      y += 5;
      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(organization.organizationName, marginLeft, y);

      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(organization.organizationLocation, marginRight, y, {
        align: "right",
      });

      y += 5;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(organization.organizationPosition, marginLeft, y);

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(organization.organizationDuring, marginRight, y, {
        align: "right",
      });
      y += 8;

      organization.organizationTasks.forEach((task) => {
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text("-", marginLeft, y);
        doc.text(task, marginLeft + 3, y, {
          maxWidth: contentWidth,
        });

        const taskHeight = doc.getTextDimensions(task, {
          maxWidth: contentWidth,
        }).h;
        y += taskHeight + 1;
      });
    });
  }

  // -------------------------INTERNSHIPS------------------------------------
  if (internships.length === 0) {
  } else if (internships.length === 1) {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("INTERNSHIP", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  } else {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("INTERNSHIPS", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  }

  if (internships.length === 0) {
  } else {
    internships.forEach((internship) => {
      y += 5;
      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(internship.companyInternship, marginLeft, y);

      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(internship.addressInternship, marginRight, y, {
        align: "right",
      });

      y += 5;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(internship.positionInternship, marginLeft, y);

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(internship.yearInternship, marginRight, y, {
        align: "right",
      });
      y += 8;

      internship.tasksInternship.forEach((task) => {
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.text("-", marginLeft, y);
        doc.text(task, marginLeft + 3, y, {
          maxWidth: contentWidth,
        });

        const taskHeight = doc.getTextDimensions(task, {
          maxWidth: contentWidth,
        }).h;
        y += taskHeight + 1;
      });
    });
  }

  // -------------------------COURSES------------------------------------
  if (courses.length === 0) {
  } else if (courses.length === 1) {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("COURSE", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  } else {
    y += 8;
    doc.setFont("times-new-roman-bold", "bold");
    doc.setFontSize(17);
    doc.text("COURSES", marginLeft, y);

    y += 2;
    doc.line(marginLeft, y, marginRight, y);
  }

  if (courses.length === 0) {
  } else {
    courses.forEach((course) => {
      y += 5;
      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(course.kursus, marginLeft, y);

      doc.setFont("times-new-roman-bold", "bold");
      doc.setFontSize(12);
      doc.text(course.lokasiKursus, marginRight, y, {
        align: "right",
      });

      y += 5;
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(course.bidangKursus, marginLeft, y);

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.text(course.tahunKursus, marginRight, y, {
        align: "right",
      });
      y += 8;
    });
  }

  // -------------------------SAVE PDF-------------------------------------
  doc.save("CV-" + new Date().toString().slice(0, 10) + ".pdf");
}

window.directReportTab = directReportTab;

document
  .getElementById("btnDownloadPDF")
  .addEventListener("click", function () {
    if (typeof window.directReportTab === "function") {
      window.directReportTab();
    } else {
      alert("Fungsi report belum tersedia. Coba refresh!");
    }
  });
