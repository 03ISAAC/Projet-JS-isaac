const apiKey = "aa790bc7";
async function getMovieDetails(id) {
  try {
    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(
      (response) => response.json()
    );
  } catch (err) {
    return null;
  }
}
function searchMovies() {
  const el = document.querySelector("#search-input");
  console.log(el);
  const query = el.value;
  if (query == "" || query == null) {
    console.log(query);
    alert("No input given !");
    return;
  }

  let output = "";
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=1`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      /**@type any[] */
      const movies = data.Search;
      //   let output = "";
      movies.forEach(async (searchResult) => {
        const movie = await getMovieDetails(searchResult.imdbID);
        if (movie != null) {
          console.log(movie);

          output += `
                <a href="/movie.html?id=${movie.imdbID}">
                <div class="movie-info">
                <img
                  src="${movie.Poster}"
                  alt="${movie.Title}"
                  class="poster"
                />
                <div class="more-icon">
                  <i class="ri-more-fill"></i>
                </div>
                <div class="movie-details">
                  <h3>${movie.Title}</h3>
                  <p class="details">${movie.Year} / ${movie.Rated} / ${movie.Runtime} / ${movie.Genre}</p>
                  <p class="plot">
                    ${movie.Plot}
                  </p>
                </div>
              </div>
              </a>
                `;
        }
        console.log(output);
        document.getElementById("movies-list").innerHTML = output;
      });
    })
    .then(() => {
      setTimeout(() => {
        document.querySelector("#loader").remove();
      }, 300);
    })
    .catch((error) => console.error("Error:", error));
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("q")) {
    const query = params.get("q");
    if (query.trim() != "") {
      const el = document.querySelector("#search-input");
      el.value = query;
      searchMovies();
    }
  }
  document.querySelector("#loader").remove();
  document.querySelector("#search-trigger").addEventListener("click", (e) => {
    searchMovies();
    e.preventDefault()
  });
};
