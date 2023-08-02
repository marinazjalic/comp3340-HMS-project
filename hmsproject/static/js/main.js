var toggled = false;
var linkIds = ["link1", "link2", "link3"];

var currentPath = ""; //init to empty str

var registerSelected = true;
var patientLogin = true;

window.onload = function (e) {
  currentPath = window.location.pathname;
  //   var button = document.getElementById("register-btn");
  //   var login_btn = document.getElementById("signin-btn");
  //   var note_btn = document.getElementById("note-btn");
  //   button.addEventListener("click", clickRegisterBtn);
  //   login_btn.addEventListener("click", clickSignUpBtn);
  //   note_btn.addEventListener("click", addNewNote);

  if (currentPath == "/appointments/") {
    var denyButtons = Array.prototype.slice.call(
      document.getElementsByClassName("deny-icon")
    );
    var approveButtons = Array.prototype.slice.call(
      document.getElementsByClassName("approve-icon")
    );
    var cancelButtons = Array.prototype.slice.call(
      document.getElementsByClassName("cancel-button")
    );

    denyButtons.forEach((button) => {
      button.addEventListener("click", denyAppointment);
    });

    approveButtons.forEach((button) => {
      button.addEventListener("click", confirmAppointment);
    });

    cancelButtons.forEach((button) => {
      button.addEventListener("click", cancelAppointment);
    });

    var search_bar = document.getElementById("search-appts");
    search_bar.addEventListener("keypress", function (event) {
      if (event.key == "Enter") {
        searchApptTable();
      }
    });
  }

  if (currentPath == "/patientView/") {
    var request_btn = document.getElementById("req-btn");
    request_btn.addEventListener("click", requestAppointment);
  }

  if (currentPath == "/") {
    var register_btn = document.getElementById("signup-btn");
    register_btn.addEventListener("click", launchViewByRole);
  }

  if (currentPath == "/patients/") {
    var rows = document.getElementById("all-patients").children[0].rows;
    var rowData = Array.prototype.slice.call(rows);

    rowData.forEach((row) => {
      if (row.className == "patient-info-row") {
        row.addEventListener("click", function () {
          patientRowClicked(this);
        });
      }
    });

    var import_btn = document.getElementById("import-btn");
    import_btn.addEventListener("click", importPatientInfo);

    var search_bar = document.getElementById("search-input");
    search_bar.addEventListener("keypress", function (event) {
      if (event.key == "Enter") {
        searchPatientTable();
      }
    });
  }
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
  registerSelected = true;
  resetButtonStyle(login_btn);
}

function clickSignUpBtn() {
  var button = document.getElementById("signin-btn");
  var reg_btn = document.getElementById("register-btn");
  button.style.fontWeight = "bold";
  button.style.borderBottom = "2px solid #0099ff";
  var signupBtn = document.getElementById("signup-btn");
  signupBtn.style.marginTop = "2%";
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
  var table = document.getElementById("notes-table");
  var form = document.getElementById("note-input");
  var formRow = document.getElementById("form-row");
  formRow.style.display = "block";
  form.style.display = "block";
}

function focusOutFunc() {
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
  patientLogin = true;
}

function doctorSelected() {
  var form = document.getElementsByClassName("optional")[0];
  form.style.display = "none";

  patientLogin = false;
}

function denyAppointment() {
  var rowIndex = event.target.parentNode.parentNode.rowIndex;
  document.getElementById("pending-appts").deleteRow(rowIndex);
}

function confirmAppointment() {
  var name, date, time, reason;
  var rowInfo = event.target.parentNode.parentNode;
  var tableData = Array.prototype.slice.call(
    rowInfo.getElementsByTagName("td")
  );

  //get all values from the row
  tableData.forEach((td) => {
    if (td.className == "patient-name") {
      name = td.innerHTML;
    }

    if (td.className == "appt-reason") {
      reason = td.innerHTML;
    }

    if (td.className == "appt-date") {
      date = td.innerHTML;
    }

    if (td.className == "appt-time-small") {
      time = td.innerHTML;
    }
  });

  //insert row into upcoming appts table
  var table = document.getElementById("upcoming-appt");
  var rowToInsert = table.insertRow(0);
  rowToInsert.id = "patient-appt";

  var cell5 = rowToInsert.insertCell(0);
  var cell4 = rowToInsert.insertCell(0);
  var cell3 = rowToInsert.insertCell(0);
  var cell2 = rowToInsert.insertCell(0);

  var cell1 = rowToInsert.insertCell(0);

  var cancelBtn = document.createElement("BUTTON");
  var buttonText = document.createTextNode("CANCEL");
  cancelBtn.appendChild(buttonText);

  cell1.className = "patient-name";
  cell2.className = "appt-reason";
  cell3.className = "appt-date";
  cell4.className = "appt-time-small";
  cancelBtn.className = "cancel-button";
  cancelBtn.addEventListener("click", cancelAppointment);

  cell1.innerHTML = name;
  cell2.innerHTML = reason;
  cell3.innerHTML = date;
  cell4.innerHTML = time;
  cell5.appendChild(cancelBtn);

  //delete row from pending appt table
  document.getElementById("pending-appts").deleteRow(rowInfo.rowIndex);
}

function cancelAppointment() {
  var rowIndex = event.target.parentNode.parentNode.rowIndex;
  document.getElementById("upcoming-appt").deleteRow(rowIndex);
}

function requestAppointment() {
  var reason = document.getElementById("reason").value;
  var date = document.getElementById("appt-date").value;
  var time = document.getElementById("appt-time").value;

  //insert row into manage appt table
  var table = document.getElementById("manage-appts");
  var rowToInsert = table.insertRow(0);
  rowToInsert.id = "manage-appt-row";

  var cell4 = rowToInsert.insertCell(0);
  var cell3 = rowToInsert.insertCell(0);
  var cell2 = rowToInsert.insertCell(0);
  var cell1 = rowToInsert.insertCell(0);

  cell1.className = "appt-reason";
  cell2.className = "appt-date";
  cell3.className = "appt-time-small";
  cell4.id = "appt-status";

  cell1.innerHTML = reason;
  cell2.innerHTML = date;
  cell3.innerHTML = time;
  cell4.innerHTML = "Pending";
}

function launchViewByRole() {
  if (patientLogin) {
    window.location = "/patientView";
  } else {
    window.location = "/dashboard";
  }
}

function patientRowClicked(tableRow) {
  var name, doctor, bday;

  var tableData = Array.prototype.slice.call(
    tableRow.getElementsByTagName("td")
  );

  tableData.forEach((td) => {
    if (td.id == "name-patient") {
      name = td.innerHTML;
    }
    if (td.id == "patient-doc") {
      doctor = td.innerHTML;
    }
    if (td.id == "patient-bday") {
      bday = td.innerHTML;
    }
  });

  var name_heading = document.getElementById("name-heading");
  var bday_info = document.getElementById("patient-dob");
  var patient_doc = document.getElementById("patient-doctor");
  name_heading.innerText = name;
  bday_info.innerText = "D.O.B: " + bday;
  patient_doc.innerText = doctor;
}

function importPatientInfo() {
  var patient_name = document
    .getElementById("name-heading")
    .innerHTML.split(" ");

  var patient_dob = document.getElementById("patient-dob").innerHTML.split(" ");

  var fname_field = document.getElementById("fname");
  var lname_field = document.getElementsByClassName("lastName")[0];
  var bday_field = document.getElementById("bday");
  var date_field = document.getElementById("date");
  var patient_addr = document.getElementById("addr_field").innerHTML;
  var patient_city = document.getElementById("patient_city").innerHTML;
  var addr_field = document.getElementById("address");
  var city_field = document.getElementById("patientcity");

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  var todays_date = month + "/" + day + "/" + year;

  fname_field.value = patient_name[0];
  lname_field.value = patient_name[1];
  bday_field.value = patient_dob[1];
  date_field.value = todays_date;
  addr_field.value = patient_addr;
  city_field.value = patient_city;
}

function searchPatientTable() {
  var i;
  var input = document.getElementById("search-input").value;
  var table = document.getElementById("all-patients");
  var rows = table.children[0].rows;
  //   let nameArr = new Array();

  if (input != "") {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className != "patient-table-header") {
        var value = rows[i].cells[0].firstChild.data;

        if (value != input && !value.includes(input)) {
          rows[i].style.display = "none";
        }
      }
    }
  } else {
    for (i = 0; i < rows.length; i++) {
      rows[i].style.display = "table-row";
    }
  }
}

function searchApptTable() {
  var upcoming_table = document.getElementById("upcoming-appt");
  var rows = upcoming_table.children[0].rows;
  var name_input = document.getElementById("search-appts").value;

  var pending_table = document.getElementById("pending-appts");
  var pending_rows = pending_table.children[0].rows;

  if (name_input != "") {
    //filter upcoming appt table
    for (let i = 0; i < rows.length; i++) {
      var value = rows[i].cells[0].firstChild.data;
      if (value != name_input && !value.includes(name_input)) {
        rows[i].style.display = "none";
      }
    }
    //filtering pending appt table
    for (let j = 0; j < pending_rows.length; j++) {
      var value = pending_rows[j].cells[0].firstChild.data;
      if (value != name_input && !value.includes(name_input)) {
        pending_rows[j].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.display = "table-row";
    }

    for (let i = 0; i < pending_rows.length; i++) {
      pending_rows[i].style.display = "table-row";
    }
  }
}
