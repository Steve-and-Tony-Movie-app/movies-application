const $ = require('jquery');

const deleteMovies = (movies) =>{
    //rewriting body
    movies.forEach((element) => {
        $(`#deleteBtn${element.id}`).click(() => {
            let url;
            let options;
            if (confirm(`Are you Sure you want to delete:  ${element.title}?`)) {
                url = `./api/movies/${element.id}`;
                options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(url, options)
                    .then(() => {
                        console.log(`new edit function is firing`);
                        fetchingMovieList();
                    })
                    .catch(() => {
                        console.log('the upload failed')
                    });
            }});
    });
};

module.exports = {deleteMovies};