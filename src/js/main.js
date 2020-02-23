let pickedWord = '';
let badPoints = 0;
let guessed = [];
let secretWord = null;
init()

function init() {

    render()
}

function render() {
    sayHello()
    selectCategory()
}
function startGame() {
    pickRandomWord()
    createKeyboard()
    showSecretWord()
}
function sayHello() {
    openDialog()
    document.querySelector(".dialog").innerHTML = `Welcome to HangMan game`;
    setTimeout(() => {
        closeDialog()
    }, 2000);
}
function selectCategory() {
    setTimeout(() => {
        openDialog()
        let dialog = document.querySelector(".dialog")
        dialog.innerHTML = `Selecet category: `;

        //this will create a select with category options
        const categorySelector = document.createElement('select')
        categorySelector.className = 'selector';
        categories.forEach(element => {
            let option = document.createElement('option')
            option.value = element.categoryId;
            option.text = element.name;
            categorySelector.appendChild(option)
        });

        const okBtn = document.createElement('div')
        okBtn.innerText = 'Ok';
        okBtn.className = 'btn';

        dialog.appendChild(categorySelector)
        dialog.appendChild(okBtn)


        okBtn.onclick = function () {
            closeDialog()
            startGame(categorySelector.value)
        };
    }, 2000);
};

function closeDialog() {
    let dialogLine = document.querySelector('.dialog');
    dialogLine.setAttribute('style', 'display: none');
};
function openDialog() {
    let dialogLine = document.querySelector('.dialog');
    dialogLine.setAttribute('style', 'display: flex');
};
function pickRandomWord(catId = 4) {
    let categoryWords = words.filter(item => item.categoryId == catId)
    pickedWord = getRandomItem(categoryWords).word;
};
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function createKeyboard() {
    let btns = 'abcdefghijklmnoprstuvwxyz'.split('').map(letter =>
        `<button class="btn" id="${letter}" 
    onclick="checkGuess(${letter})">
    ${letter}</button>`).join('');
    document.querySelector('.keyboard').innerHTML = btns
}
function checkGuess(letter) {
    const hangmanElement = document.querySelector(".hangman");
    document.getElementById(letter.id).setAttribute('disabled', true)
    guessed.push(letter.id)
    if (!pickedWord.includes(letter.id)) {
        badPoints++;
        hangmanElement.innerHTML = `bad points: ${badPoints}/10`;
        checkForGameOver()
    } else {
        showSecretWord();
    };
};
function showSecretWord() {
    secretWord = pickedWord.split("").map(letter => {
        if (guessed.indexOf(letter) >= 0)
            return letter;
        else
            return "_";
    }).join("");
    document.querySelector(".secret-word").innerHTML = secretWord;

    checkWin()
};
function checkForGameOver() {
    const hangmanElement = document.querySelector(".hangman");
    if (badPoints === 10) {
        hangmanElement.innerHTML = `GAME OVER!`;
        resetGame()
    }
};
function checkWin() {
    const underLines = secretWord.indexOf("_");
    if (underLines === -1) {
        openDialog()
        document.querySelector(".dialog").innerHTML = "YOU WIN!!!"
        resetGame()

    }
};
function resetGame() {
    setTimeout(() => {
        document.querySelector(".hangman").innerHTML = ""
        document.querySelector(".secret-word").innerHTML = ""

        pickedWord = '';
        badPoints = 0;
        guessed = [];
        secretWord = null;
        render()
    }, 3000);
}


