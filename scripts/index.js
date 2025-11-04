const BASE_URL = 'http://www.omdbapi.com/'
const SEARCH_END_POINT = '?s='
const IMDB_END_POINT = '?i='
const API_KEY = '&apikey=e1b8f91d'

const formEl = document.getElementById('form')
const exploreContainer = document.getElementById('explore-container')
const startExploring = document.getElementById('start-exploring')
const unableToFind = document.getElementById('unable-to-find')

const imdbIds = []

async function fetchMovie(endPoint, title){
    try{
        const res = await fetch(BASE_URL + endPoint + title + API_KEY)
        const data = await res.json()
        return data
    } catch (error){
        console.error(error.message)
    }
}

function renderSearchedMovies(arr){

    
    exploreContainer.classList.add('hidden')
    const moviesContainer = document.getElementById('movies-containter')

    let movieItems = ''

    arr.forEach((items) => {
        movieItems += `<div class="movie-item">
                            <img class="movie-poster" src="./images/image 33.png" alt="Movie poster">
                            <ul class="movie-descriptions">
                                <li>
                                    <h2>Blade Runner Black Out 2022</h2>
                                    <div class="rating-content">
                                        <img class="star-icon" src="./images/star-icon.svg" alt="A star icon for movie ratings">
                                        <span class="ratings">8.1</span>
                                    </div>
                                </li>
                                <li class="movie-details">
                                    <span id="duration" class="duration">117 min</span>
                                    <span id="genre" class="genre">Action, Drama, Sci-fi</span>
                                    <button class="add-to-wishlist-btn">
                                        <img class="add-icon" src="./images/add-icon.png" alt="A plus sign to add this movie to your watchlist">
                                        Watchlist
                                    </button>
                                </li>
                                <li class="movie-summary">
                                    <p class="summary-text">Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing. Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing.</p>
                                </li>
                            </ul>
                        </div>`
    })
}


formEl.addEventListener('submit', async e => {
    e.preventDefault()

    const searchField = document.getElementById('search-field')
    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData.entries())

    const movieTitle = data['search-field'].split(' ').join('+')

    const fetchSearchData = await fetchMovie(SEARCH_END_POINT, movieTitle)

    if(fetchSearchData.Response === 'True'){
        console.log(fetchSearchData)
        fetchSearchData.Search.forEach(item => imdbIds.push(item.imdbID))
        console.log(fetchSearchData.Search)
    } else{
        exploreContainer.classList.remove('hidden')
        startExploring.classList.add('hidden')
        unableToFind.classList.remove('hidden')
        searchField.placeholder = 'Searching something with no data'
        searchField.value = ''
        console.log(fetchSearchData.Error)
    }

    console.log(imdbIds)

})


