document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userManager = new User();

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userData = {
      email: document.getElementById("google_mail").value,
    };

    const result = userManager.saveUser(userData);

    if (result.success) {
      return (window.location.href = "../login.html");
    } else {
      console.log("proses simpan data gagal");
    }

    console.log("berhasil tersubmit");
  });
});
