const api = "api_key=284fa72d5606d1ce570e18cc304782c7";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w185";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchTopRated: `${base_url}/movie/top_rated?${api}&language=en-US`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
    fetchSciFiMovies: `${base_url}/discover/movie?${api}&with_genres=878`,
    fetchFamilyMovies: `${base_url}/discover/movie?${api}&with_genres=10751`,
    fetchAdventureMovies: `${base_url}/discover/movie?${api}&with_genres=12`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function setBanner() {
    fetch(requests.fetchNetflixOriginals)
        .then((res) => res.json())
        .then((data) => {
            const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
            document.getElementById("banner").style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
            document.getElementById("banner__title").innerText = setMovie.name || setMovie.title || setMovie.original_name;
            document.getElementById("banner__description").innerText = truncate(setMovie.overview, 150);
        });
}

function createRow(url, title, large = false) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";

            const titleElement = document.createElement("h2");
            titleElement.className = "row__title";
            titleElement.innerText = title;
            row.appendChild(titleElement);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = large ? "row__posterLarge" : "row__poster";
                poster.src = img_url + (large ? movie.poster_path : movie.backdrop_path);
                row_posters.appendChild(poster);
            });

            headrow.appendChild(row);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    setBanner();
    createRow(requests.fetchNetflixOriginals, "NETFLIX ORIGINALS", true);
    createRow(requests.fetchTrending, "Trending Now", true);
    createRow(requests.fetchTopRated, "Top Rated", true);
    createRow(requests.fetchActionMovies, "Action Movies");
    createRow(requests.fetchComedyMovies, "Comedy Movies");
    createRow(requests.fetchHorrorMovies, "Horror Movies");
    createRow(requests.fetchRomanceMovies, "Romance Movies");
    createRow(requests.fetchDocumentaries, "Documentaries");
    createRow(requests.fetchSciFiMovies, "Sci-Fi Movies");
    createRow(requests.fetchFamilyMovies, "Family Movies");
    createRow(requests.fetchAdventureMovies, "Adventure Movies");
});
