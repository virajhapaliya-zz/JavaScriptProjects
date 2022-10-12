const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");
const mainEl = document.getElementById("main");
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weatherEl = document.createElement("div");
  weatherEl.classList.add("weather");
  weatherEl.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
      ${temp}°C
    </h2>
    <small> ${data.weather[0].main}</small>

    

  `;

  main.innerHTML = ``;
  mainEl.appendChild(weatherEl);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchEl.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
