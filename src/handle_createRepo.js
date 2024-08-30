export const handleCreateRepo = (e) => {
  e.preventDefault();
  document.location.assign("/createRepo");
};

export const handleCreateRepoRequest = (e) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      console.log("received");
      if (request.responseText.startsWith("error")) {
        console.log("error", request.responseText);
        return;
      }
      console.log(request.responseText);
      document.location.assign("/");
      return;
    }
  };
  request.open("POST", `http://localhost:8085/createRepo`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send(new FormData(document.forms[0]));
  e.preventDefault();
};
