export const handleAddFile = (repoName) => {
  console.log(document.querySelector("input").files);
  let request = new XMLHttpRequest();
  request.onload = () => {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText.startsWith("error")) return;
      window.history.back();
    }
  };
  request.open("POST", `http://localhost:8085/AddFiles/${repoName}`);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send(new FormData(document.querySelector("form")));
};
