class Course {
  constructor() {
    this.courses = this.getCourses();
  }

  getCourses() {
    return JSON.parse(localStorage.getItem("courses")) || [];
  }

  saveCourse(courseData) {
    const newCourseData = {
      id: Date.now(),
      ...courseData,
    };

    this.courses.push(newCourseData);
    localStorage.setItem("courses", JSON.stringify(this.courses));

    return {
      success: true,
    };
  }
}
