const maeList = "maes";

function createElement(element) {
  let createElementHelper = (element, elementsWithKey) => {
    // Create element node
    let elem = document.createElement(element.elementType);
    if (element["text"]) {
      elem.append(document.createTextNode(element.text));
    }

    // Create the children of the node and append them to it
    if (element["innerElements"]) {
      for (let i = 0; i < element.innerElements.length; i++) {
        let tempElement = createElementHelper(
          element["innerElements"][i],
          elementsWithKey
        );
        elem.append(tempElement);
      }
    }

    // Set each attribute of the node like className, style, img, src, etc.
    if (element["attributes"]) {
      let attributes = element["attributes"];
      for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          elem[key] = attributes[key];
        }
      }
    }

    // If there's a key "key", put the current node inside this array
    if (element["key"]) {
      elementsWithKey[element.key] = elem;
    }

    return elem;
  };

  elementsWithKey = [];
  createElementHelper(element, elementsWithKey);
  return elementsWithKey;
}

function addMaesToList(maes) {
  for (let i = 0; i < maes.length; i++) {
    let mae = maes[i];
    let maeNodeElement = {
      key: "main",
      elementType: "li",
      attributes: { className: "media", style: "margin-bottom: 1em;" },
      innerElements: [
        {
          elementType: "img",
          attributes: {
            className: "mr-3",
            src: "../resources/avatar.jpg",
            style: "weight:64px; height:64px;",
          },
        },
        {
          elementType: "div",
          attributes: { className: "media-body" },
          innerElements: [
            {
              elementType: "h5",
              attributes: { className: "mt-0 mb-1" },
              text: `${mae.maeInfo.name}`,
            },
            {
              elementType: "button",
              key: "button",
              text: "Ir con MAE",
              attributes: { type: "button", className: "btn btn-primary" },
            },
          ],
        },
      ],
    };

    let nodes = createElement(maeNodeElement);
    // On click, open anothert tab to the mae link
    nodes["button"].addEventListener("click", (event) => {
      window.open(mae.maeInfo.link, "_blank");
      // Register the possible tutoring session
      $.ajax({
        url: "http://localhost:5151/api/tutoring",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
        data: JSON.stringify({
          userIdGives: mae._id,
        }),
        success: function (result) {
          console.log(result);
        },
      });
    });
    document.getElementById(maeList).append(nodes["main"]);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  $.ajax({
    url: "http://localhost:5151/api/maes",
    type: "GET",
    success: function (result) {
      addMaesToList(result);
    },
    error: function (_, textStatus, errorThrown) {},
  });
});
