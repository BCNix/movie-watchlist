const BASE_URL = 'http://www.omdbapi.com/'
const SEARCH_END_POINT = '?s='
const IMDB_END_POINT = '?i='
const API_KEY = '&apikey=e1b8f91d'

const maxLength = 140

async function fetchMovie(endPoint, lookFor){
    try{
        const res = await fetch(BASE_URL + endPoint + lookFor + API_KEY)
        return await res.json()
    } catch (error){
        console.error(error.message)
    }
}

function truncateLine(){
    const summariesEl = document.querySelectorAll('.summary-text')

    summariesEl.forEach((summary, index)=>{
        if(summary.textContent.length > maxLength){
            summary.classList.add('collapsed')
            const readMoreBtn = document.createElement('button')
            readMoreBtn.textContent = '...Read more'
            readMoreBtn.setAttribute('data-readbtn', `btn-${index}`)
            readMoreBtn.id = `btn-${index}`
            readMoreBtn.classList.add('read-more-btn')
            summary.after(readMoreBtn)
        }
    })
}

document.body.addEventListener('click', (e)=> {    

    if(e.target.dataset.readbtn){
        const readMoreBtn = document.getElementById(e.target.dataset.readbtn)
        const summary = readMoreBtn.previousElementSibling

        if (!summary.classList.toggle('collapsed')){
            readMoreBtn.style.top = 0
            readMoreBtn.style.paddingTop = '5px'
            readMoreBtn.textContent = '...Read less'
        } else {
            readMoreBtn.style.top = '-1.2em'
            readMoreBtn.style.paddingTop = '0'
            readMoreBtn.textContent = '...Read more'
        }
    }
})