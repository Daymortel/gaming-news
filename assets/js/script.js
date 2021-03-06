'use strict';

const affichZero = (nombre) => {
    return nombre < 10 ? '0' + nombre : nombre;
}

const date = () => {
    const infos = new Date();
    document.querySelector('.mdl-logo').innerHTML = `Gaming News par djalexkidd & Daymortel &copy; 2022-${affichZero(infos.getFullYear())}`;
}

setInterval('date()');

const APICALL = `https://gnews.io/api/v4/search?q=gaming&token=003657fad27339671a7e8c97f31e00f3&lang=fr`;

const affichage = document.querySelector('.mdl-grid');
const switchTheme = document.querySelector('.theme');
const bodyNode = document.querySelector('main');
// const headerNode = document.querySelector('header');
const loader = document.querySelector(".loader");

const callAPI = async () => {
    const reponse = await fetch(`${APICALL}`);
    const data = await reponse.json();
    creationCarte(data);
}

const creationCarte = (article) => {
    for(let i = 0; i < article.articles.length; i++) {
        const date = new Date(`${article.articles[i].publishedAt}`);
        const formated_date = date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear() + ' à ' + date.getUTCHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        const carteHTML = `
        <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                    <div class="mdl-card__media">
                        <img class="article-image" src=" ${article.articles[i].image}" border="0" alt="">
                    </div>
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${article.articles[i].title}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                    ${article.articles[i].description}
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href=${article.articles[i].url} target="_blank">Lien de l'article</a>
                    </div>
                </div>
        `;

        affichage.innerHTML += carteHTML;
    }

    loader.style.display = 'none';
}

callAPI();