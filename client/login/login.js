const buttonId = "log-button";
const usernameId = "inputId";
const passwordId = "inputPassword";

$(document).ready(function () {
  $("#log-button").click(function () {
    let username = document.getElementById(usernameId).value;
    let password = document.getElementById(passwordId).value;
    $.ajax({
      url: "http://localhost:5151/api/auth",
      type: "POST",
      data: JSON.stringify({
        matricula: username,
        password: password,
      }),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        //console.log(result.token);
        //document.cookie = `x-auth-token=${result.token}; Max-Age=2600000; Secure`;
        localStorage.setItem("x-auth-token", result.token);
        document.location.href = "../maeList/maeList.html";
      },
      error: function (_, textStatus, errorThrown) {},
    });
  });
});
