function Student(matricula, password, campus) {
  this.matricula = matricula;
  this.password = password;
  this.campus = campus;
}

function Mae(matricula, password, name, link, isActive) {
  this.matricula = matricula;
  this.password = password;
  this.name = name;
  this.campus = "mty";
  this.link = link;
  this.isActive = isActive;
}

function findMaeById(matricula) {
  for (let i = 0; i < maes.length; i++) {
    let mae = maes[i];
    if (mae.matricula == matricula) {
      return mae;
    }
  }
  return null;
}

function findStudentById(matricula) {
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    if (student.matricula == matricula) {
      return student;
    }
  }
  return null;
}

///////////////////////////////localStorage items
// keys
const keyIsMae = "isMae";
const keyCurrentUserId = "currentUserId";
const keyMaes = "maes";
const keyStudents = "students";

function getFromStorage(key, isJSON = false) {
  let value = localStorage.getItem(key);
  if (isJSON) {
    value = JSON.parse(value);
  }
  return value;
}

function setOnStorage(key, value, isJSON = false) {
  if (isJSON) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}
