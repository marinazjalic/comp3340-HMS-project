var toggled = false;
var linkIds = ["link1", "link2", "link3", "link4"];

window.onload = function (e) {
  var button = document.getElementById("register-btn");
  var login_btn = document.getElementById("signin-btn");
  button.addEventListener("click", clickRegisterBtn);
  login_btn.addEventListener("click", clickSignUpBtn);
};
function openNav() {
  var menu = document.getElementsByClassName("sidebar-container")[0];
  var middle_container = document.getElementsByClassName("middle-container")[0];
  var main_container = document.getElementsByClassName("main-container")[0];
  var right_container = document.getElementsByClassName("right-container")[0];

  linkIds.forEach((id) => {
    var item = document.getElementById(id).getElementsByClassName("link")[0];
    item.style.display = "inline-flex";
  });
  menu.style.width = "15%";
}

function closeNav() {
  var menu = document.getElementsByClassName("sidebar-container")[0];
  var main_container = document.getElementsByClassName("main-container")[0];
  var right_container = document.getElementsByClassName("right-container")[0];
  menu.style.width = "3%";

  linkIds.forEach((id) => {
    var item = document.getElementById(id).getElementsByClassName("link")[0];
    item.style.display = "none";
  });
}
function toggleMenuBar() {
  if (!toggled) {
    openNav();
    toggled = true;
  } else {
    closeNav();
    toggled = false;
  }
}

function clickRegisterBtn() {
  var reg_btn = document.getElementById("register-btn");
  var login_btn = document.getElementById("signin-btn");
  var form = document.getElementsByClassName("optional")[0];

  form.style.display = "inline-block";

  var signupBtn = document.getElementById("signup-btn");
  signupBtn.style.marginTop = "5%";
  signupBtn.textContent = "Register";

  reg_btn.style.fontWeight = "bold";
  reg_btn.style.borderBottom = "2px solid #0099ff";
  resetButtonStyle(login_btn);
}

function clickSignUpBtn() {
  var button = document.getElementById("signin-btn");
  var reg_btn = document.getElementById("register-btn");
  button.style.fontWeight = "bold";
  button.style.borderBottom = "2px solid #0099ff";
  var signupBtn = document.getElementById("signup-btn");
  signupBtn.style.marginTop = "60%";
  signupBtn.textContent = "Sign In";
  var form = document.getElementsByClassName("optional")[0];

  form.style.display = "none";
  resetButtonStyle(reg_btn);
}

function resetButtonStyle(resetBtn) {
  resetBtn.style.fontWeight = "normal";
  resetBtn.style.borderBottom = "none";
}
