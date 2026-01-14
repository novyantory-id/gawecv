// console.log("Logout Loaded");
// const user = new User();
// document.addEventListener("click", (e) => {
//   if (e.target.id === "btnLogout") {
//     e.preventDefault();
//     user.logoutUser();
//     window.location.href = "login.html";
//   }
// });

// console.log("Logout Loaded");
const user = new User();
document.addEventListener("click", (e) => {
  const btnLogout = e.target.closest("#btnLogout");
  if (!btnLogout) return;

  e.preventDefault();
  user.logoutUser();
  window.location.href = "login.html";
});
