const $ = require('jquery');

const movieHTMLbuilder = (movie) => {
    let html = `<div class="col-xs-12" > <div class="row"><h5 class="col-xs-3">`;
    html += `${movie.title}`;
    html += `</h5>`;
    html += `<div class="col-xs-3"><h6>${movie.genre}</h6></div>`;
    html += `<h6 class="col-xs-3 ratingCol">`;
    html += `Rating: ${movie.rating}`;
    html += `</h6>`;
    html += `<div class="col-xs-3"><button class="btn btn-info" type="button" id="editBtn${movie.id}">Edit</button><button class="btn btn-danger" type="button" id="deleteBtn${movie.id}">DELETE</button></div>`;
    html += `<div class="col-xs-12" id="editInputs${movie.id}"></div></div></div>`;
    return html;
};

// starts the html build for the whole movie array
const movieArrayHTML = (arrayOfMovies) => {
    let movieListHTML = ``;
    arrayOfMovies.forEach((element) => {
        movieListHTML += movieHTMLbuilder(element);
    });
    return movieListHTML;
};

// function to submit PUT request to api server to edit existing movies
const editNewMovie = (title, genre, rating, id) => {
    const upDatedMovie = {title: title, genre: genre, rating: rating};
    const url = `./api/movies/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(upDatedMovie)
    };
    fetch(url, options)
        .then(() => {
            console.log(`new edit function is firing`);
            fetchingMovieList();
        })
        .catch(() => { console.log('the upload failed')});
};

const addToggleBtn = (movies) =>{
    movies.forEach((element) => {
        $(`#editBtn${element.id}`).click(() => {
            let editTextHTML = ``;
            editTextHTML += `<div class="row"><div class="col-xs-3">`;
            editTextHTML += `<input type="text" value="${element.title}" id="movieTitle${element.id}">`;
            editTextHTML += `</div>`;
            editTextHTML += `<div class="col-xs-3"><input type="text" value="${element.genre}" id="movieGenre${element.id}"></div>`;
            editTextHTML += `<div class="col-xs-3">`;
            editTextHTML += `<input type="number" value="${element.rating}" id="movieRating${element.id}">`;
            editTextHTML += `</div><div class="col-xs-3">`;
            editTextHTML += `<button type="button" id="submitEdit${element.id}">Submit Edit</button>`;
            // editTextHTML += `<div></div>`;
            $(`#editInputs${element.id}`).html(editTextHTML);
            $(`#submitEdit${element.id}`).click(() => {
                console.log("submit edit button is activating");
                let newTitle = $(`#movieTitle${element.id}`).val();
                let newGenre = $(`#movieGenre${element.id}`).val();
                console.log(newGenre);
                console.log(newTitle);
                let newRating = $(`#movieRating${element.id}`).val();
                editNewMovie(newTitle, newGenre, newRating, element.id);
            })
        });
    });
};

module.exports = {movieHTMLbuilder, movieArrayHTML, editNewMovie, addToggleBtn};