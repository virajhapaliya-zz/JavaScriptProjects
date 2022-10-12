const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector("main");
const formEl = document.getElementById("form");
const search = document.getElementById("search");
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData);
  return respData;
}

function getClassByAverage(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});

function showMovies(movies) {
  mainEl.innerHTML = ``;
  movies.results.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img
              src="${IMGPATH + poster_path}"
              alt="${title}"
            />
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByAverage(
                vote_average
              )}">${vote_average}</span>
            </div>
            <div class="overview">${overview}</div>
        `;
    mainEl.appendChild(movieEl);
  });
}

async function searchMovie(movie_name) {
  const resp = await fetch(SEARCHAPI + movie_name);
  const respData = await resp.json();
  return {};
}
