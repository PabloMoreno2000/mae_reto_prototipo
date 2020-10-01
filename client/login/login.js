const buttonId = "log-button";
const usernameId = "inputId";
const passwordId = "inputPassword";

async function isMae() {
  let result;

  try {
    result = await $.ajax({
      url: "http://localhost:5151/api/users/me",
      type: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });

    return result.isMae;
  } catch (error) {
    console.error(error);
  }
}

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
      success: async function (result) {
        localStorage.setItem("x-auth-token", result.token);

        let ismae = await isMae();
        if (ismae) {
          document.location.href = "../maeHome/home.html";
        } else {
          document.location.href = "../maeList/maeList.html";
        }
      },
      error: function (_, textStatus, errorThrown) {},
    });
  });
});
