import { Category } from "./details.js";
import { Game } from "./games.js";

const categories = document.getElementById('categories');
const gamesData = document.getElementById('gamesData');
const gameInfo = document.getElementById('gameInfo');
const navbar = document.getElementById('navbar');
const home = document.getElementById('home');

(function () {
    displayGames('mmorpg');
})();


categories.addEventListener('click', (e) => {
    const lis = document.querySelectorAll('.nav-link');
    lis.forEach(a => a.classList.remove('active'));

    const curCat = document.getElementById(e.target.id);
    if (curCat) {
        curCat.classList.add('active');
        displayGames(e.target.id);
    }
});


gamesData.addEventListener('click', (e) => {
    displayDetails(e.target.dataset.id);
});

async function displayGames(category) {
    showLoader();
    let box = "";
    const cat = new Category(category);

    try {
        const games = await cat.getGames();
        games.forEach(game => {
            box += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card border-black" data-id="${game.id}">
                        <div class="card-body bg-dark">
                            <img src="${game.thumbnail}" alt="${game.title}" class="w-100" data-id="${game.id}">
                            <figcaption>
                                <div class="d-flex justify-content-between pt-3">
                                    <h3 class="h6 small" data-id="${game.id}">${game.title}</h3>
                                    <span class="badge text-bg-primary p-2">Free</span>
                                </div>
                                <p class="text-center" data-id="${game.id}">${game.short_description}</p>
                            </figcaption>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-dark">
                            <span class="badge badge-color bg-secondary">${game.genre}</span>
                            <span class="badge badge-color bg-secondary">${game.platform}</span>
                        </div>
                    </div>
                </div>`;
        });
        gamesData.innerHTML = box;
    } catch (error) {
        console.error("Error displaying games:", error);
        gamesData.innerHTML = `<p class="text-danger">Failed to load games. Please try again later.</p>`;
    } finally {
        hideLoader();
    }
}

async function displayDetails(gameid) {
    if (!gameid) return;

    showLoader();
    gameInfo.classList.remove('d-none');
    gamesData.classList.add('d-none');
    home.classList.add('d-none');

    const game = new Game(gameid);

    try {
        const gameDetails = await game.getGameDetails();
        gameInfo.innerHTML = `
            <div class="header d-flex justify-content-between py-5">
                <h1>Game Details</h1>
                <button class="btn text-white close-btn">
                    <i class="fa-light fa-circle-xmark"></i>
                </button>
            </div>
            <div class="row">
                <div class="col-4">
                    <img src="${gameDetails.thumbnail}" alt="${gameDetails.title}" class="w-100">
                </div>
                <div class="col-8 game-info">
                    <h3>Title: ${gameDetails.title}</h3>
                    <p class="text-white">Category: <span class="badge text-bg-info">${gameDetails.genre}</span></p>
                    <p class="text-white">Platform: <span class="badge text-bg-info">${gameDetails.platform}</span></p>
                    <p class="text-white">Status: <span class="badge text-bg-info">${gameDetails.status}</span></p>
                    <p class="small text-white">${gameDetails.description}</p>
                    <a class="btn btn-outline-warning" target="_blank" href="${gameDetails.game_url}">Show Game</a>
                </div>
            </div>`;
    } catch (error) {
        console.error("Error displaying game details:", error);
        gameInfo.innerHTML = `<p class="text-danger">Failed to load game details. Please try again later.</p>`;
    } finally {
        hideLoader();
    }
}

gameInfo.addEventListener('click', (e) => {
    if (e.target.closest('.close-btn')) {
        exit();
    }
});

function exit() {
    gameInfo.classList.add('d-none');
    gamesData.classList.remove('d-none');
    home.classList.remove('d-none');
}

function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); 
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('d-none'); 
}

