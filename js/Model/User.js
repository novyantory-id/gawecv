class User {
  constructor() {
    this.users = this.getUsers() || [];
  }
  saveUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));

    // return (window.location.href = "../login.html");

    return {
      success: true,
    };
  }

  loginUser(emailByInput) {
    //proses pemeriksaan data username pada localstorage
    const userExists = this.users.some(
      (user) => user.email.toLowerCase() === emailByInput.toLowerCase()
    );

    if (userExists) {
      //proses pengembalian data ke login.js controller
      return {
        success: true,
        email,
      };
    } else {
      return {
        success: false,
        message: "Data tidak ditemukan",
      };
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
