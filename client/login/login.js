const buttonId = "log-button";
const usernameId = "inputId";
const passwordId = "inputPassword";

async function getCurrentUser() {
  let result;

  try {
    result = await $.ajax({
      url: "http://localhost:5151/api/users/me",
      type: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });

    return result;
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
        let user = await getCurrentUser();
        localStorage.setItem("user", JSON.stringify(user));
        if (user.isMae) {
          document.location.href = "../maeHome/home.html";
        } else {
          document.location.href = "../maeList/maeList.html";
        }
      },
      error: function (_, textStatus, errorThrown) {},
    });
  });
});
