export const handleLogSign = (e) => {
  if (document.querySelector("h1").innerText !== "Login") {
    if (
      document.querySelector("#password").value !==
      document.querySelector("#confirmPassword").value
    ) {
      e.preventDefault();
      return (document.querySelector("#errors").innerHTML =
        "password don't match");
    } else {
      document.querySelector("#errors").innerHTML = "";
    }
  }
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      console.log(request.responseText);
      if (request.responseText.startsWith("error")) {
        document.querySelector("#errors").innerHTML = request.response.replace(
          "error ",
          ""
        );
        return;
      }
      localStorage.setItem("JK", JSON.stringify({ _: request.responseText }));
      document.location.assign("/");
    }
  };
  request.open(
    "POST",
    `http://localhost:8085/${
      document.querySelector("h1").innerText === "Login" ? "login" : "signup"
    }`
  );
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send(new FormData(document.querySelector("form")));
  e.preventDefault();
};

export const handleRequests = () => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      console.log(request.responseText);
      // console.log(
      //   atob(
      //     request.responseText
      //       .split(".")[1]
      //       .replace("/-/", "+")
      //       .replace("/_/", "/")
      //   )
      // );
      if (request.responseText.startsWith("error")) {
        localStorage.clear();
        return;
      }
      localStorage.setItem("JK", JSON.stringify({ _: request.responseText }));
      document.location.assign("/");
    }
  };
  request.open(
    "POST",
    `http://localhost:8085/${
      document.querySelector("h1").innerText === "Login" ? "login" : "signup"
    }`
  );
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
    request.send();
  }
};
