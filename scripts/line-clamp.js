const maxLength = 140

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


function truncateLine(){
    const summariesEl = document.querySelectorAll('.summary-text')

    summariesEl.forEach((summary, index)=>{
        if(summary.textContent.length > maxLength){
            summary.classList.add('collapsed')
            const readMoreBtn = document.createElement('button')
            readMoreBtn.textContent = '...Read more'
            readMoreBtn.setAttribute('data-readBtn', `btn-${index}`)
            readMoreBtn.id = `btn-${index}`
            readMoreBtn.classList.add('read-more-btn')
            summary.after(readMoreBtn)
        }
    })
}


truncateLine()
