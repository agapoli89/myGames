const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    yourChoice: '',
    aiChoice: '',
    whoWin: '',
}

const hands = document.querySelectorAll('.select img');
const btn = document.querySelector('.start');

//pierwsza funkcja - wybór gracza
const handSelection = (e) => {
    game.yourChoice = e.target.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    e.target.style.boxShadow = '0 0 0 4px yellow';
}

//druga funkcja - wybór komputera
const aiHandSelection = () => {
    const index = Math.floor(Math.random() * hands.length);
    return hands[index].dataset.option;
}

//trzecia funkcja - porównanie wyników
const checkResult = (player, ai) => {
    if (player === ai) {
        gameSummary.draws++;
        return 'Remis';
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyce') || (player === 'nożyce' && ai === 'papier')) {
        gameSummary.wins++;
        return 'Ty! :)';
    } else {
        gameSummary.losses++;
        return 'Komputer :(';
    }
}

//czwarta funkcja - wyświetlenie wyników
const showResults = () => {
    document.querySelector('[data-summary="your-choice"]').textContent = game.yourChoice;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiChoice;
    document.querySelector('.numbers span').textContent = gameSummary.numbers;
    document.querySelector('.wins span').textContent = gameSummary.wins;
    document.querySelector('.losses span').textContent = gameSummary.losses;
    document.querySelector('.draws span').textContent = gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = game.whoWin;
}

//zakończenie gry
const endGame = () => {
    document.querySelector(`[data-option="${game.yourChoice}"]`).style.boxShadow = '';
    game.yourChoice = '';
    game.aiChoice = '';
}

//funkcja sterująca
const startGame = () => {
    if (!game.yourChoice) {
        return alert('Wybierz obraz!');
    }

    gameSummary.numbers++;
    game.aiChoice = aiHandSelection();

    const gameResult = checkResult(game.yourChoice, game.aiChoice);
    game.whoWin = gameResult;

    showResults();
    endGame();
}

hands.forEach(hand => hand.addEventListener('click', handSelection));

btn.addEventListener('click', startGame);