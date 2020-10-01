const inputLink = "link-asesorias";
const buttonChange = "change-link-button";

$(document).ready(function () {
  let mae = JSON.parse(localStorage.getItem("user"));
  document
    .getElementById("mae-name")
    .append(document.createTextNode(mae.maeInfo.name));
  console.log("AHHH");
});
