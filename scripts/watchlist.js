const watchListLocalStorage = JSON.parse(localStorage.getItem('watchlist'))

async function renderWatchlistMovies(arr){

    const exploreWatchList = document.getElementById('watchlist-container')
    const watchlistContainer = document.getElementById('watchlist-movie')

    if(arr){       
        exploreWatchList.classList.add('hidden') 
        watchlistContainer.classList.remove('hidden')
        const movies = await Promise.all(arr.map( imdbID => fetchMovie(IMDB_END_POINT, imdbID) ))
        const movieItems = movies.map( (movie, index)=> 
            `<div class="movie-item">
                    <img class="movie-poster" src="${movie.Poster}" alt="Movie poster">
                    <ul class="movie-descriptions">
                        <li>
                            <h2>${movie.Title}</h2>
                            <div class="rating-content">
                                <img class="star-icon" src="./images/star-icon.svg" alt="A star icon for movie ratings">
                                <span class="ratings">${movie.imdbRating}</span>
                            </div>
                        </li>
                        <li class="movie-details">
                            <span id="duration" class="duration">${movie.Runtime}</span>
                            <span id="genre" class="genre">${movie.Genre}</span>
                            <button id="remove-btn-${index}" data-addBtn="remove-${movie.imdbID}" class="remove-from-wishlist-btn">
                                <img class="remove-icon" data-addBtn="remove-${movie.imdbID}" src="./images/remove-icon.png" alt="A minus sign to remove this movie to your watchlist.">
                                Remove
                            </button>
                        </li>
                        <li class="movie-summary">
                            <p class="summary-text">${movie.Plot}</p>
                        </li>
                    </ul>
                </div>`).join('')

        watchlistContainer.innerHTML = movieItems
        truncateLine()

    } else{
        exploreWatchList.classList.remove('hidden') 
    }
    
}

renderWatchlistMovies(watchListLocalStorage)
