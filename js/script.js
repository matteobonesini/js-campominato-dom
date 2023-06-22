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



createGridButton.addEventListener('click', function() {

    let numberOfCell;

    // get params according to the difficulty
    switch(selectInput.value) {
        case "normal":
            numberOfCell = 81;
            document.documentElement.style.cssText = "--number-of-cell: 9";
            break;
        case "hard":
            numberOfCell = 49;
            document.documentElement.style.cssText = "--number-of-cell: 7";
            break;
        default:
            numberOfCell = 100;
            document.documentElement.style.cssText = "--number-of-cell: 10";
    }

    // generate the bombs array
    const bombsArray = uniqueRandomNumbers(numberOfCell);
    console.log(bombsArray);

    gridContainer.innerHTML = '';
    let gameOver = false;

    for (let i = 1; i <= numberOfCell; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('myapp--grid-element');
        newCell.append(i);
        gridContainer.append(newCell);

        newCell.addEventListener('click', function() {
            if (gameOver === false) {
                console.log('game over prima',gameOver);
                this.classList.toggle('clicked');
                console.log(`Seleziona cella n° ${this.innerHTML}`);
                const checkBomb = numberInArray(bombsArray, parseInt(this.innerHTML));
                if (checkBomb === true) {
                    gameOver = true;
                    this.style.backgroundColor = 'red';
                    this.innerHTML = '&#x1F4A3;';
                }
                console.log('game over dopo',gameOver);
            }
        })
    }

})

