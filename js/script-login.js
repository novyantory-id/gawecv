const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

// console.log("sukses diklik", registerBtn);
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

// console.log("sukses diklik", loginBtn);
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
