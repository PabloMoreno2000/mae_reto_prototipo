let maes = [
  new Mae("A11111111", "123", "Juan Pérez", "https://www.google.com", false),
  new Mae(
    "A22222222",
    "123",
    "Marcela Fernández",
    "https://www.google.com",
    false
  ),
  new Mae("A33333333", "123", "Alex López", "https://www.google.com", false),
];

let students = [
  new Student("A44444444", "123", "mty"),
  new Student("A55555555", "123", "mty"),
];

let currentUserId = "";
let isMae = false;

localStorage.setItem("isMae", isMae);
localStorage.setItem("currentUserId", currentUserId);
localStorage.setItem("maes", JSON.stringify(maes));
localStorage.setItem("students", JSON.stringify(students));
