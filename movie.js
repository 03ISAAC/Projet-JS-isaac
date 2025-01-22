const apiKey = 'aa790bc7';

function getMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
            const movie = data;
            const output = `
                <h2>${movie.Title}</h2>
                <img src="${movie.Poster}" alt="Poster">
                <p><strong>Année:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Synopsis:</strong> ${movie.Plot}</p>
                <p><strong>Acteurs:</strong> ${movie.Actors}</p>
                <p><strong>Notes:</strong> ${movie.Ratings.map(r => r.Source + ': ' + r.Value).join(', ')}</p>
                <p><strong>Date de sortie en DVD:</strong> ${new Date(movie.DVD).toLocaleDateString('fr-FR')}</p>
            `;
            document.getElementById('movie-details').innerHTML = output;
        })
        .catch(error => console.error('Error:', error));
}

window.onload = getMovieDetails;
