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





// reference to HTML element in page
const createGridButton = document.getElementById('myapp--create-grid');
const gridContainer = document.querySelector('.myapp--grid-container');
const selectInput = document.getElementById('myapp--difficulty');
const resultContainer = document.getElementById('myapp--result-container');
const finalResult = document.getElementById('myapp--result');
const scoreResult = document.getElementById('myapp--score');



createGridButton.addEventListener('click', function() {

    let numberOfCell;
    let gameOver = false;
    let score = 0;
    let maxScore;

    if (!resultContainer.classList.contains('invisible')) {
        resultContainer.classList.add('invisible');
        finalResult.innerHTML = '-';
        scoreResult.innerHTML = '-'; 
    }

    // get params according to the difficulty
    switch(selectInput.value) {
        case "normal":
            numberOfCell = 81;
            document.documentElement.style.cssText = "--number-of-cell: 9";
            maxScore = 65;
            break;
        case "hard":
            numberOfCell = 49;
            document.documentElement.style.cssText = "--number-of-cell: 7";
            maxScore = 33;
            break;
        default:
            numberOfCell = 100;
            document.documentElement.style.cssText = "--number-of-cell: 10";
            maxScore = 84;
    }

    // generate the bombs array
    const bombsArray = uniqueRandomNumbers(numberOfCell);
    console.log(bombsArray);

    gridContainer.innerHTML = '';

    for (let i = 1; i <= numberOfCell; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('myapp--grid-element');
        newCell.append(i);
        gridContainer.append(newCell);

        newCell.addEventListener('click', function() {
            if (gameOver === false && score < maxScore) {
                this.classList.toggle('clicked');
                const checkBomb = numberInArray(bombsArray, parseInt(this.innerHTML));
                if (checkBomb === true) {
                    gameOver = true;
                    this.style.backgroundColor = '#bc0000';
                    this.innerHTML = '&#x1F4A3;';
                    resultContainer.classList.remove('invisible');
                    finalResult.innerHTML = 'Hai perso!';
                    scoreResult.innerHTML = `Punteggio: ${score}`;
                }
                score++;
                if (score == maxScore && gameOver != true) {
                    resultContainer.classList.remove('invisible');
                    finalResult.innerHTML = 'Hai vinto!';
                    scoreResult.innerHTML = `Punteggio: ${score}`;
                }
            }
        })
    }

})

