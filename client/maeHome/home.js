const inputLink = "link-asesorias";
const buttonChange = "change-link-button";

document.addEventListener("DOMContentLoaded", function (event) {
  document
    .getElementById("mae-name")
    .append(document.createTextNode(getFromStorage(keyCurrentUserId)));
});
