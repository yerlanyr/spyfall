import routing from './routing.mjs';
import places from './places.mjs';
import './styles/style.css'

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js')
        .then((reg) => {
            console.log('Registration succeeded. Scope is ', reg.scope);
        }).catch((error) => {
            console.log('Registration failed with', error);
        })
}

const q = c => document.querySelector(c);

const navigate = routing(q('.pages'));
const store = {
    amount: 0,
    currentPlayer: 0,
    show: false,
    spy: 0,
    placeIndex: 0,
    isDark: true
};

function updateSorterPage(){
    const button = q('.sorter-page__show');
    const text = q('.sorter-page__text');
    const player = q('.sorter-page__player');
    player.textContent = 'Игрок №' + store.currentPlayer;
    button.textContent = store.show ? 'Передать' : 'Показать';
    if(!store.show) { text.textContent = ''; return; }
    text.textContent = store.currentPlayer === store.spy ? 'Вы шпион' : places[store.placeIndex]; 
}

(function enterPage(updateSorterPage, store, places, q){
    const input = q('.input');
    const form = q('.enter-page');
    const themeButton = q('.enter-page__theme-button');
    const pagesDiv = q('.pages');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        store.amount = +input.value;
        store.currentPlayer = 1;
        store.show = false;
        store.spy = Math.floor(Math.random() * store.amount) + 1;
        store.placeIndex = Math.floor(Math.random() * places.length);
        navigate('sorter');
        updateSorterPage();
        input.value = '';
    });
    const renderThemeButton = () => { themeButton.textContent = store.isDark ? 'Светлая тема' : 'Темная тема'; }
    if(store.isDark) { pagesDiv.classList.add('pages_theme_dark'); }
    themeButton.addEventListener('click', function(event){
        store.isDark = !store.isDark;
        pagesDiv.classList.toggle('pages_theme_dark');
        renderThemeButton();
    });
    renderThemeButton();
})(updateSorterPage, store, places, q);

(function sorterPage(updateSorterPage, store, q){
    const button = q('.sorter-page__show');
    button.addEventListener('click', function(){
        if(store.currentPlayer === store.amount && store.show) {
            navigate('');
        }
        if(store.show){
            store.currentPlayer += 1;
            store.show = false;
        } else {
            store.show = true;
        }
        updateSorterPage();
    })
})(updateSorterPage, store, q);

updateSorterPage();