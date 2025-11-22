document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userFormLogin");
  const userManager = new User();

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailByInput = document.getElementById("email").value;

    const result = userManager.loginUser(emailByInput);

    if (result.success) {
      localStorage.setItem("emailLoggedIn", emailByInput);
      return (window.location.href = "../manage.html");
    } else {
      alert("Username tidak ditemukan");
      console.log(result.message);
    }

    // console.log("berhasil tersubmit");
  });
});
