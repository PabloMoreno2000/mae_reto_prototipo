const buttonId = "log-button";
const usernameId = "inputId";
const passwordId = "inputPassword";

function isUserMae(matricula, password) {
  for (let i = 0; i < maes.length; i++) {
    mae = maes[i];
    if (mae.matricula == matricula && mae.password == password) {
      return true;
    }
  }
  return false;
}

function isStudent(matricula, password) {
  for (let i = 0; i < students.length; i++) {
    student = students[i];
    if (student.matricula == matricula && student.password == password) {
      return true;
    }
  }
  return false;
}

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById(buttonId).addEventListener("click", (event) => {
    let username = document.getElementById(usernameId).value;
    let password = document.getElementById(passwordId).value;

    setOnStorage(keyCurrentUserId, username);
    if (isUserMae(username, password)) {
      setOnStorage(keyIsMae, true);
      (document.location.href = "../maeHome/home.html"), true;
    } else if (isStudent(username, password)) {
      setOnStorage(keyIsMae, false);
      (document.location.href = "../maeList/maeList.html"), true;
    } else {
      console.log("invalid user");
    }
  });
});
