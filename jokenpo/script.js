// Estado do jogo
let playerScore = 0;
let pcScore = 0;
let isPlaying = false;

// Mapeamento de escolhas
const choices = {
    rock:     { emoji: '🪨', label: 'Pedra' },
    paper:    { emoji: '📄', label: 'Papel' },
    scissors: { emoji: '✂️', label: 'Tesoura' }
};

// Regras: chave vence o valor
const winsAgainst = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

// Escolha aleatória do computador
function getPcChoice() {
    const keys = Object.keys(choices);
    return keys[Math.floor(Math.random() * keys.length)];
}

// Função principal chamada ao clicar nos botões
function play(playerChoice) {
    if (isPlaying) return;
    isPlaying = true;

    const pcChoice = getPcChoice();
    const playerDisplay = document.getElementById('player-choice');
    const pcDisplay = document.getElementById('pc-choice');
    const resultText = document.getElementById('result-text');

    // Limpar estado visual anterior
    resultText.className = 'result-text';
    resultText.textContent = '';
    playerDisplay.className = 'choice-display';
    pcDisplay.className = 'choice-display';

    // Desabilitar botões durante animação
    toggleButtons(false);

    // Animação "pensando" — emojis piscando por 900ms
    const thinkingEmojis = ['🪨', '📄', '✂️'];
    let count = 0;
    const battleInterval = setInterval(() => {
        playerDisplay.textContent = thinkingEmojis[count % 3];
        pcDisplay.textContent = thinkingEmojis[(count + 2) % 3];
        count++;
    }, 180);

    // Revelar resultado após a animação
    setTimeout(() => {
        clearInterval(battleInterval);

        // Mostrar escolhas com animação bounce
        playerDisplay.textContent = choices[playerChoice].emoji;
        pcDisplay.textContent    = choices[pcChoice].emoji;
        playerDisplay.classList.add('bounce');
        pcDisplay.classList.add('bounce');

        // Processar e exibir resultado
        const result = getResult(playerChoice, pcChoice);
        showResult(result, playerChoice, pcChoice);

        toggleButtons(true);
        isPlaying = false;
    }, 900);
}

// Determina o resultado
function getResult(player, pc) {
    if (player === pc) return 'draw';
    if (winsAgainst[player] === pc) return 'win';
    return 'lose';
}

// Exibe resultado na tela e atualiza placar
function showResult(result, playerChoice, pcChoice) {
    const resultText    = document.getElementById('result-text');
    const playerDisplay = document.getElementById('player-choice');
    const pcDisplay     = document.getElementById('pc-choice');

    // Forçar restart da animação
    resultText.classList.remove('pop');
    void resultText.offsetWidth;
    resultText.classList.add('pop');

    if (result === 'win') {
        playerScore++;
        resultText.textContent = `🏆 Você venceu! ${choices[playerChoice].label} bate ${choices[pcChoice].label}!`;
        resultText.classList.add('win');
        playerDisplay.classList.add('win-glow');
        pcDisplay.classList.add('shake');
        bumpScore('player-score');
    } else if (result === 'lose') {
        pcScore++;
        resultText.textContent = `💀 Você perdeu! ${choices[pcChoice].label} bate ${choices[playerChoice].label}!`;
        resultText.classList.add('lose');
        pcDisplay.classList.add('win-glow');
        playerDisplay.classList.add('shake');
        bumpScore('pc-score');
    } else {
        resultText.textContent = `🤝 Empate! Os dois escolheram ${choices[playerChoice].label}!`;
        resultText.classList.add('draw');
    }

    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('pc-score').textContent     = pcScore;
}

// Animação de "pulo" no número do placar
function bumpScore(id) {
    const el = document.getElementById(id);
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 400);
}

// Habilita ou desabilita os botões de escolha
function toggleButtons(enabled) {
    document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = !enabled);
}

// Reinicia o placar e a tela
function resetGame() {
    playerScore = 0;
    pcScore     = 0;

    document.getElementById('player-score').textContent = '0';
    document.getElementById('pc-score').textContent     = '0';
    document.getElementById('player-choice').textContent = '❓';
    document.getElementById('pc-choice').textContent     = '❓';
    document.getElementById('player-choice').className  = 'choice-display';
    document.getElementById('pc-choice').className      = 'choice-display';

    const resultText = document.getElementById('result-text');
    resultText.textContent = 'Faça sua escolha!';
    resultText.className   = 'result-text';
}
