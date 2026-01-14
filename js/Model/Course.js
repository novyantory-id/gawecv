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

  updateCourse(id, newData) {
    const courses = this.getCourses();
    const index = courses.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("ID tidak ditemukan ", id);
      return;
    }

    this.courses[index] = newData;
    this.updateLocalStorage();
  }

  deleteCourse(idDelete) {
    const courses = this.getCourses();
    const index = courses.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan ", idDelete);
      return {
        success: false,
        message: "Course tidak ditemukan!",
      };
    }

    this.courses.splice(index, 1);

    this.updateLocalStorage();

    return {
      success: true,
      message: "Course berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("courses", JSON.stringify(this.courses));
  }
}
