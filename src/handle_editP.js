export const handleEditP = (callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      console.log("received");
      if (request.responseText.startsWith("error")) {
        console.log("error");
        callback(request.responseText.replace("error ", ""), null);
        return;
      }
      console.log(request.responseText);
      callback(null, request.responseText);
      return;
    }
  };
  request.open("POST", `http://localhost:8085/profileEdit`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send(new FormData(document.forms[0]));
};

export const handleDeleteP = (callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      if (request.responseText.startsWith("error")) {
        console.log("error");
        callback(request.responseText.replace("error ", ""), null);
        return;
      }
      console.log(request.responseText);
      callback(null, request.responseText);
      return;
    }
  };
  request.open("POST", `http://localhost:8085/deleteProfilePhoto`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};
