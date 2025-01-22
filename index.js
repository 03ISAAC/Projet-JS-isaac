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
function loadTrendingMovies() {
    let output = "";
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=2021`)
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
                  <p>
                    ${movie.Plot}
                  </p>
                </div>
              </div>
                `;
        }
        console.log(output);
        document.getElementById("movies-list").innerHTML = output;
      });
    })
    .then(()=>{
        setTimeout(()=>{document.querySelector("#loader").remove()},3000)
    })
    .catch((error) => console.error("Error:", error));
}

function loadMore() {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=2024`)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.Search;
      let output = "";
      movies.forEach((movie) => {
        output += `
                    <div>
                        <img src="${movie.Poster}" alt="Poster">
                        <h2>${movie.Title}</h2>
                        <p>${movie.Year}</p>
                        <a href="movie.html?title=${encodeURIComponent(
                          movie.Title
                        )}">En savoir plus</a>
                    </div>
                `;
      });
      document.getElementById("trending-movies").innerHTML += output;
    })
    .catch((error) => console.error("Error:", error));
}

window.onload = loadTrendingMovies;
