let selectedCategoryId=0
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

function startGame(selectedCategory) {
    pickRandomWord(selectedCategory)
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
        dialog.innerHTML = ``;

        //this will create a select with category options
        const categorySelector = document.createElement('select')
        categorySelector.className = 'selector';
        let defaultOpt = document.createElement('option')
        defaultOpt.text = 'Selecet a category';
        defaultOpt.value = 0;

        categorySelector.appendChild(defaultOpt)
        categories.forEach(element => {
            let option = document.createElement('option')
            option.value = element.categoryId;
            option.text = element.name;
            categorySelector.appendChild(option)
        });

        const okBtn = document.createElement('div')
        okBtn.innerHTML = ` Ok `;
        okBtn.className = 'btn ok-btn';

        dialog.appendChild(categorySelector)
        dialog.appendChild(okBtn)


        okBtn.onclick = function () {
            if(categorySelector.value>0){
            closeDialog()
            startGame(categorySelector.value)
            }else{
                categorySelector.setAttribute('style','background:red')
                setTimeout(() => {
                    categorySelector.removeAttribute('style','background:black')
                },500);
            }
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
function pickRandomWord(catId) {
    let categoryWords = words.filter(item => item.categoryId == catId)
    pickedWord = getRandomItem(categoryWords).word;
};
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
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
function createKeyboard() {
    let btns = 'abcdefghijklmnoprstuvwxyz'.split('').map(letter =>
        `<button class="btn" id="${letter}" 
    onclick="checkGuess(${letter})">
    ${letter}</button>`).join('');
    document.querySelector('.keyboard').innerHTML = btns
}
function checkGuess(letter) {
    
    document.getElementById(letter.id).setAttribute('disabled', true)
    guessed.push(letter.id)
    if (!pickedWord.includes(letter.id)) {
        badPoints++;
        document.querySelector(`.man${badPoints}`).setAttribute('style','visibility:visible')
        openDialog()
        document.querySelector(".dialog").innerHTML = `bad points: ${badPoints}/10`;
        checkForGameOver()
    } else {
        showSecretWord();
    };
};
function checkForGameOver() {
    if (badPoints === 10) {
        document.querySelector("#eyes").innerHTML = ` x x `;
        document.querySelector("#smile").innerHTML = ` ◠ `;
        document.querySelector("#rope").setAttribute('style','height:55px')
        document.querySelector(".secret-word").innerHTML = pickedWord;

        openDialog()
        document.querySelector(".dialog").innerHTML = `GAME OVER!`;
        setTimeout(() => {
            closeDialog()
        }, 3000);
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
        for(let i=1;i<10;i++){
            document.querySelector(`.man${i}`).setAttribute('style','visibility:hidden')
        }
        setTimeout(() => {
        document.querySelector("#eyes").innerHTML = `(0 0)`;
        document.querySelector("#smile").innerHTML = ` ◠◡◠ `; 
        document.querySelector("#rope").setAttribute('style','height:30px')
        document.querySelector(".secret-word").innerHTML = ""
        document.querySelector('.keyboard').innerHTML = ""
        pickedWord = '';
        badPoints = 0;
        guessed = [];
        secretWord = null;
        render() 
        }, 1000);

    }, 3000);
}


