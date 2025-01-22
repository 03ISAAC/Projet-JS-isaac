const apiKey = 'votre_API_Key';

function searchMovie() {
    const query = document.getElementById('search-input').value;
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        .then(response => response.json())
        .then(data => {
            const movies = data.Search;
            let output = '';
            movies.forEach(movie => {
                output += `
                    <div>
                        <img src="${movie.Poster}" alt="Poster">
                        <h2>${movie.Title}</h2>
                        <p>${movie.Year}</p>
                        <a href="movie.html?title=${encodeURIComponent(movie.Title)}">En savoir plus</a>
                    </div>
                `;
            });
            document.getElementById('search-results').innerHTML = output;
        })
        .catch(error => console.error('Error:', error));
}
