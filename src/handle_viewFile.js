export const handleViewFile = (userName, repoName, fileName) => {
  document.querySelector("h2").innerText = fileName;
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText.startsWith("error")) {
        return;
      } else if (request.responseText.startsWith("image")) {
        console.log(request.responseText.split(" ")[1]);
        document.images[0].src =
          "http://localhost:8085" + request.responseText.split(" ")[1];
        document.images[0].className = "";
        return;
      }
      document.images[0].className = "hidden";
      document.querySelector("code").innerHTML = request.responseText;
    }
  };
  request.open(
    "GET",
    `http://localhost:8085/${userName}/${repoName}/${fileName}`
  );
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};

export const downloadFile = (userName, repoName, fileName) => {
  let request = new XMLHttpRequest();
  // request.responseType = "text";
  request.onload = () => {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText.startsWith("error")) {
        return;
      }
      console.log(request.response);
      let url = window.URL.createObjectURL(
        new Blob([request.response], { type: "text/plain" })
      );
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.append(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  };
  request.open(
    "GET",
    `http://localhost:8085/${userName}/${repoName}/${fileName}/download`
  );
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};
