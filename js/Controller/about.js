document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();
  const email = userManager.getLogins();

  // Authentication
  if (!email) {
    alert("Silahkan login terlebih dahulu");
    location.href = "login.html";
    return;
  }

  const user = userManager.getUserByEmail(email);
  const id = user.id;

  //get element form
  const aboutForm = document.getElementById("aboutForm");

  const idInput = aboutForm.querySelector("[name='id']");
  const nameInput = aboutForm.querySelector("[name='name']");
  const emailInput = aboutForm.querySelector("[name='email']");
  const nohpInput = aboutForm.querySelector("[name='nohp']");
  const socialmediaInput = aboutForm.querySelector("[name='socialmedia']");
  const lulusanInput = aboutForm.querySelector("[name='lulusan']");
  const descInput = aboutForm.querySelector("[name='about']");
  const addressInput = aboutForm.querySelector("[name='alamat']");
  const regionalInput = aboutForm.querySelector("[name='regional']");

  //fill data to form
  emailInput.value = email;
  emailInput.readOnly = true;

  if (user) {
    idInput.value = user.id;
    nameInput.value = user.nama || "";
    nohpInput.value = user.nohp || "";
    socialmediaInput.value = user.socialmedia || "";
    lulusanInput.value = user.lulusan || "";
    descInput.value = user.about || "";
    addressInput.value = user.alamat || "";
    regionalInput.value = user.regional || "";
  }

  //submit
  aboutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updateUser = {
      id,
      email,
      nama: nameInput.value,
      nohp: nohpInput.value,
      socialmedia: socialmediaInput.value,
      lulusan: lulusanInput.value,
      about: descInput.value,
      alamat: addressInput.value,
      regional: regionalInput.value,
    };

    userManager.updateUser(updateUser);
    alert("Data berhasil disimpan");
  });
});
