const levels = {
    easy: 5,
    medium: 3,
    hard: 2,
};

const easyWords = [
    'bye',
    'the',
    'there',
    'hi',
    'hello',
    'here',
    'fan',
    'three',
    'jack',
    'pen',
    'man',
    'boy',
    'math',
    'sir',
    'straw',
    'nine',
    'plug',
    'stack',
    'radio',
    'scale',
    'mug',
    'bank',
    'blue',
    'game',
    'over',
    'tall',
    'ball',
    'yell',
    'tom',
    'horse',
    'mom',
    'exit'
];

const mediumWords = [
    'uninterested',
    'hyperbole',
    'javascript',
    'intermittent',
    'unconscious',
    'python',
    'interview',
    'developer',
    'wordpress',
    'office',
    'festival',
    'highlighter',
    'programming',
    'coding',
    'error',
    'snowmobile',
    'dumbledore',
    'bluetooth',
    'pineapple',
    'nintendo',
    'phineas',
    'suddenly',
    'moisturiser',
    'accupuncture',
    'massage',
    'bananas',
    'surgery',
    'haircut',
    'bedsheet',
    'palindrome',
    'exaggeration',
    'intelectual',
    'maurtius',
    'personification',
    'speaker',
    'maleficient',
    'pedestrian',
    'optical',
    'calculator',
    'international'
];

const hardWords = [
    'insignificant',
    'contemplating',
    'acetylcholine',
    'plasmodesmata',
    'constellation',
    'communication',
    'photosynthesis',
    'responsibility',
    'representative',
    'conjunctivitis',
    'groundbreaking',
    'acknowledgement',
    'prognostication',
    'parthenogenesis',
    'misapprehension',
    'procrastination'
];

let currentLevel = levels.easy;
let currentWords = easyWords;
let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds'); 
const startbtn = document.querySelector('#start');

function startGame() {
    init();
    wordInput.focus();
}

function init() {
    startbtn.disabled = true;
    seconds.innerHTML = currentLevel;
    showWord(currentWords);
    wordInput.addEventListener('input', startMatch)
    setInterval(countdown, 1000);
    setInterval(checkStatus, 50);
}

function difficultyChange(diffi) {
    if(diffi.value === 'easy') {
        currentLevel = levels.easy;
    } else if(diffi.value === 'medium') {
        currentLevel = levels.medium;
    } else if(diffi.value === 'hard') {
        currentLevel = levels.hard;
    }
    seconds.innerHTML = currentLevel;
    wordInput.focus();
}

function wordChange(diff) {
    if(diff.value === 'easy') {
        currentWords = easyWords;
    } else if(diff.value === 'medium') {
        currentWords = mediumWords;
    } else if(diff.value === 'hard') {
        currentWords = hardWords;
    }
    wordInput.focus();
}

function showWord(currentWords) {
    const randIndex = Math.floor(Math.random() * currentWords.length);
    currentWord.innerHTML = currentWords[randIndex];
}

function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(currentWords);
        wordInput.value = '';
        score++;
    }
    if(score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        message.style.color = 'green';
        wordInput.style.borderStyle = 'none';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function countdown() {
    if(time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }

    timeDisplay.innerHTML = time;
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        message.style.color = 'red';
        message.innerHTML = 'Game Over!!! Type the above word to restart and play again';
        score = -1;
        wordInput.style.borderColor = 'red';
        wordInput.style.borderStyle = 'solid';
        wordInput.style.borderWidth = "thick";
    }
}