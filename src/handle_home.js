export const handleHome = (callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.status === 200 && request.readyState === 4) {
      console.log("received");
      if (request.responseText.startsWith("error no authentication")) {
        console.log("error");
        document.location.assign("/login");
        return;
      }
      let data = JSON.parse(request.response);
      localStorage.setItem("JK", JSON.stringify({ _: data.authorization }));
      data.userAbout = data.userAbout ? data.userAbout : "no about";
      data.userPhoto = data.userPhoto
        ? "http://localhost:8085/profilePic/" + data.userPhoto
        : "https://via.placeholder.com/150";
      // console.log(data);
      callback(null, data);
      return data;
    }
  };
  request.open("GET", `http://localhost:8085/home`, true);
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem("JK"))._ &&
      request.setRequestHeader(
        "authorization",
        `bearer ${localStorage.getItem("JK")}`
      );
  }
  request.send();
};
