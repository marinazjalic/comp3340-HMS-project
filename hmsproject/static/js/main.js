var toggled = false;
var linkIds = ["link1", "link2", "link3", "link4"];

var registerSelected = true;

// window.onload = function (e) {
//   var button = document.getElementById("register-btn");
//   var login_btn = document.getElementById("signin-btn");
//   var note_btn = document.getElementById("note-btn");
//   button.addEventListener("click", clickRegisterBtn);
//   login_btn.addEventListener("click", clickSignUpBtn);
//   note_btn.addEventListener("click", addNewNote);
// };

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
  registerSelected = true;
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
  registerSelected = false;
  resetButtonStyle(reg_btn);
}

function resetButtonStyle(resetBtn) {
  resetBtn.style.fontWeight = "normal";
  resetBtn.style.borderBottom = "none";
}

function addNewNote() {
  console.log("reached");
  var table = document.getElementById("notes-table");
  var form = document.getElementById("note-input");
  var formRow = document.getElementById("form-row");
  formRow.style.display = "block";
  form.style.display = "block";
}

function focusOutFunc() {
  console.log("focus out");
  var table = document.getElementById("notes-table");
  var form = document.getElementById("note-input");

  //get user input, clear form and hide
  var noteVal = document.getElementById("note-input").value;
  form.value = "";
  form.style.display = "none";

  var row = table.insertRow(1);
  var cell = row.insertCell(0);

  cell.innerHTML = noteVal;
}

function patientSelected() {
  if (registerSelected) {
    var form = document.getElementsByClassName("optional")[0];
    form.style.display = "inline-block";
  }
}

function doctorSelected() {
  var form = document.getElementsByClassName("optional")[0];
  form.style.display = "none";
}
