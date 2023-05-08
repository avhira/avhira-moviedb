const searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener('click', async function(){
  try{
    const inputKeyword = document.querySelector('.input-keyword')
    const movie = await getMovie(inputKeyword.value)
    updateUI (movie)
  }catch(err){
    console.log(err)
    alert(err)
  }
})

function getMovie(keyword){
  return fetch('http://www.omdbapi.com/?apikey=dca61bcc&s=' + keyword)
  .then(response => {
    if(!response.ok){
      throw new Error(response.statusText)
    }
    return response.json()
  })
  .then(response => {
    if(response.Response === "False"){
      throw new Error(response.Error)
    }
    // console.log(response)
    return response.Search
  })  
}

function updateUI(movie){
  let cards = ''
     movie.forEach(m => cards += showCard(m))
     const movieContainer = document.querySelector('.movie-container')
     movieContainer.innerHTML = cards
}

// ketika btn di klik || event binding
document.addEventListener('click', async function(e){
  if(e.target.classList.contains('modal-detail-btn')){
    const imdbid = e.target.dataset.imdbid
    const movieDetail = await getMovieDetail(imdbid)
    updateUiDetail(movieDetail)
  }
})

function getMovieDetail(imdbid){
  return fetch('http://www.omdbapi.com/?apikey=dca61bcc&i=' + imdbid)
        .then(response => response.json())
        .then(m => m)
}

function updateUiDetail(m){
  const movieDetail = showMovieDetail(m)
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = movieDetail
}

function showCard(m) {
  return `<div class="col-md-4 my-3">
          <div class="card">
              <img src="${m.Poster}" alt="ini film" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-btn"
                data-bs-toggle="modal" 
                data-bs-target="#movieDetailModal"
                data-imdbid="${m.imdbID}">show details</a>
              </div>
          </div>
          </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid" alt="ini gambar cuy">
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
              </ul>
            </div>
          </div>
        </div>`;
}
