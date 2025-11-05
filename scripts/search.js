const formEl = document.getElementById('form')
const exploreContainer = document.getElementById('explore-container')
const startExploring = document.getElementById('start-exploring')
const unableToFind = document.getElementById('unable-to-find')

const watchList = new Set(JSON.parse(localStorage.getItem('watchlist') || '[]'))

async function renderSearchedMovies(arr){

    exploreContainer.classList.add('hidden')

    const moviesContainer = document.getElementById('movie')

    moviesContainer.classList.remove('hidden')

    const movies = await Promise.all( arr.map( imdbID => fetchMovie(IMDB_END_POINT, imdbID)) )

    const movieItems = movies.map( (movie, index) =>
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
                        <button id="add-btn-${index}" data-addBtn="add-${movie.imdbID}" class="add-to-wishlist-btn">
                            <img class="add-icon" data-addBtn="add-${movie.imdbID}" src="./images/add-icon.png" alt="A plus sign to add this movie to your watchlist">
                            Watchlist
                        </button>
                    </li>
                    <li class="movie-summary">
                        <p class="summary-text">${movie.Plot}</p>
                    </li>
                </ul>
            </div>`
        ).join('')

    moviesContainer.innerHTML = movieItems

    truncateLine()
}

document.body.addEventListener('click', (e) => {
    console.log(e)
    if(e.target.dataset.addbtn){
        watchList.add(e.target.dataset.addbtn.slice(4))
        const dataList = JSON.stringify(Array.from(watchList))
        localStorage.setItem('watchlist', dataList)
    }
})

formEl.addEventListener('submit', async (e) => {
    e.preventDefault()

    const searchField = document.getElementById('search-field')
    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData.entries())

    const movieTitle = data['search-field'].split(' ').join('+')

    const fetchSearchData = await fetchMovie(SEARCH_END_POINT, movieTitle)

    if(fetchSearchData.Response === 'True'){
        // console.log(fetchSearchData)
        const imdbIds = fetchSearchData.Search.map(item => item.imdbID)
        console.log(imdbIds)
        renderSearchedMovies(imdbIds)
    } else{
        exploreContainer.classList.remove('hidden')
        startExploring.classList.add('hidden')
        unableToFind.classList.remove('hidden')
        searchField.placeholder = 'Searching something with no data'
        searchField.value = ''
        console.log(fetchSearchData.Error)
    }
})
