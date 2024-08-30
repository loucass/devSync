export const handleRepo = (callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      if (request.responseText.startsWith("error")) {
        console.log("error");
        callback(request.responseText.replace("error ", ""), null);
        return;
      }
      let data = JSON.parse(request.response);
      console.log(data);
      callback(null, data);
      return data;
    }
  };
  request.open("GET", `http://localhost:8085/repo`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};

export const viewRepo = (user, repo) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      if (request.responseText.startsWith("error")) {
        console.log("error", request.responseText);
        return;
      }
      let data = JSON.parse(request.response);
      console.log(data);
      document.location.assign(`/${user}/${repo}`);
      return data;
    }
  };
  request.open("GET", `http://localhost:8085/${user}/${repo}`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};

export const viewRepo2 = (user, repo, callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      if (request.responseText.startsWith("error")) {
        console.log("error", request.responseText);
        callback(request.responseText, null);
        return;
      }
      let data = JSON.parse(request.response);
      console.log(data);
      callback(null, data);
      return data;
    }
  };
  request.open("GET", `http://localhost:8085/${user}/${repo}`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};
