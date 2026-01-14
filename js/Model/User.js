class User {
  constructor() {
    this.users = this.getUsers();
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
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

  getLogins() {
    return localStorage.getItem("emailLoggedIn") || null;
  }

  getUserByEmail(email) {
    return this.getUsers().find((u) => u.email === email);
  }

  updateUser(updateUser) {
    const users = this.getUsers().map((u) =>
      u.email === updateUser.email ? updateUser : u
    );
    localStorage.setItem("users", JSON.stringify(users));
  }

  logoutUser() {
    return localStorage.removeItem("emailLoggedIn") || null;
  }
}
