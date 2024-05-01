class functions {
  getLocalStorage() {
    if (localStorage.getItem("place")) {
      return JSON.parse(localStorage.getItem("place"));
    } else {
      return null;
    }
  }
  fetchWeather(url) {
    return fetch(url);
  }
}
export const theFunctions = new functions();

export const addOrsearch = async (place, setcountyChoosed, Swal, type) => {
  if (place["縣市"] === "" && place["鄉鎮、區"] === "") {
    Swal.fire({
      title: "請選行政區",
      confirmButtonText: "確定",
      confirmButtonColor: "black",
      icon: "error",
    });
    return;
  }
  if (place["鄉鎮、區"] === "") {
    place = { ...place, 縣市: place["縣市"].slice(1) };
  } else {
    place = {
      ...place,
      縣市: place["縣市"].slice(1),
      "鄉鎮、區": place["鄉鎮、區"].slice(3),
    };
  }
  let queryObj = {};
  for (let item in place) {
    if (place[item] !== "") {
      queryObj[item] = place[item];
    }
  }
  if (type === "add") {
    localStorage.setItem("place", JSON.stringify(queryObj));
    Swal.fire({
      title: "儲存完成",
      confirmButtonText: "確定",
      confirmButtonColor: "black",
      icon: "success",
    });
  } else {
    setcountyChoosed(queryObj);
  }
};
