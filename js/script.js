// function to generate 16 unique random numbers
function uniqueRandomNumbers(max) {
    const array = [];

    while (array.length < 16) {
        const randomN = Math.floor(Math.random() * max) + 1;

        if (!array.includes(randomN)) {
            array.push(randomN);
        }
    }

    return array;
}

// function that check if is a bomb cell
function numberInArray(array, number) {
    for (let i = 0; i < array.length; i++) {
        if(array[i] == number) {
            return true;
        }
    }
    return false;
}

// function that compare two numbers and return the higher
function nHigher(num1, num2) {
    if(num1 >= num2) {
        return num1;
    } else {
        return num2;
    }
}

// function that show all the bombs
function showAllBombs(array) {
    const arrayOfAllCells = document.querySelectorAll('.myapp--grid-element');
    for (let i = 0; i < array.length; i++) {
        const element = arrayOfAllCells[array[i] - 1];
        // element.style.backgroundColor = '#bc0000';
        element.innerHTML = '&#x1F4A3;';
    }
}

// reference to HTML element in page
const createGridButton = document.getElementById('myapp--create-grid');
const gridContainer = document.querySelector('.myapp--grid-container');
const selectInput = document.getElementById('myapp--difficulty');
const resultContainer = document.getElementById('myapp--result-container');
const finalResult = document.getElementById('myapp--result');
const scoreResult = document.getElementById('myapp--score');
const maxScoreResult = document.getElementById('myapp--maxscore');

// global variables
let maxScorePoint = 0
let difficultySelected = 'easy';

// event listener on button to start the game
createGridButton.addEventListener('click', function() {

    let numberOfCell;
    let gameOver = false;
    let score = 0;
    let maxScore;

    // set invisible resultContainer if visible
    if (!resultContainer.classList.contains('invisible')) {
        resultContainer.classList.add('invisible');
        finalResult.innerHTML = '-';
        scoreResult.innerHTML = '-'; 
    }

    // set variables according to the difficulty
    switch(selectInput.value) {
        case "normal":
            numberOfCell = 81;
            document.documentElement.style.cssText = "--number-of-cell: 9";
            maxScore = 65;
            if (difficultySelected != 'normal') {
                maxScorePoint = 0;
            }
            difficultySelected = 'normal';
            break;
        case "hard":
            numberOfCell = 49;
            document.documentElement.style.cssText = "--number-of-cell: 7";
            maxScore = 33;
            if (difficultySelected != 'hard') {
                maxScorePoint = 0;
            }
            difficultySelected = 'hard';
            break;
        default:
            numberOfCell = 100;
            document.documentElement.style.cssText = "--number-of-cell: 10";
            maxScore = 84;
            if (difficultySelected != 'easy') {
                maxScorePoint = 0;
            }
            difficultySelected = 'easy';
    }

    // generate the bombs array
    const bombsArray = uniqueRandomNumbers(numberOfCell);
    console.log(bombsArray);

    // reset grid container
    gridContainer.innerHTML = '';

    // create the cells and add the event listener on click
    for (let i = 1; i <= numberOfCell; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('myapp--grid-element');
        newCell.append(i);
        gridContainer.append(newCell);

        newCell.addEventListener('click', function() {
            // check if the cell in clickable or stop the game
            if (gameOver === false && score < maxScore) {
                if (this.classList.contains('clicked')) {
                    this.classList.remove('clicked');
                    this.style.color = 'black';
                    score--;
                } else {
                    this.classList.add('clicked');
                    this.style.color = 'blue';
                    score++;
                }
                const checkBomb = numberInArray(bombsArray, parseInt(this.innerHTML));
                if (checkBomb === true) {
                    gameOver = true;
                    score--;
                    showAllBombs(bombsArray);
                    this.style.backgroundColor = '#bc0000';
                    resultContainer.classList.remove('invisible');
                    finalResult.innerHTML = 'Hai perso!';
                    scoreResult.innerHTML = `Punteggio: ${score}`;
                    maxScorePoint = nHigher(score, maxScorePoint); 
                    maxScoreResult.innerHTML = `Punteggio massimo: ${maxScorePoint}`;
                }
                if (score == maxScore && gameOver != true) {
                    resultContainer.classList.remove('invisible');
                    finalResult.innerHTML = 'Hai vinto!';
                    scoreResult.innerHTML = `Punteggio: ${score}`;
                }
            }
        })
    }

})

