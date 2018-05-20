let questions;
let question;
let scores = {};

const btnStart = document.getElementById('btn-start');
const restartButton = document.getElementById('restartButton');
const splashCard = document.getElementById('splashCard');
const resultCard = document.getElementById('resultCard');




const getQuestions = () => {
    fetch('https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json')
        .then(response => response.json())
        .then(function (data) {
            splashCard.classList.remove('startCard--hidden');
            questions = data;
            round();

        })
        .catch(error => {
            console.error(`Error: ${error}`);
    })
}

const getFirstQuestion = (data) => {
     return data.shift();
}

const showCard = (card) => {
    const questionCard = document.getElementById('questionCard');
    const btnRight = document.getElementById('btn-right');
    const btnLeft = document.getElementById('btn-left');
    let question = card.question;
    let firstAnswer = card.answers[0].answer;
    let secondAnswer = card.answers[1].answer;

    let isFirstAnswerCorrect = card.answers[0].correct;
    let isSecondAnswerCorrect = card.answers[1].correct;


    questionCard.innerHTML = question;
    btnLeft.innerHTML = firstAnswer;
    btnRight.innerHTML = secondAnswer;


    btnRight.setAttribute('onclick', `answerQuestion(${isSecondAnswerCorrect})`)
    btnLeft.setAttribute('onclick', `answerQuestion(${isFirstAnswerCorrect})`);
}

const round = () => {
    if(questions.length > 0) {
        question = getFirstQuestion(questions);
        showCard(question);
    } else {
        const lastCard = document.getElementById('card');
        if(questions.length < 1) {
            lastCard.classList.add("startCard--hidden")
            resultCard.classList.remove("startCard--hidden")

            let keys = Object.keys(scores);

            keys.forEach(key => {
               resultCard.innerHTML += `${key} : ${scores[question.question]}`;
            });

        }
    }
}

const incorrect = () => {
    questions.push(question);
    round();
}

const answerQuestion = (correct) => {
    if(!(question.question in scores)) {
        scores[question.question] = 1;
    } else {
        scores[question.question] = scores[question.question] += 1;
    }

    if(correct) {
        round();
        flipEffect();
    } else {
        incorrect();
        flipEffect()
    }
}

const flipEffect = () => {
    let elm = document.getElementById('card');
    let newone = elm.cloneNode(true)
    elm.parentNode.replaceChild(newone, elm);
    newone.classList.add('turn')
}

const startScreen = () => {
    const firstCard = document.getElementById('splashCard');
    firstCard.classList.add("startCard--hidden");

    const card = document.getElementById('card');
    card.classList.remove("startCard--hidden");
    flipEffect();
}


btnStart.addEventListener('click', startScreen);

const restartQuiz = () => {
    document.getElementById('resultCard').classList.add('startCard--hidden');
    getQuestions();
}

restartButton.addEventListener('click', restartQuiz);

getQuestions();
