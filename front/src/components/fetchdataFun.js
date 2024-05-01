class fetchData {
  fetchWeather(url) {
    return fetch(url);
  }
}
export const fetchingData = new fetchData();
