init()

function init() {
    
    render()
};

function render() {
    const caId = 0;
    sayHello()
    setTimeout(()=>setNewGame(),2000)
    
};

function setNewGame() {
    const output=0;
    const dialogBox = document.querySelector(".dialog")
    const dialogLine = document.createElement('div')
    dialogLine.className = 'dialog-line'
    dialogLine.setAttribute('style', 'display:flex')
    dialogLine.innerHTML = `Selecet category: `;

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

    dialogLine.appendChild(categorySelector)
    dialogLine.appendChild(okBtn)
    dialogBox.appendChild(dialogLine)

    okBtn.onclick = function () {
        dialogLine.setAttribute('style', 'display:none')        
        pickRandomWord(categorySelector.value)
        startGame()
    };
};

function pickRandomWord(CatId) {
    const wordDiv = document.querySelector('.secret-word')
    
    const catWords = words.filter(item => item.categoryId == CatId)
    const randomWord = getRandomItem(catWords) 
    const wordArray = randomWord.word.split("")
    wordArray.forEach(item=>{
        let letter = document.createElement('div')
        letter.innerText = '_';
        letter.className = 'letter'
        wordDiv.appendChild(letter)
    })
    // const secretWord = document.createElement('div')
    // secretWord.innerHTML = randomWord.word;
    return wordDiv
};



function startGame() {
    const dialogBox = document.querySelector(".dialog")
    const dialogLine = document.createElement('div')
    dialogLine.setAttribute('style', 'display:flex')
    dialogLine.className = 'dialog-line'


    const inputElement = document.createElement('input')
    inputElement.placeholder = `Guess a letter : `;

    const guessBtn = document.createElement('button')
    guessBtn.innerText = 'Try';

    dialogLine.appendChild(inputElement)
    dialogLine.appendChild(guessBtn)
    dialogBox.appendChild(dialogLine)

}






function closeDialog() {
    let dialogElement = document.querySelector('.dialog-line');
    dialogElement.setAttribute('style', 'display: none');
};

function sayHello() {
    const dialogBox = document.querySelector(".dialog")
    const helloMsg = document.createElement('div')
    helloMsg.setAttribute('style', 'display:flex')
    helloMsg.innerHTML = `Welcome to Hang-Man game`;
    helloMsg.className = 'dialog-line';
    dialogBox.appendChild(helloMsg)
    setTimeout(() => {
        closeDialog()
    }, 2000);
}

function getRandomItem(array){
    return array[Math.floor(Math.random()*array.length)];
}